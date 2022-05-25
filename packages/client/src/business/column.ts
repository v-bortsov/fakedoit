import { always, anyPass, assocPath, both, clone, cond, converge, hasPath, ifElse, includes, lensPath, map, mergeRight, mergeWith, objOf, over, path, pathEq, pipe, pluck, prop, propEq, T, update, when, __ } from 'ramda'
import { ColumnType, headType, Props } from '../types/enums'
import { copy, getFieldsByType, random, uuidv4 } from '../utils'
import { calcDates, weekToDays } from '../utils/dates'

type AddColumn = (pointers: [ColumnType, CollapseForm<FormTypes>[]]) => CollapseForm<FormTypes>[]

type getColumnStructure = (x: ColumnType) => CollapseForm<FormTypes>

type transformPropValue = (x: CollapseForm<FormTypes>) => CollapseForm<FormTypes>

const pathName: ['head', headType.NAME, Props.VALUE] = [
  'head',
  headType.NAME,
  Props.VALUE
]

const pathLabel: ['head', headType.LABEL, Props.VALUE] = [
  'head',
  headType.LABEL,
  Props.VALUE
]

const pathType: ['head', headType.TYPE, 'component', Props.VALUE] = [
  'head',
  headType.TYPE,
  'component',
  Props.VALUE
]

const pathLimit: ['body', Props.LIMIT, Props.COMPONENT, Props.VALUE] = [
  'body',
  Props.LIMIT,
  Props.COMPONENT,
  Props.VALUE
]

const bindTypeToHandler = cond([
  [
    pathEq(
      [
        'head',
        headType.TYPE,
        'component',
        'value'
      ],
      ColumnType.DATE
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

const transformPropValue: transformPropValue = pipe(ifElse(
  anyPass([
    pathEq(
      pathType,
      ColumnType.CUSTOM
    ),
    pathEq(
      pathType,
      ColumnType.ONTOLOGY
    ),
    pathEq(
      pathType,
      ColumnType.NUMBER
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
  copy(
    pathLabel,
    pathName
  ),
  /** @ts-ignore */
  when(
    hasPath([
      'body',
      'limit'
    ]),
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
  )
)


export function recalcCollectDates(getPath: (arg0: string)=>string[]) {
  return converge(
    assocPath(getPath('collect')),
    [
      converge(
        calcDates,
        [
          path(getPath('startDay')),
          path(getPath('limit')),
          pipe(
            path(getPath('days')),
            map(prop('active')),
            weekToDays
          ),
        ]
      ),
      clone
    ]
  )
}

export const addColumn: AddColumn = ([type, columns]) => pipe<ColumnType, CollapseForm<FormTypes>, CollapseForm<FormTypes>, CollapseForm<FormTypes>[]>(
  getColumnStructure,
  // transformPropValue,
  cond([
    [
      pathEq(
        pathType,
        ColumnType.DATE
      ),
      recalcCollectDates((prop: string) => [
        'body',
        prop,
        'component',
        'value'
      ])
    ],
    [
      T,
      clone
    ]
  ]),
  (column: CollapseForm<FormTypes>) => [
    ...columns,
    column
  ]
)(type)

export const updColumpProp = ([
  columns,
  path,
  value]: [CollapseForm<FormTypes>[], (number|string)[], string
])=> pipe(
  
  assocPath(
    path,
    value
  ),
  when(
    always(includes(
      path[2],
      [
        'startDay',
        'limit',
        'days'
      ]
    )),
    recalcCollectDates(update(
      2,
      __,
      path
    ))
  )
)(columns)

