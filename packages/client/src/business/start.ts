import { always, clone, converge, flatten, is, map, path, pipe, propEq, slice, when, xprod, zipObj, __ } from 'ramda';
import { headType } from '../types/enums';
import { TypeLimiting } from '../types/react-app-env';
import { sliceAndTranspose } from '../utils';

export const multipledParts: any = (parts: any[][]) => parts.reduce(<any>xprod)
/**
 *   CartesianProduct Non using Ramda
  const result = parts.reduce((
    a, b
  ) => a.reduce(
    (
      r, v
    ) => r.concat(b.map(w => [].concat(
      v, w
    ))), []
  ))
 */
export const cartesianCondition: any = ([columns, limiting]: [CollapseForm<FormTypes>[], TypeLimiting]) => pipe<any, any, any, any, any, any>(
  map(path([
    'body',
    'collect',
    'component',
    'value'
  ])),
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
        always(map(
          path([
            'head',
            headType.NAME,
            'value'
          ]),
          columns
        )),
        clone
      ]
    )
  ))
)(columns)