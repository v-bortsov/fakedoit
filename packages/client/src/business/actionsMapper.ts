import { addColumnCollectItem, addMenuToActionSheet, delColumnCollectItem, updColumnCollectItem, updColumnValue } from "../constants/Actions";

export const mapper = {
  Home: {
    actions: {
      startGen: null,
      addMenuToActionSheet
    }
  },
  ManualForm: {
    InputWithButton: [{
      name: 'addItem',
      actions: {
        onSubmit: addColumnCollectItem
      }
    }],
    InputHover: [{
      name: 'editableItem',
      actions: {
        onEdit: updColumnCollectItem,
        onDel: delColumnCollectItem
      }
    }],
    actions: {}
  },
  DateForm: {
    SlideNumber: {
      name: 'total',
      actions: {
        onChange: updColumnValue
      }
    },
    DatePicker: {
      name: 'startDate',
      actions: {
        onChange: updColumnValue
      }
    },
    WeekdaysPicker: {
      name: 'days',
      actions: {
        onChange: updColumnValue
      }
    },
    Toggle: {
      name: 'preview',
      actions: {
        onChange: updColumnValue
      }
    },
  }
}