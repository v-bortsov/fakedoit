import { ColumnTypeBase, ColumnTypeNumber, ColumnTypeDate, GeneratorState, Field } from '../../react-app-env'


export enum ColumnType {
   CUSTOM = 'CUSTOM',
   DATE = 'DATE',
   NUMBER = 'NUMBER',
   DICTIONARY = 'DICTIONARY',
}
/** Start AllList */

type ColumnList = ColumnTypeBase | ColumnTypeNumber | ColumnTypeDate

type ScreensList = ScreenHome | ScreenError
export interface Collapse {
   head: [Field<ComponentSelectBase>, Field<ComponentInputNumberBase>, Field<ComponentInputNumberBase>]
   body: any[]
}
export enum Props {
   NAME = 'name',
   LABEL = 'label',
   TYPE = 'type',
   LIMIT = 'limit',
   VALUE = 'value'
}
export enum Components {
   Switch = 'Switch',
   ActionSheet = 'ActionSheet',
   Menu = 'Menu',
   Input = 'Input',
   TextArea = 'TextArea',
   Select = 'Select',
   InputNumber = 'InputNumber',
   DatePicker = 'DatePicker',
   Weekdays = 'Weekdays',
   ButtonGroup = 'ButtonGroup',
}
/** End AllList */
interface ComponentBase {
   name: Components
}
interface ComponentInputBase extends ComponentBase {
   value: string | null | number[]
   defaultValue: string | null | number[];
   rules: string[][];
   edit: boolean
   // onChange: Dispatch<typeof COLUMN_UPD_LABEL | typeof COLUMN_UPD_NAME, string>
   // onEdit: Dispatch<typeof COLUMN_UPD_LABEL_EDIT | typeof COLUMN_UPD_NAME_EDIT, boolean>
}
interface ComponentInputNumberBase extends ComponentBase {
   name: Components.InputNumber
   range: number[]
}
interface ComponentWeekdaysBase extends ComponentBase {
   name: Components.Weekdays
   range: number[]
}
export enum NumberType {
   'ceil',
   'float'
}
interface ComponentButtonGroupBase extends ComponentBase {
   name: Components.ButtonGroup
   options: string[]
}
interface ComponentSelectBase extends ComponentBase {
   name: Components.Select
   options: string[]
}

interface ComponentTextAreaBase extends ComponentInputBase {
   name: Components.TextArea
   rows: number
}
interface ComponentSwitchBase extends ComponentInputBase {
   name: Components.Switch
}
interface ComponentDatePickerBase extends ComponentInputBase {
   name: Components.DatePicker
}
type ScreenHome = 'ScreenHome'
type ScreenError = 'ScreenError'
