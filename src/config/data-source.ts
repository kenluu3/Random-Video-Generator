import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  synchronize: true,
  entities: ['../models/*'],
});

dataSource.initialize()
  .then(() => console.log(`Initialized application data source.`))
  .catch((error) => console.error(`Appliciation data source initialization error: ${error}`));