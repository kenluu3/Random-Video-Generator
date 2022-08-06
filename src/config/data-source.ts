import { DataSource } from 'typeorm';
import { Users } from '../models/users';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  synchronize: true,
  entities: [Users],
});

dataSource.initialize()
  .catch((error) => console.error('Error during Application Data Source Initialization', error));

export default dataSource;