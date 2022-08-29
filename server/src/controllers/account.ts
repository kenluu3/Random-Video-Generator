import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Account } from '../models';
import { generateToken } from '../config';
import bcrypt from 'bcrypt';

const getAccount = async (req: Request, res: Response) => {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    return res.status(400).json({ error: validationError.array() });
  }

  const { username } = req.params;

  try {
    const account = await Account.findOne({ 
        select: ['username', 'email', 'active', 'createDate'],
        where: { username: username }
      });

    if (!account) {
      return res.status(400).json({ error: 'Account does not exist' });
    }

    return res.status(200).json(account);
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const registerAccount = async (req: Request, res: Response) => {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    return res.status(400).json({ error: validationError.array() });
  }

  const { username, email, password } = req.body;
  
  try {
    const account = new Account();
    account.username = username;
    account.email = email;
    account.password = await bcrypt.hash(password, Number(process.env.SALT));
    await account.save();

    return res.status(200).json({ message: 'Account created successfully', username: account.username });
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateAccount = async (req: Request, res: Response) => {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    return res.status(400).json({ error: validationError.array() });
  }

  const { username, email, password } = req.body;
  const credentials = req.user;

  if (!username && !email && !password) {
    return res.status(400).json({ error: 'Missing parameter fields for update' });
  }

  try {
    const account = await Account.findOneBy({ id: credentials?.id })

    if (!account) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    if (username) account.username = username;
    if (email) account.email = email;
    if (password) account.password = await bcrypt.hash(password, Number(process.env.SALT));

    await account.save();

    const newPayload = { 
      id: account.id,
      username: account.username,
      email: account.email,
      active: account.active,
      createDate: account.createDate,
    }

    const token = generateToken(newPayload);

    return res.status(200)
    .cookie('token', token, { httpOnly: true, secure: false })
    .json({ message: 'Updated account information successfully', user: newPayload });
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const loginAccount = async (req: Request, res: Response) => {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    return res.status(400).json({ error: validationError.array() });
  }

  const { username, password } = req.body;
  
  try {
    const account = await Account.findOneBy({ username: username });

    if (!account) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, account.password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid credentials'})
    }

    const payload = {
      id: account.id,
      username: account.username,
      email: account.email,
      active: account.active,
      createDate: account.createDate
    }

    const token = generateToken(payload)

    return res.status(200)
      .cookie('token', token, { httpOnly: true, secure: false })
      .json({ message: 'Logged in successfully', user: payload });
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { getAccount, registerAccount, loginAccount, updateAccount };