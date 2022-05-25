import React from 'react'
import { View, Text } from 'react-native'
import { updColumnValue } from '../../constants/Actions'
import { NewSlider } from '../Primitives/Slider/NewSlider'
import { WeekDays } from '../Primitives/WeekDays'

interface IDateForm {
  addItem: React.FC<any>
  output: any[]
  editableItem: React.FC<any>,
  limit: number,
  startDay: Date,
  daysOfWeek: any[]
  idx: number,
  dispatch: any
}

function DateForm({limit, startDay, daysOfWeek, idx, dispatch}: IDateForm){
  return (
    <View>
      <Text>Days of Week:</Text>
      <WeekDays
        value={daysOfWeek}
        onChange={(value)=>updColumnValue({
          dispatch,
          path: [
            idx,
            'body',
            'days',
            'component',
            'value'
          ],
          value
        })}
      />
      <Text>Count: {limit}</Text>
      <NewSlider
        animateTransitions
        value={limit}
        step={1}
        maximumValue={100}
        onSlidingComplete={(value)=>updColumnValue({
          dispatch,
          path: [
            idx,
            'body',
            'limit',
            'component',
            'value'
          ],
          value
        })}
      />
    </View>
  )
}
export default DateForm
