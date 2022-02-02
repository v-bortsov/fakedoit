// import options from 'dotenv/lib/env-options';
import {
  GraphQLEnumType, GraphQLInt, GraphQLList
} from 'graphql';

import { defaultArgs, defaultListArgs, JSONType, resolver } from 'graphql-sequelize';
import { curry } from 'ramda';

// simple query
export const collectFrame = (
  model: any, num: any, k: any
) => ({
  type: new GraphQLList(num),
  args: Object.assign(
    defaultArgs(model),
    defaultListArgs()
  ),
});

export const cudResolvers = (
  model: any, inputTypeName: any, primaryKey: any, resolvers: any
) => ({
  [`${inputTypeName}Create`]: (
    source: any, args: any, context: any, info: any
  ) => {
    if (inputTypeName == 'User') {
      args[inputTypeName].status = 0;
    }
    return model.create(args[inputTypeName]);
  },
  [`${inputTypeName}ListCreate`]: (
    /** @ts-ignore */
    source: any, args: any, context: any, info: any
  ) => model.bulkCreate(args[inputTypeName])
    .then((results: any) => {
      if (model.options.log === 'true') {
        // options.logging(`Results: ${JSON.stringify(
        //   results,
        //   null,
        //   2
        // )}`);
      }
      return results;
    }),
  [`${inputTypeName}Update`]: (
    source: any, args: any, context: any, info: any
  ) => {
    const where = args.where
      ? args.where
      : { [primaryKey]: args[inputTypeName][primaryKey] };
    const resolveWhere = args.where
      ? Object.assign(
        {},
        where,
        args[inputTypeName]
      )
      : where;
    return model
      .update(
        args[inputTypeName],
        { where }
      )
      /** @ts-ignore */
      .then((boolean: boolean) =>
        // `boolean` equals the number of rows affected (0 or 1)
        /** @ts-ignore */
        resolver(
          model,
          {
            after: (results: any) => {
              if (model.options.log === 'true') {
                // options.logging(`Results: ${JSON.stringify(
                //   results,
                //   null,
                //   2
                // )}`);
              }
              if (model.afterUpdate) {
                model.afterUpdate(
                  args[inputTypeName],
                  context,
                  results,
                );
              }
              return results;
            },
          }
        )(
          source,
          resolveWhere,
          context,
          info
        ),);
  },
  [`${inputTypeName}Delete`]: (
    /** @ts-ignore */
    value: any, args: any, context: any, info: any
  ) => {
    let where = {};
    if (args.where) where = args.where;
    else if (args[primaryKey]) where = { [primaryKey]: args[primaryKey] };
    return model.destroy({ where }); // Returns the number of rows affected (0 or more)
  },
});

export const crudFrame = (
  /** @ts-ignore */
  model: any, num: any, inputTypeName: any, outputs: any, inputs: any
) => ({
  [`${inputTypeName}Create`]: {
    type: outputs[inputTypeName], // what is returned by resolve, must be of type GraphQLObjectType
    description: `Create a ${inputTypeName}`,
    args: {
      [inputTypeName]: { type: inputs[inputTypeName] },
    },
  },
  [`${inputTypeName}ListCreate`]: {
    type: new GraphQLList(outputs[inputTypeName]), // what is returned by resolve, must be of type GraphQLObjectType
    description: `Create a list of ${inputTypeName}`,
    args: {
      [inputTypeName]: { type: new GraphQLList(inputs[inputTypeName]) },
    },
  },
  [`${inputTypeName}Update`]: {
    type: outputs[inputTypeName],
    description: `Update a ${inputTypeName}`,
    args: {
      [inputTypeName]: { type: inputs[inputTypeName] },
      where: { type: JSONType.default },
    },
  },
  [`${inputTypeName}Delete`]: {
    type: GraphQLInt,
    description: `Delete a ${inputTypeName}`,
    args: {
      [model.primaryKeyAttribute]: { type: GraphQLInt },
      where: { type: JSONType.default },
    },
  },
});

export const paginator = curry((
  model: any, key: any, outputTypes: any
) => ({
  name: `${key.toLowerCase()}s`,
  target: model,
  nodeType: outputTypes[key],
  connectionFields: {
    total: {
      type: GraphQLInt,
    },
  },
  orderBy: new GraphQLEnumType({
    name: `${key}ConnectionOrderBy`,
    values: {
      id: { value: ['id', 'ASC'] }, // The first ENUM value will be the default order. The direction will be used for `first`, will automatically be inversed for `last` lookups.
      em: { value: ['email', 'ASC'] },
      // TITLE: {value:  ['title', 'ASC']},
      // CUSTOM: {value:  [function (source, args, context, info) {}, 'ASC']} // build and return custom order for sequelize orderBy option
    },
  }),
  where(
    /** @ts-ignore */
    key: string, value: any, currentWhere: any
  ) {
    // for custom args other than connectionArgs return a sequelize where parameter
    return { [key]: value };
  },
  // after: (result, args, context) => {
  //   // console.log('это токен',context)
  //   // result.sort(/* Custom sort function */);
  //   return result;
  // },
  // orderBy: 'UserOrderBy', // supports both new GraphQLEnumType({...}) and type name
}))