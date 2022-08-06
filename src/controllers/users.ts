import { Request, Response } from 'express';
import { Users } from '../models/users';
import dataSource from '../config/data-source';
import * as auth from '../config/auth';
import bcrypt from 'bcrypt';

const getUser = async (req: Request, res: Response) => {
  try {
    let { username } = req.params;
    username = username.toLowerCase();

    const query = await dataSource
      .createQueryBuilder()
      .select('users')
      .from(Users, 'users')
      .where('users.username = :username', {username})
      .getOne();
    
    if (!query) {
      return res.status(400).json(`User ${username} does not exist.`);
    }

    res.status(200).json({'username': username, 'email': query.email, 'active': query.active});
  } catch (error: any) {
    const { code, detail } = error;

    return res.status(500).json({'code': code, 'detail': detail});
  }
}

const registerUser = async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json(`Missing parameter values. Please include values for all fields.`);
    }

    password = await bcrypt.hash(password, Number(process.env.SALT));

    const query = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([{username: username.toLowerCase(), email: email.toLowerCase(), password: password, active: true}])
      .execute();

    return res.status(200).json(`${username} has registered successfully.`);

  } catch (error: any) {
    const { code, detail } = error;

    if (code == 23505) {
      return res.status(400).json({ error: detail.substring(4) });
    } else {
      return res.status(500).json(detail);
    }
  }
}

const loginUser = async (req: Request, res: Response) => {
  try {
    let { username, password } = req.body;
    username = username.toLowerCase()

    const query = await dataSource
      .createQueryBuilder()
      .select('users')
      .from(Users, 'users')
      .where('users.username = :username', {username})
      .getOne();

    if (!query) {
      return res.status(400).json(`Invalid username. The user '${username}' does not exist.`);
    }

    const validatePass = await bcrypt.compare(password, query.password);

    if (!validatePass) {
      return res.status(400).json(`Invalid password. Please try again.`);
    }

    const payload = { 
      'id': query.id, 
      'username': query.username, 
      'email': query.email,
      'active': query.active 
    };

    const token = auth.generateJWT(payload, '3h');

    return res.status(200)
      .cookie('jwt', token, { httpOnly: true, secure: false })
      .json({ message: 'Logged in successfully.'});

  } catch (error: any) {
    return res.status(500).json(error);
  }
}

const updateUser = async (req: Request, res: Response) => {
  const user = req.user;
  let { username, email, password } = req.body;

  if (user?.username != req.params.username) {
    return res.status(403).json(`Invalid request.`);
  }

  if (!username && !email && !password) {
    return res.status(400).json(`Missing parameter fields for update.`);
  }

  try {
    if (username) {
      username = username.toLowerCase();
    }

    if (email) {
      email = email.toLowerCase();
    }

    if (password) {
      password = await bcrypt.hash(password, Number(process.env.SALT));
    }

    const query = await dataSource
      .createQueryBuilder()
      .update(Users)
      .set({
        ...(username && { username: username }),
        ...(email && { email: email }),
        ...(password && { password: password }),
      })
      .where("id = :id", { id: user.id })
      .returning('*')
      .execute(); 

    if (!query.affected) {
      return res.status(500).json(`Failed to update user information.`);
    }
    
    const payload = { 
      'id': query.raw[0].id, 
      'username': query.raw[0].username,
      'email': query.raw[0].email,
      'active': query.raw[0].active,
    };

    const token = auth.generateJWT(payload, '3h');

    return res.status(200)
      .cookie('jwt', token, { httpOnly: true, secure: false })
      .json(`Successfully updated user.`);

  } catch (error: any) {
    const { code, detail } = error;

    if (code == 23505) {
      return res.status(400).json({ error: detail.substring(4) });
    } else {
      return res.status(500).json(detail);
    }
  }
}

export { registerUser, getUser, loginUser, updateUser };