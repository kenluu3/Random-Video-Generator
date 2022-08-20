import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dataSource } from './config';
import { accountRouter, videoRouter, favoriteRouter } from './routes';


const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/account', accountRouter);
app.use('/video', videoRouter);
app.use('/favorite', favoriteRouter);

dataSource.initialize()
  .then(() => console.log(`Initialized application data source.`))
  .catch((error) => console.error(`Appliciation data source initialization error: ${error}`));

app.listen(port, () => {
  console.log(`Server started listening on port: ${port}`);
});