import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dataSource } from './config';
import { accountRouter, videoRouter, favoriteRouter } from './routes';

const port = process.env.PORT || 8080;
const app = express();

app.use(cors({ credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/account', accountRouter);
app.use('/video', videoRouter);
app.use('/favorite', favoriteRouter);

dataSource.initialize()
  .then(async (value) => {
    await value.runMigrations();
    console.log(`Initialized application data source.`);
  })
  .catch((error) => console.error(`Appliciation data source initialization error: ${error}`));

app.use(express.static('../client/dist'));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server started listening on port: ${port}`);
});