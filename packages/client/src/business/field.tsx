import { converge, curry, identity, map, memoizeWith, pipe } from "ramda";
import { Field } from "../../react-app-env";
import { addValueAndOnChange, getReactComponentFromCollect as getComponentByName } from "./form";

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
}): JSX.Element => pipe<any, any>(
  memoizeWith(
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
  )
)(fields);