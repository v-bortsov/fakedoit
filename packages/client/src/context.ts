import { createContext } from 'react';
import { exampleFields } from './constants/Examples';
export const ConfigContext = createContext({ theme: "dark", lang: 'en' });
export const initialState = {
  columns: exampleFields,
  editColumn: null,
  rows: [],
  limiting: null,
  loading: false,
  format: 'json',
};
export const GeneratorContext = createContext(initialState);
