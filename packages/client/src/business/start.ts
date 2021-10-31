import { always, clone, converge, flatten, is, map, pipe, pluck, propEq, slice, when, xprod, zipObj, __ } from "ramda";
import { TypeLimiting } from "../../react-app-env";
import { Collapse } from "../constants/typing";
import { propFilterAndPluck, sliceAndTranspose } from "../utils";

export const multipledParts: any = (parts: any[][]) => parts.reduce(<any>xprod)

export const cartesianCondition: any = (
  [columns, limiting]: [Collapse[], TypeLimiting]
) => pipe<any, any, any, any, any, any>(
  propFilterAndPluck(
    'name',
    limiting,
    'collect'
  ),
  multipledParts,
  when(
    always(is(
      String,
      limiting
    )),
    sliceAndTranspose(
      columns,
      __,
      propEq(
        'name',
        limiting
      )
    )
  ),
  when(
    always(is(
      Number,
      limiting
    )),
    slice(
      0,
      limiting
    )
  ),
  map(pipe<any, any, any>(
    flatten,
    converge(
      zipObj,
      [
        always(pluck(
          'name',
          columns
        )), clone
      ]
    )
  ))
)(columns)