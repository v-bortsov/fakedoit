import { useEffect, useReducer, useRef } from 'react';
import { GeneratorState } from '../types/react-app-env';

const loggerBefore = (
  action: any, state: GeneratorState
): void => {
  console.log(
    'logger before:',
    action,
    state
  );
};
  
const loggerAfter = (
  action: any, state: GeneratorState
) => {
  console.log(
    'logger after:',
    action,
    state
  );
};

const useReducerWithMiddleware = (
  reducer: any,
  initialState: GeneratorState,
  middlewareFns: any[],
  afterwareFns: any[]
) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );
  
  const aRef = useRef();
  
  const dispatchWithMiddleware = (action: any) => {
    middlewareFns.forEach((middlewareFn) => middlewareFn(
      action,
      state
    ));
  
    aRef.current = action;
  
    dispatch(action);
  };
  
  useEffect(
    () => {
      if (!aRef.current) return;
  
      afterwareFns.forEach((afterwareFn) => afterwareFn(
        aRef.current,
        state
      ));
  
      aRef?.current = null;
    },
    [
      afterwareFns,
      state
    ]
  );
  
  return [
    state,
    dispatchWithMiddleware
  ];
};

export { useReducerWithMiddleware, loggerBefore, loggerAfter };
