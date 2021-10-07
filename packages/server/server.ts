import { ApolloServer} from 'apollo-server-express';
import express from 'express';
// import bodyParser from 'body-parser';
import {gqlScheme} from './index'
import cors from 'cors'
import { pick } from 'ramda';

gqlScheme('./model')
  .then(async (obj: any)=>{
    // console.log(obj); a
    const app = express();
    app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
    // app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: obj})); adsf
    const server = new ApolloServer({
      ...pick(
        ['typeDefs', 'resolvers'],
        obj
      ),
      uploads: false,
      introspection: true,
      playground: true,
      debug: true,
      context: async ({ req }: any) => {
        // if (connection) {
        //   // check connection for metadata
        //   return connection.context;
        // } else {
        // check from req
        // console.log(req)
        const token = req.headers.authorization || '';
        // console.log('token in server.js',token)
        return { token, db: obj.models };
        // }
      },
      // formatError: error => {
      //   console.log(error);
      //   return new Error('Internal server error');
      //   // Or, you can delete the exception information
      //   // delete error.extensions.exception;
      //   // return error;
      // },
    });
    await server.start();
    /** @ts-ignore */
    server.applyMiddleware({path: '/api/', bodyParserConfig: { limit: '100mb' }, app, cors: false});
    await new Promise((resolve: any) => app.listen(
      { port: 4000 },
      resolve
    ));
  })
  .catch((e: any)=>console.log(e))
