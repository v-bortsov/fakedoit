import { ColumnType } from '../types/enums';
import { areas } from './Fields';

export const exampleFilters = {
  uniq: {},
  total: {},
  shuffle: {},
  column: {}
}

export const exampleFields = [
  {
    head: [
      {
        name: 'type',
        label: 'Type',
        rules: [
          [
            'isEmpty',
            'field is empty'
          ]
        ],
        component: {name: 'Select', value: ColumnType.CUSTOM, options: areas, defaultValue: null},
        value: ColumnType.CUSTOM,
      },
      {
        name: 'name',
        label: 'Name',
        rules: [
          [
            'isEmpty',
            'field is empty'
          ],
          [
            'uniqNameByColumns',
            'The name is not unique in the current scope'
          ],
        ],
        component: 'Input',
        defaultValue: 'asdfasf',
        value: 'city',
        edit: false
      },
      {
        name: 'label',
        label: 'Label',
        rules: [
          [
            'isEmpty',
            'field is empty'
          ]
        ],
        component: 'Input',
        defaultValue: null,
        value: 'city',
        edit: false
      },
    ],
    body: {
      collect: {
        name: 'collect',
        label: 'Collect',
        component: {
          name: 'Manual',
          rules: [
            [
              'isEmpty',
              'field is empty'
            ]
          ],
          defaultValue: null,
          rows: 4,
          value: [
            'msc',
            'spb',
            'ekt',
            'sochi',
            'vladik'
          ],
        },
      }
    },
  },
  {
    head: [
      {
        name: 'type',
        label: 'Type',
        rules: [
          [
            'isEmpty',
            'field is empty'
          ]
        ],
        component: {name: 'Select', value: ColumnType.CUSTOM, options: areas, defaultValue: null},
        value: ColumnType.CUSTOM,
      },
      {
        name: 'name',
        label: 'Name',
        rules: [
          [
            'isEmpty',
            'field is empty'
          ],
          [
            'uniqNameByColumns',
            'The name is not unique in the current scope'
          ],
        ],
        component: 'Input',
        defaultValue: 'asdfasf',
        value: 'work',
        edit: false
      },
      {
        name: 'label',
        label: 'Label',
        rules: [
          [
            'isEmpty',
            'field is empty'
          ]
        ],
        component: 'Input',
        defaultValue: null,
        value: 'work',
        edit: false
      },
    ],
    body: {
      collect: {
        name: 'collect',
        label: 'Collect',
        component: {
          name: 'Manual',
          rules: [
            [
              'isEmpty',
              'field is empty'
            ]
          ],
          defaultValue: null,
          rows: 4,
          value: [
            'developer',
            'senior software engineer',
            'full-stack developer'
          ],
        },
      }
    },
  }
];
