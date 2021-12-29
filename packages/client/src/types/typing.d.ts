// import { ColumnTypeBase, ColumnTypeNumber, ColumnTypeDate, Field } from './react-app-env'

type Dispatch = (params: Action)=>void

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

/** Start AllList */
type ColumnList = ColumnTypeBase | ColumnTypeNumber | ColumnTypeDate

type ScreensList = ScreenHome | ScreenError

interface CollapseForm<T> {
   head: [Field<ComponentSelectBase>, Field<ComponentInputNumberBase>, Field<ComponentInputNumberBase>],
   body: T
}

type FormTypes = ManualForm

/** End AllList */
interface ComponentBase {
   name: Components
   value: string | null | number[]
   defaultValue: string | null | number[];
   rules: string[][] | null;
}

interface ManualComponent extends ComponentInputBase {
   onPress: ()=>void
   onSave: ()=>void
   onDelete: ()=>void
}

interface ComponentInputBase extends ComponentBase {
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
