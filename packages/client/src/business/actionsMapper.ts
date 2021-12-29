import { addColumnCollectItem, addMenuToActionSheet, delColumnCollectItem, updColumnCollectItem, updColumnValue } from '../constants/Actions';


export interface IMapperItem {
  [key: string]: {
    actions: any
    name: string
    components?: IMapperItem
  }[]
}

export const mapper: IMapperItem = {
  Home: [
    {
      name: 'home',
      actions: {
        startGen: null,
        addMenuToActionSheet
      }
    }
  ],
  ManualForm: [
    {
      name: 'manual',
      actions: {},
      components: {
        InputWithButton: [
          {
            name: 'addItem',
            actions: {
              onSubmit: addColumnCollectItem
            }
          }
        ],
        InputHover: [
          {
            name: 'editableItem',
            actions: {
              onEdit: updColumnCollectItem,
              onDel: delColumnCollectItem
            }
          }
        ],
      }
    }
  ],
  DateForm: [
    {
      name: 'manual',
      actions: {},
      components: {
        SlideNumber: [
          {
            name: 'total',
            actions: {
              onChange: updColumnValue
            }
          }
        ],
        DatePicker: [
          {
            name: 'startDate',
            actions: {
              onChange: updColumnValue
            }
          }
        ],
        WeekdaysPicker: [
          {
            name: 'days',
            actions: {
              onChange: updColumnValue
            }
          }
        ],
        Toggle: [
          {
            name: 'preview',
            actions: {
              onChange: updColumnValue
            }
          }
        ],
      }
    }
  ]
}