import { Request, Response } from 'express';
import { google } from 'googleapis';

const youtube = google.youtube('v3');

const getVideo = async (req: Request, res: Response) => {
  try {
    let query = req.query.q as string || '';
    const queryArr = query.split(',');

    const maxQueries = queryArr.length;
    if (maxQueries > 0) {
      query = queryArr[Math.floor(Math.random() * maxQueries)];
    } 

    const searchParams = {
      auth: process.env.YOUTUBE_API_KEY,
      part: ['snippet'],
      type: ['video'],
      maxResults: 50,
      q: query,
    }

    const results = await youtube.search.list(searchParams);
    const { items } = results.data;

    if (!items) {
      return res.status(400).json({ error: 'No results were found' });
    }

    const maxItems = items.length;
    const randIndex = Math.floor(Math.random() * maxItems);

    const video = {
      id: items[randIndex].id?.videoId,
      title: items[randIndex].snippet?.title,
      description: items[randIndex].snippet?.description,
      channel: items[randIndex].snippet?.channelTitle
    }

    return res.status(200).json(video);
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { getVideo };