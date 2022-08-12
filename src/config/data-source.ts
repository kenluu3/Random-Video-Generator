import { DataSource } from 'typeorm';
import { Account, Favorite } from '../models';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  synchronize: true,
  entities: [Account, Favorite],
});

export { dataSource };