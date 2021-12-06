import { adjust, always, apply, applyTo, assocPath, call, clone, converge, curry, isNil, map, of, pair, path, paths, pipe, pipeWith, prop, tap, zip, __ } from 'ramda';
import { addColumn } from '../business/column';
import { cartesianCondition } from '../business/start';
import { Actions } from '../types/enums';
import { addCollectItem, delColumnCollectItem, updColumpProp } from '../utils';

/* eslint array-element-newline: ["error", "never"] */
export enum Data {
  state = 0,
  payload = 1
}

const reducers = {
  [Actions.ADD_COLUMN]: [[[1, 'payload', 'type'], [0, 'columns']], addColumn, ['columns']],
  [Actions.START_GEN]: [[[0, 'columns'], [0, 'limiting']], cartesianCondition, ['rows']],
  [Actions.ADD_COLUMN_COLLECT_ITEM]: [[[0, 'columns'], [1, 'payload','idx'], [1, 'payload','value']], addCollectItem, ['columns']],
  [Actions.UPD_COLUMN_COLLECT_ITEM]: [[[0, 'columns'], [1, 'payload','path'], [1, 'payload','value']], updColumpProp, ['columns']],
  [Actions.DEL_COLUMN_COLLECT_ITEM]: [[[0, 'columns'], [1, 'payload','path']], delColumnCollectItem, ['columns']],
  [Actions.UPD_COLUMN_VALUE]: [[[0, 'columns'], [1, 'payload','path'], [1, 'payload','value']], updColumpProp, ['columns']],
  [Actions.UPD_COLUMN_EDIT]: [[[0, 'columns'], [1, 'payload','path'], [1, 'payload','value']], updColumpProp, ['columns']],
  [Actions.DEL_COLUMN]: [[[0, 'columns'], [1, 'payload','path']], delColumnCollectItem, ['columns']],
  [Actions.ACTION_SHEET_ADD]: [[[1, 'payload', 'value']], prop(0), ['actionSheet']],
  [Actions.ACTION_SHEET_CLEAR]: clone,
  // [Actions.FIELD_CHANGE_VALUE]: clone,
}

const extract = paths
const transform = clone
const load = curry((
  obj: any, path: (string|number)[], newValue: any
) => assocPath(
  path,
  newValue,
  obj
))

const ETL = [extract, transform, load]

export const home = pipe(
  pair,
  converge(
    apply,
    [
      converge(
        pipeWith,
        [
          always((
            f: any, res: any
          )=> isNil(res) ? res : f(res)), pipe(
            converge(
              zip,
              [
                pipe(
                  prop(0),
                  applyTo,
                  converge(
                    adjust(2),
                    [clone, always(ETL)]
                  )
                ), pipe(
                  path([1, 'type']),
                  prop<any, any>(
                    __,
                    reducers
                  ),
                )
              ],
            ), 
            map((ps:any[])=>ps[0](ps[1])),
          )
        ]
      ), of
    ]
  )
)