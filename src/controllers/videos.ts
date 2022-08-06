import { Request, Response } from 'express';
import { google } from 'googleapis';

const youtube = google.youtube('v3');

const getVideo = async (req: Request, res: Response) => {  
  try {
    let qstr = req.query.q as string;
    const qarr = qstr.split(',');

    const maxQueries = qarr.length;
    if (maxQueries > 0) {
      qstr = qarr[Math.floor(Math.random() * maxQueries)];
    } else {
      qstr = '';
    }

    const searchParams = {
      auth: process.env.YOUTUBE_API_KEY,
      part: ['snippet'],
      type: ['video'],
      maxResults: 50,
      q: qstr,
    };

    const query = await youtube.search.list(searchParams);
    const { items } = query.data;

    if (!items) {
      return res.status(400).json(`No results were found.`);
    } 

    const maxItems = items.length;
    const randIndex = Math.floor(Math.random() * maxItems);

    const video = {
      id: items[randIndex].id?.videoId,
      title: items[randIndex].snippet?.title,
      description: items[randIndex].snippet?.description,
      channelTitle: items[randIndex].snippet?.channelTitle,
    };

    return res.status(200).json(video);
  } catch (error: any) {
    const { errors } = error;
    res.status(500).json(errors);
  }
}

export { getVideo };