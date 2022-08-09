import { Request, Response } from 'express';
import { dataSource } from '../config';
import { Favorites } from '..models';
import { Users } from '../models/users';

const getFavorites = async (req: Request, res: Response) => {
  let { username } = req.params;
  username = username.toLowerCase();

  try {
    const queryUser = await dataSource 
      .createQueryBuilder()
      .select('users')
      .from(Users, 'users')
      .where('users.username = :username', { username })
      .getOne();

    if (!queryUser) {
      return res.status(400).json(`User ${username} does not exist.`);
    }

    const { id } = queryUser;

    const queryFavorites = await dataSource
      .createQueryBuilder()
      .select('favorites')
      .from(Favorites, 'favorites')
      .where('users.id = :id', { id })
      .getMany();
    
    return res.status(200).json(queryFavorites);

  } catch (error: any) {
    return res.status(500).json(error);
  }
}

const addFavorite = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { title, url, channel } = req.body;

    if (!title || !url || !channel) {
      return res.status(400).json(`Missing parameters.`);
    }

    const query = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Favorites)
      .values({
        title: title, 
        url: url,
        channel: channel,
      })
      .execute();

  } catch (error: any) {
    return res.status(500).json(error);
  }
}

const removeFavorite = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const { title, url, channel } = req.body;

    if (!title || !url || !channel) {
      return res.status(400).json(`Missing parameters.`);
    }

    const query = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Favorites, 'favorites')
      .where({
        title: title,
        url: url,
        channel: channel,
      })
      .execute();

  } catch (error: any) {
    return res.status(500).json(error);
  }
}

export { getFavorites, addFavorite, removeFavorite };