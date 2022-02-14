import { ApolloServer} from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { pick } from 'ramda';
import gqlScheme from './index'

console.log(process.env.DB_NAME);

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
  }
});
server.listen(4000).then(({ url }) => console.log(`Server ready at ${url}. `));

// if (module.hot) {
//   module.hot.accept();
//   module.hot.dispose(() => server.stop());
// }

