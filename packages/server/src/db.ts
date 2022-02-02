import { Sequelize } from 'sequelize';
import pg from 'pg';

export  const db = () => new Sequelize(
  process.env.DB_LINE,
  {
    // operatorsAliases: Op,
    // native: true,
    logging: false,
    define: {
      freezeTableName: true,
    },
    // ssl: true,
    // pgsslmode: 'no-verify',
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
  }
)