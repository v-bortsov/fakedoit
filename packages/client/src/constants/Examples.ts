import { ColumnType } from '../types/enums';
import { areas } from './Fields';

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
        component: 'Select',
        options: areas,
        defaultValue: null,
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
        rules: [
          [
            'isEmpty',
            'field is empty'
          ]
        ],
        component: 'TextArea',
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
    },
  }
];
