import { curry, prop } from "ramda"
import { MenuActionAddColumn } from "./Fields"
import { ColumnType } from "./typing"

export enum Actions {
  ADD_COLUMN = 'ADD_COLUMN',

  DEL_COLUMN = 'DEL_COLUMN',

  UPD_COLUMN_VALUE = 'UPD_COLUMN_VALUE',

  UPD_COLUMN_EDIT = 'UPD_COLUMN_EDIT',

  UPD_COLUMN_COLLECT_ITEM = 'UPD_COLUMN_COLLECT_ITEM',
  DEL_COLUMN_COLLECT_ITEM = 'DEL_COLUMN_COLLECT_ITEM',
  ADD_COLUMN_COLLECT_ITEM = 'ADD_COLUMN_COLLECT_ITEM',

  COLUMN_UPD_PRIMARY_KEY = 'COLUMN_UPD_PRIMARY_KEY',

  UPD_FIELD_VALUE_BY_COLUMN = 'UPD_FIELD_VALUE_BY_COLUMN',

  ACTION_SHEET_ADD_MENU = 'ACTION_SHEET_ADD_MENU',
  ACTION_SHEET_CLEAR = 'ACTION_SHEET_CLEAR',

  START_GEN = 'START_GEN'
}
type Value = number | boolean
type Path = (string|number)[] | null

interface Action{
  type: Actions
  payload: Payload | null
}

type Payload = {
  type?: ColumnType;
  value?: Value;
  path?: Path;
}
export type Dispatch = (params: Action)=>void

export enum ScreenComponents {
  ScrollArcordion = 'ScrollArcordion',
  FooterFilter = 'FooterFilter',
  ActionSheet = 'ActionSheet'
}

type DispathParams = {
  dispatch: Dispatch
  key?: string|number
  prop?: string
  idx?: number
  value?: any
  path?: (string|number)[]
  type?: ColumnType
}

export const addColumnCollectItem = curry(({dispatch, path, value}): DispathParams => dispatch({
  type: Actions.ADD_COLUMN_COLLECT_ITEM,
  payload: {
    path,
    value
  }
}))
export const delColumnCollectItem = curry(({dispatch, path}): DispathParams => dispatch({
  type: Actions.DEL_COLUMN_COLLECT_ITEM,
  payload: {
    path
  }
}))
export const updColumnCollectItem = curry(({dispatch, path, value}): DispathParams => dispatch({
  type: Actions.UPD_COLUMN_COLLECT_ITEM,
  payload: {
    path,
    value
  }
}))
export const addMenuToActionSheet = curry(({dispatch}): DispathParams => dispatch({
  type: Actions.ACTION_SHEET_ADD_MENU,
  payload: {
    path: ['actionSheet'],
    value: { component: 'Menu', data: {items: MenuActionAddColumn}}
  }
}))

export const updColumnValue = curry(({dispatch, key, idx, prop, value}: DispathParams)=> dispatch({
  type: Actions.UPD_COLUMN_VALUE,
  payload: {
    path: [key, idx, prop, 'value'],
    value
  }
}))
export const updColumnEdit = curry(({dispatch, key, idx, prop, value}: DispathParams)=> dispatch({
  type: Actions.UPD_COLUMN_EDIT,
  payload: {
    path: [key, idx, prop, 'edit'],
    value: !value
  }
}))
export const delColumn = curry(({dispatch, key, idx}: DispathParams)=> dispatch({
  type: Actions.DEL_COLUMN,
  payload: {
    path: [key, idx]
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
export const startGen = ({dispatch}): DispathParams => dispatch({
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
export const DateBodyCollapse = [
  updFieldValueByColumn
]
export const NumberBodyCollapse = [
  updFieldValueByColumn
]
export const DictionaryBodyCollapse = [

]
export const FooterCollapse = [
  addColumn,
  startGen
]
export const FooterBodyCollapse = [

]