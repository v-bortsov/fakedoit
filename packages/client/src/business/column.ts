import { map, when, complement, propEq, converge, mergeRight, clone, pipe, prop, objOf, cond, ifElse, anyPass, pathEq, mergeWith, pluck, append, __, chain, curry, assocPath, indexBy, over, lensPath, path, hasPath, always, assoc, Placeholder, mapObjIndexed, flip, concat, both } from "ramda"
import {  Props, Collapse, ColumnType } from "../constants/typing"
import { random, getFieldsByType, uuidv4 } from "../utils"

export const assocPathConverge = (target: string[], source: string[]): any=>
  converge(
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
    assocPathConverge(['component','value'], ['component','defaultValue'])
  )),
  indexBy(prop(Props.NAME))
)
const bindTypeToHandler = cond([
  [
    propEq(
      'type',
      'dates'
    ), clone /**dayOfWeekToDate */
  ], [
    propEq(
      'type',
      'integer'
    ), random
  ]
])

const pathName: ['head', Props, Props] = ['head', Props.NAME, Props.VALUE]
const pathLabel: ['head', Props, Props] = ['head', Props.LABEL, Props.VALUE]
const pathType: ['head', Props, Props] = ['head', Props.TYPE, Props.VALUE]
const pathLimit: ['body', Props, Props] = ['body', Props.LIMIT, Props.VALUE]

const transformPropValue: transformPropValue = pipe(
  ifElse(
    anyPass([
      pathEq(
        pathType,
        ColumnType.CUSTOM
      ), pathEq(
        pathType,
        ColumnType.DICTIONARY
      )
    ]),
    clone,
    converge(
      mergeWith(mergeRight),
      [
        clone, pipe(
          pluck('value'),
          bindTypeToHandler,
          map(objOf('value'))
        )
      ]
    )
  )
)

const getColumnStructure: getColumnStructure = pipe(
  converge(
    assocPath(pathType),
    [
      clone,
      pipe(
        getFieldsByType,
        mapObjIndexed(addValueAndGroupBy),
      )
    ]
  ),
  // timestampToMoment,
  over(
    lensPath(pathName),
    uuidv4
  ),
  assocPathConverge(pathLabel, pathName),
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
        'startDay',
      ]),
      pathEq([
          'body',
          'startDay',
          'value',
        ],
        undefined
      )
    ),
    over(
      lensPath(['body', 'startDay', 'value']),
      always(new Date())
    )
  ),
)
type AddColumn = (pointers: [ColumnType, Collapse[]]) => Collapse[]

type getColumnStructure = (x: ColumnType) => Collapse
type transformPropValue = (x: Collapse) => Collapse

export const addColumn: AddColumn = (
  [type, columns]
) => pipe<ColumnType, Collapse, Collapse, Collapse[]>(
    getColumnStructure,
    transformPropValue,
    (column: Collapse) => [...columns, column]
  )(type)