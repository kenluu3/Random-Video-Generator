import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Account, Favorite } from '../models';

const getFavorite = async (req: Request, res: Response) => {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    return res.status(400).json({ error: validationError.array() });
  }

  const { username } = req.params;

  try {
    const account = await Account.findOneBy({ username: username });

    if (!account) {
      return res.status(400).json({ error: 'Account does not exist' });
    }

    const favorites = await Favorite.find({
      select: ['id', 'title', 'channel', 'channelId', 'saveDate'],
      where: { accountId: account.id }
    });
    
    return res.status(200).json(favorites);
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const addFavorite = async (req: Request, res: Response) => {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    return res.status(400).json({ error: validationError.array() });
  }

  const { id, title, channel, channelId } = req.body;
  const credentials = req.user;

  try {
    const favorite = new Favorite();
    favorite.id = id;
    favorite.title = title;
    favorite.channel = channel;
    favorite.accountId = credentials?.id as string;
    favorite.channelId = channelId;

    await favorite.save();

    return res.status(200).json({ message: 'Added to favorites successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

const removeFavorite = async (req: Request, res: Response) => {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    return res.status(400).json({ error: validationError.array() });
  }

  const { id } = req.body;
  const credentials = req.user;

  try {
    const favorite = await Favorite.findOneBy({ id: id, accountId: credentials?.id });

    if (!favorite) {
      return res.status(400).json({ error: 'Invalid request' });
    } 

    await favorite.remove();

    return res.status(200).json({ message: 'Removed from favorites successfully', id: id });
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { getFavorite, addFavorite, removeFavorite };