import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { Users } from '../models/users';
import dataSource from '../config/data-source';

const registerUser = async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;

    password = await bcrypt.hash(password, Number(process.env.SALT));

    const result = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values([{username: username, email: email, password: password }])
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

export { registerUser };