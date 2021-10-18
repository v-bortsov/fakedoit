import { ColumnType, OptionNumber, OptionDate } from '../../react-app-env'
import {COLUMN_ADD, COLUMN_DEL, COLUMN_UPD, ACTION_SHEET_ADD, ACTION_SHEET_DEL, START_GEN, FIELD_CHANGE_VALUE} from './Actions'

// type COLUMN_ADD = 'COLUMN_ADD'
type ComponentActionSheet = 'ActionSheet'
type ComponentMenu = 'Menu'

type ScreenHome = 'ScreenHome'
type ScreenError = 'ScreenError'

/** Start TypeList */
type CustomType = ColumnType<null>
type NumberType = ColumnType<OptionNumber>
type DateType = ColumnType<OptionDate>
/** End TypeList */

/** Start AllList */

type ColumnList = CustomType | NumberType | DateType

type ScreensList = ScreenHome | ScreenError

type ActionsList = typeof COLUMN_ADD | typeof COLUMN_DEL


/** End AllList */

type Value = number

interface Action<Name, Value> {
   type: Name
   payload: Payload<Value>
}

type Payload<Value> = {
   value: Value
   path: (string|number)[]
}

/** Start Function */
type Dispatch = (params: Action<ActionsList, Value>) => void