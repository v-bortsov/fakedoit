import fs from 'fs';
import { clone, converge, mergeRight, pipe } from 'ramda';
import { modelsToGraphQlType, resolvers, typeDefs } from './src/scaffolds/gql/schemas';
import { genModels, isDir, instanceDB } from './src/scaffolds/models';
const { Sequelize, Model, DataTypes } = require('sequelize');



export async function gqlScheme(path: string){
  const graphqlObject: any = {}
  if(!isDir(path)){
    await genModels(path)
  }
  graphqlObject.db = require('./model/init-models.ts')
  graphqlObject.db.initModels(instanceDB)

  return pipe<any, any, any>(
    converge(
      mergeRight,
      [
        clone, pipe(
          modelsToGraphQlType,
          typeDefs,
          resolvers
        )
      ]
    ),
    (data: any) => {
      fs.writeFile(
        __dirname+'/graphql.gql',
        data.typeDefs,
        (err: any) => console.log(err==null ? 'graphql run!' : err)
      );
      return data;
    }
  )(graphqlObject)
}