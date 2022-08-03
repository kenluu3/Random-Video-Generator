import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import userRoutes from './routes/users';

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Server started listening on port: ${port}`);
});