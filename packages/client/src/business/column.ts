import { always, anyPass, assocPath, both, clone, complement, cond, converge, hasPath, ifElse, indexBy, lensPath, map, mapObjIndexed, mergeRight, mergeWith, objOf, over, path, pathEq, pipe, pluck, prop, propEq, tap, when } from 'ramda'
import { ColumnType, headType, Props } from '../types/enums'
import { getFieldsByType, random, uuidv4 } from '../utils'

export const assocPathConverge = (
  target: string[], source: string[]
): any=> converge(
  assocPath(target),
  [
    path(source),
    clone
  ]
)

const addValueAndGroupBy = pipe(
  map(when(
    complement(propEq(
      'name',
      'startDay'
    )),
    assocPathConverge(
      [
        'component',
        'value'
      ],
      [
        'component',
        'defaultValue'
      ]
    )
  )),
  /** @ts-ignore */
  indexBy(path(pathComponent))
)

const bindTypeToHandler = cond([
  [
    propEq(
      'type',
      'dates'
    ),
    clone /**dayOfWeekToDate */
  ],
  [
    propEq(
      'type',
      'integer'
    ),
    random
  ]
])

const pathName: ['head', headType, Props] = [
  'head',
  headType.NAME,
  Props.VALUE
]
const pathLabel: ['head', headType, Props] = [
  'head',
  headType.LABEL,
  Props.VALUE
]
const pathType: ['head', headType, Props] = [
  'head',
  headType.TYPE,
  Props.VALUE
]
const pathComponent: ['head', headType, Props] = [
  'head',
  headType.TYPE,
  Props.NAME
]
const pathLimit: ['body', Props, Props] = [
  'body',
  Props.LIMIT,
  Props.VALUE
]

const transformPropValue: transformPropValue = pipe(ifElse(
  anyPass([
    pathEq(
      pathType,
      ColumnType.CUSTOM
    ),
    pathEq(
      pathType,
      ColumnType.DICTIONARY
    )
  ]),
  clone,
  converge(
    mergeWith(mergeRight),
    [
      clone,
      pipe(
        /** @ts-ignore */
        pluck('value'),
        bindTypeToHandler,
        map(objOf('value'))
      )
    ]
  )
))

const getColumnStructure: getColumnStructure = pipe(
  converge(
    assocPath(pathType),
    [
      clone,
      pipe(getFieldsByType,
        // mapObjIndexed(addValueAndGroupBy),
      )
    ]
  ),
  // timestampToMoment,
  over(
    lensPath(pathName),
    uuidv4
  ),
  assocPathConverge(
    pathLabel,
    pathName
  ),
  tap(x => console.log(
    'column',
    x
  )),
  /** @ts-ignore */
  when(
    hasPath(pathLimit),
    over(
      lensPath(pathLimit),
      always(10)
    )
  ),
  when(
    both(
      hasPath([
        'body',
        'startDay'
      ]),
      pathEq(
        [
          'body',
          'startDay',
          'component',
          'value'
        ],
        undefined
      )
    ),
    over(
      lensPath([
        'body',
        'startDay',
        'component',
        'value'
      ]),
      always(new Date())
    )
  ),
)
type AddColumn = (pointers: [ColumnType, CollapseForm<FormTypes>[]]) => CollapseForm<FormTypes>[]

type getColumnStructure = (x: ColumnType) => CollapseForm<FormTypes>

type transformPropValue = (x: CollapseForm<FormTypes>) => CollapseForm<FormTypes>

export const addColumn: AddColumn = ([type, columns]) => pipe<ColumnType, CollapseForm<FormTypes>,  CollapseForm<FormTypes>, CollapseForm<FormTypes>[]>(
  getColumnStructure,
  transformPropValue,
  (column: CollapseForm<FormTypes>) => [
    ...columns,
    column
  ]
)(type)