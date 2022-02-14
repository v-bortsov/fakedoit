import { Sequelize } from 'sequelize';
import pg from 'pg';

export default () => new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`,
  {
    logging: false,
    define: {
      freezeTableName: true,
    },
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
  }
)