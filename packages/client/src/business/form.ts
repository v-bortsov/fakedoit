import moment from 'moment';
import { always, andThen, append, assoc, assocPath, both, call, chain, clone, compose, cond, converge, curry, equals, evolve, has, includes, indexBy, join, lensPath, map, mergeRight, objOf, of, over, path, pathEq, pipe, pluck, prepend, prop, propEq, slice, split, T, when, __ } from 'ramda';
import { Field } from '../types/react-app-env';
import components from '../components/Primitives';
import { customFields, dateFields, dictionaryFields, integerFields, requestByAreas } from '../constants/Fields';
import { countries, currencies, getCitiesByCountry, languages } from '../services/network';
import { ColumnType } from '../types/enums';

export const updColumpProp = ([
  columns,
  path,
  value]: [CollapseForm<FormTypes>[], (number|string)[], string
])=> {
  console.log(
    path,
    value,
    columns,
    assocPath(
      path,
      value,
      columns
    )
  );
  
  return assocPath(
    path,
    value,
    columns
  )
}
export const addCollectItem = ([
  columns,
  idx,
  value]: [CollapseForm<FormTypes>[], number, string
])=>{
  const pathUntillValue = [
    idx,
    'body',
    'collect',
    'value'
  ]
  const getValue = pipe(
    path(pathUntillValue),
    append(value)
  )(columns)

  return assocPath(
    pathUntillValue,
    getValue,
    columns
  )
  
}

export const getFieldsByType = cond<ColumnType, any>([
  [
    equals<ColumnType>(ColumnType.CUSTOM),
    always(customFields)
  ],
  [
    equals<ColumnType>(ColumnType.NUMBER),
    always(integerFields)
  ],
  [
    equals<ColumnType>(ColumnType.DATE),
    always(dateFields)
  ],
  [
    equals<ColumnType>(ColumnType.DICTIONARY),
    always(dictionaryFields)
  ],
  [
    T,
    always([])
  ]
]);

export const timestampToMoment = when(
  has('startDay'),
  over(
    lensPath([
      'startDay',
      'value'
    ]),
    (e: any) => moment(e)
      .format('DD.MM.YYYY')
  )
);

export const onFinish = curry((
  dispatch: any, state: any, slicer: any
) => pipe(
  indexBy<any>(prop('name')),
  // timestampToMoment,
  when(
    pathEq(
      [
        'type',
        'value'
      ],
      ColumnType.CUSTOM
    ),
    over(
      lensPath([
        'collect',
        'value'
      ]),
      /** @ts-ignore */
      split('\n')
    )
  ),
  slicer,
  dispatch
)(state.fields));
// const extracts = [
//   pipe(path(['data', 'countries', 0, 'cities']), pluck('name'))
// ]
const ext = curry((
  pointer: string[], name: string, data: any
) => pipe<any, any, any, any>(
  path(pointer),
  pluck(name),
  join('\n')
)(data));
// pipe(
//   prop(__, extracts),
//   converge(converge(ext), [pipe(slice(0,2), map(always)), pipe(slice(2, 2), converge(apply, [prop(1), prop(2)]))]),
// )
const composeFunc = pipe<any, any, any, any, any>(
  prop(
    __,
    requestByAreas
  ),
  slice(
    0,
    2
  ),
  map(always),
  append(clone)
);

const loadDictionaryData = curry((
  dispatch: any, dictionary: string
) => {
  // setDictionaryValue
  dispatch({ name: 'collect', loading: true });
  // setLoaderCollect && setLoadedAndCollectList
  pipe<string, Promise<any>, Promise<any>, Promise<any>>(
    cond<any, any>([
      [
        equals('countries'),
        pipe(
          always<any>(countries),
          call
        )
      ],
      [
        equals('languages'),
        pipe(
          always<any>(languages),
          call
        )
      ],
      [
        equals('currencies'),
        pipe(
          always<any>(currencies),
          call
        )
      ],
      [
        equals('cities'),
        pipe(
          always({ countryId: 176, limit: 10 }),
          getCitiesByCountry
        ),
      ]
    ]),
    andThen(converge(
      ext,
      composeFunc(dictionary)
    )),
    andThen(pipe(
      (value: string[]) => ({ name: 'collect', value, loading: false }),
      dispatch
    ))
  )(dictionary);
  return dictionary;
});

export const extractValueOfComponent = curry((
  props, dispatch, event
) => cond<any, any>([
  [
    propEq(
      'component',
      'TextArea'
    ),
    pipe(
      always(event),
      split('\n')
    )
  ],
  [
    both(
      propEq(
        'component',
        'Select'
      ),
      propEq(
        'name',
        'dictionary'
      )
    ),
    pipe(
      always(event),
      loadDictionaryData(dispatch)
    ),
  ],
  [
    propEq(
      'component',
      'DatePicker'
    ),
    // (e)=>moment(
    //   e,
    //   'DD.MM.YYYY'
    // )
    pipe(always(event.date))
  ],
  [
    pipe(
      prop('component'),
      includes(
        __,
        [
          'Input',
          'InputNumber',
          'Select',
          'TextArea',
          'WeekDays',
          'Multislider'
        ]
      )
    ),
    compose(always(event))
  ],
])(props));

export const getReactComponentFromCollect = pipe<Field<any>, any, JSX.Element>(
  path([
    'component',
    'name'
  ]),
  prop(
    __,
    components
  )
);

export const addValueAndOnChange: any = (
  dispatch: Dispatch, idx: number
) => chain<any,any>(
  /** @ts-ignore */
  assoc<any>('onChange'),
  curry((
    props: Field<any>, e: any
  ) => pipe<any, any, any>(
    converge(
      mergeRight,
      [
        pipe(
          prop('name'),
          /** @ts-ignore */
          of,
          prepend(idx),
          append('value'),
          objOf('path')
        ),
        always(pipe<any, any, any>(
          // !! multipleStoreChanges
          extractValueOfComponent(
            props,
            dispatch
          ),
          objOf('value')
        )(e)),
      ]
    ),
    // changeColumnByName,
    dispatch
  )(props.component))
);
