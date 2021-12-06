import { createContext } from 'react';
import { exampleFields } from './constants/Examples';

export const configInitialState = {
  theme: 'dark',
  lang: 'en',
  actionSheet: {
    component: null,
    data: null
  },
  columns: exampleFields,
  editColumn: null,
  rows: [],
  limiting: null,
  loading: false,
  format: 'json',
}

export const ConfigContext = createContext();
