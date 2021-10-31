import { pipe, pair, converge, prop, __, clone, path, apply, zipObj, call, map, paths, pipeWith, zip } from "ramda";
import { Actions, } from "../constants/Actions";
import { addColumn } from "../business/column";
import { cartesianCondition } from "../business/start";

const reducers = {
  [Actions.ADD_COLUMN]: [[[1, 'payload', 'type'], [0, 'columns']], addColumn, [0, 'columns']],
  [Actions.START_GEN]: [[[0, 'columns'], [0, 'limiting']], cartesianCondition, [0, 'rows']],
  [Actions.COLUMN_UPD_COLLECT]: clone,
  [Actions.UPD_COLUMN_VALUE]: clone,
  [Actions.UPD_COLUMN_EDIT]: clone,
  [Actions.ACTION_SHEET_ADD_MENU]: clone,
  [Actions.ACTION_SHEET_CLEAR]: clone,
  [Actions.FIELD_CHANGE_VALUE]: clone,
}
const extract =  paths
const load = zipObj
const etl = [extract, apply, load]

export const home = pipe(
  pair,
  converge(
    call,
    [
      pipe(
        path([1, 'type']),
        prop<any,any>(__, reducers),
        zip<any,any>(__, etl),
        map(apply),
        converge(
          pipeWith,
          [
            call,
            clone
          ]
        )
      ),
      clone
    ]
  ),
  prop(0)
)