import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { Account, Favorite } from '../models';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [Account, Favorite],
  migrations: ['src/migrations/*.ts']
});

export { dataSource };