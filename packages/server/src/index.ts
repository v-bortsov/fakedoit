import fs from 'fs';
import { andThen, clone, converge, mergeRight, path, pipe, tap } from 'ramda';
import { modelsToGraphQlType, resolvers, typeDefs } from './schemas';
import db from './db';

export default pipe<any, any, any>(
    (graphqlObject: any)=> {
      
      graphqlObject.db = require('../model/init-models.ts')
      graphqlObject.db.initModels(db())

      return graphqlObject
    },
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
    /* @ts-ignore **/
    (data: any) => {
      fs.writeFile(
        __dirname+'/graphql.gql',
        data.typeDefs,
        (err: any) => console.log(err==null ? 'graphql run!' : err)
      );
      return data;
    }
  )