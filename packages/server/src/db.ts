import { Sequelize } from 'sequelize';
import pg from 'pg';

export default () => new Sequelize(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASS}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_NAME}`, /* ?sslmode=require */
  {
    logging: false,
    define: {
      freezeTableName: true,
    },
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      // ssl: {
      //   rejectUnauthorized: false
      // }
    },
  }
)