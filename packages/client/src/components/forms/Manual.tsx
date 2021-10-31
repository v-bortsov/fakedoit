import React from 'react'
import { View, Text } from 'react-native'
interface IManual {
  addItem: any
  editable: any
  output: any[]
}
const Manual: React.FC<IManual> = ({addItem, editable, output}) => {
  return (
    <View>
      <View>{addItem}</View>
      <View>{output.map((value, idx)=> editable(value, idx))}</View>
    </View>
  )
}

export default Manual