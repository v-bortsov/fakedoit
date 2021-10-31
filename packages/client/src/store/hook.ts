import {
  always, assoc, assocPath, clone, concat, cond, converge, evolve, ifElse, isEmpty, map, not, of, pair, path, pathEq, pipe, prepend, prop, propEq,
  tap,
  __
} from 'ramda';
import { getFieldsByType } from '../business/form';
import { findAndMerge } from '../utils/popular';

const actionOnDictionaryField = clone;

const updateFields = (func: any) => converge(
  assocPath([0, 'columns']),
  [func, clone]
);

const actionOnOtherFields = updateFields(converge(
  findAndMerge,
  [path<any>([0, 'columns']), prop<any>(1), always('name')]
));
const actionOnTypeField = updateFields(converge(
  map,
  [
    converge(
      ifElse(
        propEq(
          'name',
          'type'
        ),
        __,
        converge(
          assoc('value'),
          [prop('defaultValue'), clone]
        )
      ),
      [
        pipe(
          path([1, 'value']),
          assoc('value')
        )
      ]
    ), pipe(
      path<any>([1, 'value']),
      getFieldsByType
    )
  ]
));

export const reducerFields = 
  cond([
    [
      pathEq(
        [1, 'name'],
        'type'
      ), actionOnTypeField
    ], [
      pathEq(
        [1, 'name'],
        'dictionary'
      ), actionOnDictionaryField
    ], [
      pathEq(
        [1, 'payload' ,'name'],
        'updateFields'
      ), converge(
        assocPath,
        [
          pipe(
            path([1, 'payload', 'path']),
            concat([0, 'columns']),
          ), path([1, 'payload', 'value']), clone
        ]
      )
    ],
    // [
    //   pathEq(
    //     [1, 'name'],
    //     'updateFields'
    //   ), updateFields(path([1, 'value']))
    // ],
    [
      pipe(
        prop<any>(1),
        isEmpty,
        not
      ), actionOnOtherFields
    ], [
      pipe(
        prop(1),
        isEmpty
      ), clone
    ]
  ]);

export const evolveInitialState = pipe(
  pair,
  ifElse(
    pathEq(
      [1, 'type'],
      'fields'
    ),
    reducerFields,
    converge(
      assocPath,
      [
        pipe(
          path([1,'type']),
          of,
          prepend(0)
        ),
        path([1, 'value']), clone
      ]
    )
  ),
  tap(x => console.log(
    'evolveStte',
    x
  )),
  prop<any>(0)
)
