import { ApolloServer} from 'apollo-server';
import express from 'express';
// import bodyParser from 'body-parser';
import gqlScheme from './index'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import cors from 'cors'
import { pick } from 'ramda';

// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const compiler = webpack(config);

// console.log(config.output);

// gqlScheme('./model')
//   .then(async (obj: any)=>{
    
    // const app = express();
    // const wpmw = webpackDevMiddleware(
    //   compiler,
    //   {}
    // )

    // app.use(wpmw);
    // app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
    // app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: obj})); adsf
    console.log(process.env);
    
    const obj = gqlScheme({})
    console.log(Object.keys(obj));
    
    const server = new ApolloServer({
      ...pick(
        [
          'typeDefs',
          'resolvers'
        ],
        obj
      ),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground],

      // playground: {
      //   endpoint: '/api/'
      // },
      // uploads: false,
      // debug: true,
      context: async ({ req }: any) => {
        // if (connection) {
        //   // check connection for metadata
        //   return connection.context;
        // } else {
        // check from req
        // console.log(req)
        const token = req.headers.authorization || '';
        // console.log('token in server.js',token)
        return { token, /* db: obj.models */ };
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
    // server.start();
    // server.applyMiddleware({path: '/api/', bodyParserConfig: { limit: '100mb' }, app, cors: false});
    // await new Promise((resolve: any) => app.listen(
    //   { port: 4000 },
    //   resolve
    // ));
    server.listen(4000).then(({ url }) => console.log(`Server ready at ${url}. `));

    // if (module.hot) {
    //   module.hot.accept();
    //   module.hot.dispose(() => server.stop());
    // }
  // })
  // .catch((e: any)=>console.log(e))

