import { always, apply, assoc, clone, complement, converge, curry, evolve, ifElse, includes, isEmpty, isNil, map, mergeRight, path, paths, pipe, prepend, prop, reduce, reduced, values, when, whereEq, zipObj, __ } from 'ramda';
import validator from 'validator';
import { configInitialState } from '../context';
import { Field } from '../types/react-app-env';

/* eslint array-element-newline: ["error", "never"] */
const customRules = {
  uniqNameByColumns: (value: string) => pipe<any, any, any, any, any>(
    paths([['columns'], ['editColumn']]),
    zipObj(['columns', 'editColumn']),
    evolve({
      columns: map(path(['name', 'value'])),
    }),
    ifElse(
      whereEq({
        editColumn: null,
      }),
      pipe(
        prop('columns'),
        includes(value)
      ),
      always(false)
    )
  )(configInitialState),
};

const getFuncAndCall = curry((
  func: any, args: any[]
) => pipe<any, any, any>(
  prop(
    __,
    mergeRight(
      validator,
      customRules
    )
  ),
  apply<any, any, any>(
    __,
    args
  )
)(func));

const modifyArgs = (value: string | null | number[]) => pipe(
  converge(
    assoc<any>(2),
    [
      pipe(
        prop<any>(2),
        when(
          isNil,
          always([])
        ),
        prepend(isNil(value) ? '' : value)
      ), clone,
    ]
  ),
  values
);

const validate = curry((
  flag: boolean, obj: any[]
) => ifElse(
  always(flag),
  pipe(
    prop<any>(1),
    reduced
  ),
  always(null)
)(obj));

export const isCheck = ({ rules, value }: ComponentInputBase): string[] => reduce<any, any>(
  (
    _, item: any[]
  ) => pipe<any, any, any>(
    modifyArgs(value),
    converge(
      validate,
      [
        converge(
          getFuncAndCall,
          [prop<any>(0), prop<any>(2)]
        ), clone,
      ]
    )
  )(item),
  []
)(rules);

export const isAllFieldsCheck = (fields: Field<any>[]): any => pipe(
  reduce<any, any>(
    (
      _: any, item: any
    ) => !isNil(isCheck(item)) ? reduced(isCheck(item)) : false,
    []
  ),
  complement(isEmpty)
)(fields);
