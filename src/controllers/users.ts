import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { Users } from '../models/users';
import dataSource from '../config/data-source';

const getUsername = async (req: Request, res: Response) => {
  try {
    let { username } = req.params;

    username = username.toLowerCase();

    const result = await dataSource
      .createQueryBuilder()
      .select('users')
      .from(Users, 'users')
      .where('users.username = :username', {username})
      .getOne()
    
    if (result == null) {
      return res.status(400).json(`User ${username} does not exist.`);
    }

    res.status(200).json(result);
  } catch (error: any) {
    const { code, detail } = error;

    res.status(400).json({'code': code, 'detail': detail});
  }
}

const registerUser = async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json(`Missing parameter values. Please include values for all fields.`);
    }

    password = await bcrypt.hash(password, Number(process.env.SALT));

    const result = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([{username: username.toLowerCase(), email: email.toLowerCase(), password: password, active: true}])
      .execute();

    res.status(200).json(`${username} has registered successfully.`);

  } catch (error: any) {
    const { code, detail } = error;

    if (code == 23505) {
      res.status(400).json(detail.substring(4));
    } else {
      res.status(500).json(detail);
    }
  }
}

export { registerUser, getUsername };