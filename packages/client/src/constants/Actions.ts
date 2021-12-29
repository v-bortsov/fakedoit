import { curry } from 'ramda'
import { Actions, ColumnType } from '../types/enums'
import { MenuActionAddColumn } from './Fields'

type DispathParams = {
  dispatch: Dispatch
  key: string|number
  prop?: string
  idx: number
  value: any
  path?: (string|number)[]
  type?: ColumnType
}

export const addColumnCollectItem = curry(({dispatch, idx, value}): DispathParams => dispatch({
  type: Actions.ADD_COLUMN_COLLECT_ITEM,
  payload: {
    idx,
    value
  }
}))
export const delColumnCollectItem = curry(({dispatch, idx, key}): DispathParams => dispatch({
  type: Actions.DEL_COLUMN_COLLECT_ITEM,
  payload: {
    path: [
      idx,
      'body',
      'collect',
      'component',
      'value',
      key
    ]
  }
}))
export const updColumnCollectItem = curry(({dispatch, idx, key, value}): DispathParams => dispatch({
  type: Actions.UPD_COLUMN_COLLECT_ITEM,
  payload: {
    path: [
      idx,
      'body',
      'collect',
      'value',
      key
    ],
    value
  }
}))
export const addMenuToActionSheet = curry(({dispatch, value}): DispathParams => dispatch({
  type: Actions.ACTION_SHEET_ADD,
  payload: {
    path: ['actionSheet'],
    value
  }
}))

export const updColumnValue = curry(({dispatch, idx, prop, value}: DispathParams)=> dispatch({
  type: Actions.UPD_COLUMN_VALUE,
  payload: {
    path: [
      idx,
      'head',
      prop,
      'value'
    ],
    value
  }
}))
export const updColumnEdit = curry(({dispatch, idx, prop, value}: DispathParams)=> dispatch({
  type: Actions.UPD_COLUMN_EDIT,
  payload: {
    path: [
      idx,
      'head',
      prop,
      'edit'
    ],
    value: !value
  }
}))
export const delColumn = curry(({dispatch, idx, key}: DispathParams)=> dispatch({
  type: Actions.DEL_COLUMN,
  payload: {
    path: [
      idx,
      'body',
      'collect',
      'value',
      key
    ]
  }
}))
export const updFieldValueByColumn = curry(({dispatch, path, value}: DispathParams)=> dispatch({
  type: Actions.UPD_FIELD_VALUE_BY_COLUMN,
  payload: {
    path,
    value
  }
}))
export const addColumn = curry(({dispatch, type}): DispathParams => dispatch({
  type: Actions.ADD_COLUMN,
  payload: {
    type, 
    path: ['columns']
  }
}))
export const startGen = ({dispatch}: any) => dispatch({
  type: Actions.START_GEN,
  payload: null
})

export const HeaderCollapse = [
  updColumnValue,
  updColumnEdit,
]

export const CustomBodyCollapse = [
  addColumnCollectItem,
  delColumnCollectItem,
  updColumnCollectItem
]
export const DateBodyCollapse = [updFieldValueByColumn]
export const NumberBodyCollapse = [updFieldValueByColumn]
export const DictionaryBodyCollapse = []
export const FooterCollapse = [
  addColumn,
  startGen
]
export const FooterBodyCollapse = []