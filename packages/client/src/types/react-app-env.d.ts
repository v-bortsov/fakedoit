/// <reference types="react-scripts" />

type Nullable<T> = T | null;

declare type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

interface ObjectLiteral {
  [key: string]: any;
}

const type = <const>[
  'json',
  'csv'
];

type TypeLimiting = null | number | ColumnType.name;

interface GeneratorState {
  theme: 'dark' | 'light';
  lang: string;
  columns: CollapseForm[];
  rows: any[];
  limiting: TypeLimiting;
  loading: boolean | undefined;
  editColumn: Nullable<string>;
  format: typeof type[number];
}

type Field<T> = {
  readonly name: string;
  readonly label: string;
  component: T;
}


export interface BaseForm {
  collect: Fields<ComponentTextAreaBase> | null;
}

interface CustomForm {
  addItem: Field<ComponentInput>;
}

interface NumberForm extends BaseForm {
  range: Field<ComponentInputNumberBase>
  random: Field<ComponentSwitchBase>;
  step: Field<ComponentInputNumberBase>;
  mode: Field<ComponentButtonGroupBase> 
}

interface DateForm extends BaseForm {
  days: Field<ComponentWeekdaysBase>;
  total: Field<ComponentInputNumberBase>
  range: Field<ComponentDatePickerBase>
}

type ColumnTypeString = {
  range: [number, number];
  options: [number, number];
  length: number;
};

type Day = {
  label: string;
  abbr: string;
  active: boolean;
};

type WeekDay = {
  value: Tuple<Day, 7>;
  onChange: any;
};

interface IDateOption {
  days: number[];
  lengthDays: number;
  dates: string[];
  limit: number;
  mode: 'week' | 'range';
  startDate: any;
  endDate: string;
}