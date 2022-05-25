import { update } from 'ramda';
import { useMemo, useCallback } from 'react';

const debounce = (
  fn: any, delay: number
) => {
  let timeout = -1;

  return (...args: any[]) => {
    if (timeout !== -1) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(
      fn,
      delay,
      ...args
    );
  };
};

export function useDebounceWithCollect(setValue: React.Dispatch<React.SetStateAction<string[]>>){
  const request = useMemo(
    () => debounce(
      (
        key: number, text: string
      ) => setValue(update(
        key,
        text
      )),
      300
    ),
    []
  );
 
  return request
}

export default function useDebounce(setValue: (value: any)=> void){

  const request = useMemo(
    () => debounce(
      (text: string) => setValue(text),
      300
    ),
    []
  );
  
  const onQueryChange = useCallback(
    (q: string) => request(q),
    []
  );

  return onQueryChange
}