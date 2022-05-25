import { Actions, ColumnType } from '../types/enums';
import { getCountries, languages, currencies, getCitiesByCountry, } from '../services/network';

export const MenuActionAddColumn = [
  { icon: 'playlist-plus', label: 'Custom', action: { type: Actions.ADD_COLUMN, payload: {type: ColumnType.CUSTOM }}, backgroundColor: '#b72424' },
  { icon: 'calendar-today', label: 'Dates', action: { type: Actions.ADD_COLUMN, payload: {type: ColumnType.DATE }}, backgroundColor: '#8524b7' },
  { icon: 'format-list-numbered', label: 'Numbers', action: { type: Actions.ADD_COLUMN, payload: {type: ColumnType.NUMBER }}, backgroundColor: '#24b773' },
  { icon: 'database', label: 'Cities', action: { type: Actions.ADD_COLUMN, payload: {type: ColumnType.ONTOLOGY, prop: 'country' }}, backgroundColor: '#ea8c2b' },
  { icon: 'database', label: 'Countries', action: { type: Actions.ADD_COLUMN, payload: {type: ColumnType.ONTOLOGY, prop: 'language' }}, backgroundColor: '#ea8c2b' }
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

export const areas = [
  { label: 'Custom', value: ColumnType.CUSTOM },
  { label: 'Number', value: ColumnType.NUMBER },
  { label: 'Dates', value: ColumnType.DATE },
  { label: 'Ontology', value: ColumnType.ONTOLOGY },
];

export const dictionaries = [
  { label: 'Cities', value: 'cities' },
  { label: 'Countries', value: 'countries' },
  { label: 'Languages', value: 'languages' },
  { label: 'Currencies', value: 'currencies' },
];
// const { TextArea } = Input
export const baseColumn = [
  'name',
  'label',
  'type',
  'collect'
];

export const unionFields = {
  head: [
    {
      name: 'type',
      label: 'Type',
      component: {
        name: 'Select',
        rules: [
          [
            'isEmpty',
            'field is empty'
          ]
        ],
        options: areas,
        defaultValue: null,
      }
    },
    {
      name: 'name',
      label: 'Name',
      component: {
        name: 'Input',
        rules: [
          [
            'isEmpty',
            'field is empty'
          ],
          [
            'uniqNameByColumns',
            'The name is not unique in the current scope'
          ]
        ],
        edit: false,
        defaultValue: 'asdfasf',
      },
    },
    {
      name: 'label',
      label: 'Label',
      component: {
        name: 'Input',
        rules: [
          [
            'isEmpty',
            'field is empty'
          ]
        ],
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
        value: [],
        rows: 4,
      }
    }
  }
}

export const customFields = unionFields;
export const dateFields = {
  head:  [...unionFields.head],
  body: {
    ...unionFields.body, 
    days: {
      name: 'days',
      label: 'Days of week',
      component: {
        rules: [],
        name: 'WeekDays',
        defaultValue: daysOfWeek,
        value: daysOfWeek,
      }
    }, 
    startDay: {
      name: 'startDay',
      label: 'Start Day',
      component: {
        rules: [],
        name: 'DatePicker',
        value: new Date(),
      }
    }, 
    limit: {
      name: 'limit',
      label: 'Limit',
      component: {
        rules: [],
        name: 'InputNumber',
        defaultValue: 0,
      }
    }
  }
}

export const integerFields = {
  head: [...unionFields.head],
  body: {
    // ...unionFields.body, 
    'from-to': {
      name: 'from-to',
      label: 'From To',
      component: {
        rules: [],
        name: 'Multislider',
        defaultValue: [
          1,
          10
        ],
      }
    },
    length: {
      name: 'length',
      label: 'Length',
      component: {
        rules: [],
        name: 'InputNumber',
        defaultValue: 10,
      }
    }
  }
}



export const dictionaryFields = {
  head: [...unionFields.head],
  body: {
    ...unionFields.body, 
    country:  {label: 'Country', component: {name: 'country', value: 1, options: areas, defaultValue: null}},
    // dictionary: {
    //   name: 'dictionary',
    //   label: 'Type',
    //   component: {
    //     rules: [
    //       [
    //         'isEmpty',
    //         'field is empty'
    //       ]
    //     ],
    //     name: 'Select',
    //     options: dictionaries,
    //     defaultValue: null,
    //   }
    // },
  }
}

export const requestByAreas = {
  countries: [
    [
      'data',
      'countries'
    ],
    'name',
    getCountries,
    []
  ],
  languages: [
    [
      'data',
      'languages'
    ],
    'name',
    languages,
    []
  ],
  currencies: [
    [
      'data',
      'currencies'
    ],
    'abbr',
    currencies,
    []
  ],
  cities: [
    [
      'data',
      'countries',
      0,
      'cities'
    ],
    'name',
    getCitiesByCountry,
    [{ countryId: 176, limit: 10 }],
  ],
};
