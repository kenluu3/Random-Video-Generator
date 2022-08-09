import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import { usersRouter, favoritesRouter, videosRouter } from './routes';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/videos', videosRouter);
app.use('/favorites', favoritesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server started listening on port: ${port}`);
});