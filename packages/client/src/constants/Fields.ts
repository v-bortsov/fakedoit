import {
  countries,
  languages,
  currencies,
  getCitiesByCountry,
} from '../services/network';
import { Actions } from './Actions';
import { ColumnType } from './typing.d';

export const MenuActionAddColumn = [
  { icon: 'playlist-plus', action: { type: Actions.ADD_COLUMN, payload: {type: ColumnType.CUSTOM }}, backgroundColor: '#b72424' },
  { icon: 'calendar-today', action: { type: Actions.ADD_COLUMN, payload: {type: ColumnType.DATE }}, backgroundColor: '#8524b7' },
  { icon: 'format-list-numbered', action: { type: Actions.ADD_COLUMN, payload: {type: ColumnType.NUMBER }}, backgroundColor: '#24b773' },
  { icon: 'database', action: { type: Actions.ADD_COLUMN, payload: {type: ColumnType.DICTIONARY }}, backgroundColor: '#ea8c2b' }
];

export const daysOfWeek = [
  { label: 'Sunday', abbr: 'Sun', active: false },
  { label: 'Monday', abbr: 'Mon', active: true },
  { label: 'Tuesday', abbr: 'Tue', active: false },
  { label: 'Wednesday', abbr: 'Wed', active: true },
  { label: 'Thursday', abbr: 'Thu', active: false },
  { label: 'Friday', abbr: 'Fri', active: true },
  { label: 'Saturday', abbr: 'Sat', active: false }
];
export const areas = [{ label: 'Custom', value: ColumnType.CUSTOM }, { label: 'Integer', value: ColumnType.NUMBER }, { label: 'Dates', value: ColumnType.DATE }, { label: 'Dictionary', value: ColumnType.DICTIONARY },];
export const dictionaries = [{ label: 'Cities', value: 'cities' }, { label: 'Countries', value: 'countries' }, { label: 'Languages', value: 'languages' }, { label: 'Currencies', value: 'currencies' },];
// const { TextArea } = Input
export const baseColumn = ['name', 'label', 'type', 'collect'];
export enum headType {
  TYPE = 0,
  NAME = 1,
  LABEL = 2
}
export const unionFields = {
  head: [
    {
      name: 'type',
      label: 'Type',
      component: {
        name: 'Select',
        rules: [['isEmpty', 'field is empty']],
        options: areas,
        defaultValue: null,
      }
    }, {
      name: 'name',
      label: 'Name',
      component: {
        name: 'Input',
        rules: [['isEmpty', 'field is empty'], ['uniqNameByColumns', 'The name is not unique in the current scope']],
        edit: false,
        defaultValue: 'asdfasf',
      },
    }, {
      name: 'label',
      label: 'Label',
      component: {
        name: 'Input',
        rules: [['isEmpty', 'field is empty']],
        edit: false,
        defaultValue: null,
      }
    }
  ],
  body: {
    collect: {
      name: 'collect',
      label: 'Collect',
      component: {
        rules: [],
        name: 'Manual',
        defaultValue: [],
        rows: 4,
      }
    }
  }
}

export const customFields = unionFields;
export const dateFields = {
  head:  [
    ...unionFields.head
  ],
  body: [
      ...unionFields.body, {
      name: 'days',
      label: 'Days of week',
      component: {
        rules: [],
        name: 'WeekDays',
        defaultValue: daysOfWeek,
      }
    }, {
      name: 'startDay',
      label: 'Start Day',
      component: {
        rules: [],
        name: 'DatePicker',
        value: new Date(),
      }
    }, {
      name: 'limit',
      label: 'Limit',
      component: {
        rules: [],
        name: 'InputNumber',
        defaultValue: 0,
      }
    }
  ]
}

export const integerFields = {
  head: [
  ...unionFields.head,
  ],
  body: [
    ...unionFields.body, 
    {
    name: 'from-to',
    label: 'From To',
    component: {
      rules: [],
      name: 'Multislider',
      defaultValue: [1, 10],
    }
  }, {
    name: 'length',
    label: 'Length',
    component: {
      rules: [],
      name: 'InputNumber',
      defaultValue: 10,
    }
  }
  ]
}
export const dictionaryFields = {
  head: [
  ...unionFields.head
  ],
  body: [
    ...unionFields.body, {
      name: 'dictionary',
      label: 'Type',
      component: {
        rules: [['isEmpty', 'field is empty']],
        name: 'Select',
        options: dictionaries,
        defaultValue: null,
      }
    },
  ]
}

export const requestByAreas = {
  countries: [['data', 'countries'], 'name', countries, []],
  languages: [['data', 'languages'], 'name', languages, []],
  currencies: [['data', 'currencies'], 'abbr', currencies, []],
  cities: [['data', 'countries', 0, 'cities'], 'name', getCitiesByCountry, [{ countryId: 176, limit: 10 }],],
};
