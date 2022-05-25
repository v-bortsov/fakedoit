import { converge, curry, identity, map, memoizeWith, pipe } from 'ramda';
import React from 'react';
import { addValueAndOnChange, getReactComponentFromCollect as getComponentByName } from './form';

export const makeInstance = curry((
  Component: any, props: any 
): JSX.Element => <Component {...props} /> );

export default ({
  fields,
  dispatch,
  idx,
}: {
  idx: number;
  fields: any[];
  dispatch: any;
}): JSX.Element => pipe<any, any>(memoizeWith(
  identity,
  map(converge(
    makeInstance,
    [
      getComponentByName([
        'component',
        'name'
      ]),
      addValueAndOnChange(
        dispatch,
        idx
      ),
    ]
  ))
))(fields);