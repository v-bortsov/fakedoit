import SequelizeAuto from 'sequelize-auto'
import fs from 'fs'
import { Sequelize } from 'sequelize';
import 'dotenv/config';
export const isDirEmpty = (path: any): Promise<boolean> => fs.promises.readdir(path)
  .then((files: string[]) =>files.length === 0);
export function isDir(path: string) {
  try {
    const stat = fs.lstatSync(path);
    return stat.isDirectory();
  } catch (e) {
    // lstatSync throws an error if path doesn't exist
    return false;
  }
}
export  const instanceDB = new Sequelize(
  'postgres://doadmin:n9k2jyb3n3ow1t41@db-postgresql-fra1-51293-do-user-1757479-0.a.db.ondigitalocean.com:25060/defaultdb?sslmode=require',
  {
    // operatorsAliases: Op,
    // native: true,
    logging: console.log,
    define: {
      freezeTableName: true,
    },
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
  }
)
export const genModels = (dir: string)=>{
  const gen = new SequelizeAuto(
    /** @ts-ignore */
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      /** @ts-ignore */
      dialect: process.env.DB_DIALECT,
      directory: dir,
      host: process.env.DB_HOST,
      /** @ts-ignore */
      port: process.env.DB_PORT,
      /** @ts-ignore */
      dialectOptions: { ssl: { rejectUnauthorized: false } },
      logging: console.log,
      lang: 'ts'
    }
  )
  return gen.run()
}