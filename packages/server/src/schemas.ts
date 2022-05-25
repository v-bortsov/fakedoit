import { GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLSchema, printSchema } from 'graphql';
import { attributeFields, createConnection, defaultArgs, defaultListArgs, resolver } from 'graphql-sequelize';
import { isEmpty, keys, mapObjIndexed, merge, mergeAll, pick, pipe, prop, reduce, tap, values } from 'ramda';
import { collectFrame, crudFrame, cudResolvers, paginator } from './elements';

export  const outputsFields = (
  key: string, value: any, types: any, isInput: boolean
) => {
  const GraphQLClass = isInput ? GraphQLInputObjectType : GraphQLObjectType;
  return new GraphQLClass({
    name: isInput ? `${key}Input` : key,
    fields:  () => {
      const associations = mapObjIndexed((
        assoc: any, keyAssoc: any
      )=> /(Many)/.test(assoc.associationType)
        ? {
          type: new GraphQLList(types[assoc?.target?.name]),
          args: { ...defaultArgs(types[assoc?.target?.name]), ...defaultListArgs() }
        }
        : {type: types[assoc?.target?.name]})(value.associations)

      return merge(
        attributeFields(
          value,
          {
            allowNull: true,
            globalId: false,
          }
        ),
        isEmpty(value.associations)||isInput
          ? {}
          : associations
      )
    }
  });
};

const getCustomGql = ()=>({

})

export const modelsToGraphQlType = (obj: any): any => {
  const outputs: any = {};
  const inputs: any = {};
  const models: any = {};
  for (const key in obj.db) {
    // if(allowTables.includes(obj.db[key].name) ){
    if (key !== 'initModels') {
      outputs[key] = outputsFields(
        key,
        obj.db[key],
        outputs,
        false
      );
      inputs[key] = outputsFields(
        key,
        obj.db[key],
        inputs,
        true
      );
      models[key] = obj.db[key];
    }
    // }
  }
  if(obj.customGql) {
    outputs['customGql'] = getCustomGql()
  }
  
  return {
    outputs,
    inputs,
    models,
  };
}
// const ext_outputs = (
//   customs, general
// ) => mapObjIndexed(
//   (
//     value: any, key
//   ) => is(
//     String,
//     value.type
//   )
//     ? assoc(
//       'type',
//       general[value.type],
//       value
//     )
//     : value,
//   customs
// );
export const typeDefs = (obj: any) => {
  // console.log(obj)
  obj.typeDefs = printSchema(new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQuery',
      fields: reduce(
        (
          acc: any, key: string
        ) => merge(
          acc,
          {
            [key]: collectFrame(
              obj.models[key],
              obj.outputs[key],
              key
            ),
            [`${key.toLowerCase()}s`]: pipe<any, any, any, any, any>(
              paginator(obj.models[key]),
              createConnection,
              pick(['connectionType', 'connectionArgs']),
              connection => ({
                type: connection.connectionType,
                args: connection.connectionArgs,
              }),
            )(
              key,
              obj.outputs
            ),
          }
        ),
        // ME and Login
        // ext_outputs(customs.outputs, obj.outputs),
        {},
        /** @ts-ignore */
        keys(obj.outputs),
      )
    }),
    mutation: new GraphQLObjectType({
      name: 'RootMutations',
      /** @ts-ignore */
      fields: reduce(
        (
          acc: any, key: string
        ) => merge(
          acc,
          crudFrame(
            obj.models[key],
            obj.inputs[key],
            key,
            obj.outputs,
            obj.inputs
          ),
        ),
        // ME and Login
        // ext_outputs(customs.inputs, obj.inputs),
        {},
        /** @ts-ignore */
        keys(obj.inputs)
      ),
    }),
  }),);
  return obj;
}
const resolverIntgr = (
  object: any, iterate: any
) => pipe<any, any, any, any>(
  mapObjIndexed(object),
  values,
  mergeAll,
)(iterate);

export const resolvers =  (obj: any) => {
  obj.resolvers = {
    RootQuery: merge(
      resolverIntgr(
        (
          value: any, key: string
        ) => ({
          [key]: resolver(
            value,
            { before: (
              findOptions, args
            ) => {
              findOptions.logging = true
              // console.log(
              //   findOptions,
              //   args
              // );
                
              return findOptions
            },
            after: (
              results, args
            ) => {
              // console.log(
              //   results,
              //   args
              // );
                
              return results
            }
            }
          ),
          [`${key.toLowerCase()}s`]: pipe<any, any, any, any>(
            paginator(obj.models[key]),
            createConnection,
            prop('resolveConnection'),
          )(
            key,
            obj.outputs
          ),
        }),
        obj.models,
      ),
      // addCustomQueryResolvers
      // obj.resolvers.query,
      {}
    ),
    RootMutations: merge(
      resolverIntgr(
        (
          value: any, key: string
        ) => ({
          ...cudResolvers(
            obj.models[key],
            key,
            obj.models[key].primaryKeyAttribute,
            obj.resolves,
          ),
        }),
        obj.models,
      ),
      // addCustomMutationResolvers
      // obj.resolvers.mutation 
      {}  
    ),
    ...mapObjIndexed(
      (
        value: any, key: string
      ) => ({
        ...pipe<any, any, any, any, any>(
          tap(x => console.log(
            'assotitions',
            x
          )),
          mapObjIndexed((
            v: any, k: string
          ) => ({
            [k]: resolver(v),
          })),
          values,
          mergeAll,
        )(value.associations),
      }),
      obj.models,
    )
  }
  return obj;
}