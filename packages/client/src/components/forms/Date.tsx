import React from 'react'
import { View, Text } from 'react-native'
import { daysOfWeek } from '../../constants/Fields'
import { NewSlider } from '../Primitives/Slider/NewSlider'
import { WeekDays } from '../Primitives/WeekDays'

interface IDateForm {
  addItem: React.FC<any>
  output: any[]
  editableItem: React.FC<any>
}
function DateForm(){
  return (<View>
    <Text>Days of Week:</Text>
    <WeekDays value={daysOfWeek} />
    <Text>Count:</Text>
    <NewSlider
      animateTransitions
      value={2}
      maximumValue={10}
      onValueChange={console.log}/>
  </View>)
}
export default DateForm
