import SequelizeAuto from 'sequelize-auto'
import fs from 'fs'
import pg from 'pg';

// require('dotenv').config( {
//   path: __dirname+'/../production.env'
// } );

export const isDirEmpty = (path: any): Promise<boolean> => fs.promises.readdir(path)
  .then((files: string[]) =>files.length === 0);

function isDir(path: string) {
  try {
    const stat = fs.lstatSync(path);
    return stat.isDirectory();
  } catch (e) {
    // lstatSync throws an error if path doesn't exist
    return false;
  }
}

const dir = __dirname+'/../'+process.env.MODELS_DIR
console.log(dir, isDir(dir))
console.log(process.env)
if(!isDir(dir)){

  const gen = new SequelizeAuto(
    process.env.POSTGRES_NAME,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASS,
    {
      dialect: 'postgres',
      dialectModule: pg,
      directory: dir,
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      dialectOptions: { ssl: { rejectUnauthorized: false } },
      logging: console.log,
      lang: 'ts'
    }
  )

  gen.run()
}