import { always, converge, curry, identity, map, memoizeWith, pipe } from 'ramda';
import { Field } from '../../react-app-env';
import Manual, { IManual } from '../components/forms/Manual';
import { ColumnType } from '../constants/typing';
import { IMapperItem } from './actionsMapper';
import { addValueAndOnChange, getReactComponentFromCollect as getComponentByName } from './form';

/**
 * 1. listComponents
 * 2. fuelActions
 *  - path
 *  -- columnIdx, collectIdx
 * 3. convergeComponentAndActions
 */
// export const buildForm = (type: ColumnType, mapper: IMapperItem, idx: number)=>pipe<ColumnType, IManual>(always)

export const makeInstance = curry((
  Component: any, props: Field 
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
      getComponentByName, addValueAndOnChange(
        dispatch,
        idx
      ),
    ]
  ))
))(fields);