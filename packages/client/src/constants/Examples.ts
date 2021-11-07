import { areas } from './Fields';
import { ColumnType } from './typing';

export const exampleFields = [
  {
    type: {
      name: 'type',
      label: 'Type',
      rules: [['isEmpty', 'field is empty']],
      component: 'Select',
      options: areas,
      defaultValue: null,
      value: ColumnType.CUSTOM,
    },
    name: {
      name: 'name',
      label: 'Name',
      rules: [['isEmpty', 'field is empty'], ['uniqNameByColumns', 'The name is not unique in the current scope'],],
      component: 'Input',
      defaultValue: 'asdfasf',
      value: 'city',
      edit: false
    },
    label: {
      name: 'label',
      label: 'Label',
      rules: [['isEmpty', 'field is empty']],
      component: 'Input',
      defaultValue: null,
      value: 'city',
      edit: false
    },
    collect: {
      name: 'collect',
      label: 'Collect',
      rules: [['isEmpty', 'field is empty']],
      component: 'TextArea',
      defaultValue: null,
      rows: 4,
      value: ['msc', 'spb', 'ekt', 'sochi', 'vladik'],
    },
  },
];
