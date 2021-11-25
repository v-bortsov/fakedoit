export enum ColumnType {
  CUSTOM = 'CUSTOM',
  DATE = 'DATE',
  NUMBER = 'NUMBER',
  DICTIONARY = 'DICTIONARY',
}
export enum Props {
  NAME = 'name',
  LABEL = 'label',
  TYPE = 'type',
  LIMIT = 'limit',
  VALUE = 'value'
}

export enum headType {
  TYPE = 0,
  NAME = 1,
  LABEL = 2
}

export enum ScreenComponents {
  ScrollArcordion = 'ScrollArcordion',
  FooterFilter = 'FooterFilter',
  ActionSheet = 'ActionSheet'
}

export enum Components {
  Switch = 'Switch',
  ActionSheet = 'ActionSheet',
  Menu = 'Menu',
  Input = 'Input',
  InputWithButton = 'InputWithButton',
  TextArea = 'TextArea',
  Select = 'Select',
  InputNumber = 'InputNumber',
  DatePicker = 'DatePicker',
  Weekdays = 'Weekdays',
  ButtonGroup = 'ButtonGroup'
}

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

export enum Interval {
  days = 'days',
  weeks = 'weeks',
  hours = 'hours',
}

export enum DaysOfWeek {
  Sun = 0,
  Mon = 1,
  Tue = 2,
  Wed = 3,
  Thu = 4,
  Fri = 5,
  Sat = 6,
}

export enum NumberType {
  'ceil',
  'float'
}

export enum Format {
  json = 'json',
  csv = 'csv',
}