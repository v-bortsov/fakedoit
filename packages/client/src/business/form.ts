import moment from 'moment';
import {
  always,
  andThen,
  append,
  assoc,
  both,
  call,
  chain,
  clone,
  compose,
  cond,
  converge,
  curry,
  equals,
  has,
  includes,
  indexBy,
  join,
  lensPath,
  map,
  mergeRight,
  objOf,
  of,
  over,
  path,
  pathEq, pipe,
  pluck,
  prepend,
  prop,
  propEq,
  slice,
  split,
  T, when,
  __
} from 'ramda';
import { AppDispatch, Field } from '../../react-app-env';
import components from '../components/Primitives';
import {
  customFields,
  dateFields,
  dictionaryFields,
  integerFields,
  requestByAreas
} from '../constants/Fields';
import {
  countries,
  currencies,
  getCitiesByCountry,
  languages
} from '../services/network';
import { ColumnType } from '../constants/typing';

export const getFieldsByType = cond<ColumnType, any>([
  [equals<ColumnType>(ColumnType.CUSTOM), always(customFields)],
  [equals<ColumnType>(ColumnType.NUMBER), always(integerFields)],
  [equals<ColumnType>(ColumnType.DATE), always(dateFields)],
  [equals<ColumnType>(ColumnType.DICTIONARY), always(dictionaryFields)],
  [T, always([])]
]);

export const timestampToMoment = when(
  has('startDay'),
  over(
    lensPath(['startDay', 'value']),
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
      ['type', 'value'],
      ColumnType.CUSTOM
    ),
    over(
      lensPath(['collect', 'value']),
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
  dispatch: AppDispatch, event: string
) => {
  // setDictionaryValue
  dispatch({ name: 'collect', loading: true });
  // setLoaderCollect && setLoadedAndCollectList
  pipe(
    cond([
      [
        equals('countries'), pipe(
          always<any>(countries),
          call
        )
      ], [
        equals('languages'), pipe(
          always<any>(languages),
          call
        )
      ], [
        equals('currencies'), pipe(
          always<any>(currencies),
          call
        )
      ], [
        equals('cities'), pipe(
          always({ countryId: 176, limit: 10 }),
          getCitiesByCountry
        ),
      ]
    ]),
    andThen(converge(
      ext,
      composeFunc(event)
    )),
    andThen(pipe(
      (value: string[]) => ({ name: 'collect', value, loading: false }),
      dispatch
    ))
  )(event);
  return event;
});
export const extractValueOfComponent = curry((
  props, dispatch, event
) => cond<any, any>([
  [
    propEq(
      'component',
      'TextArea'
    ), pipe(
      always(event),
      split('\n')
    )
  ], [
    both(
      propEq(
        'component',
        'Select'
      ),
      propEq(
        'name',
        'dictionary'
      )
    ), pipe(
      always(event),
      loadDictionaryData(dispatch)
    ),
  ], [
    propEq(
      'component',
      'DatePicker'
    ), pipe(always(event.date)
      // (e)=>moment(
      //   e,
      //   'DD.MM.YYYY'
      // )
    )
  ], [
    pipe(
      prop('component'),
      includes(
        __,
        ['Input', 'InputNumber', 'Select', 'TextArea', 'WeekDays', 'Multislider']
      )
    ), compose(always(event))
  ],
])(props));
// (component: any)=> React.createElement(component)
export const getReactComponentFromCollect = pipe<Field, any, JSX.Element>(
  path(['component', 'name']),
  prop(
    __,
    components
  )
);
export const addValueAndOnChange: any = (
  dispatch: AppDispatch, idx: number
) => chain<any,any>(
  assoc<any>('onChange'),
  curry((
    props: Field, e: any
  ) => pipe(
    converge(
      mergeRight,
      [
        pipe(
          prop('name'),
          of,
          prepend(idx),
          append('value'),
          objOf('path')
        ), always(pipe<any, any, any>(
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
