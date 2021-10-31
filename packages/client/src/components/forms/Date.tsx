import React from "react"
import { View } from "react-native"

interface IDateForm {
  addItem: React.FC<any>
  output: any[]
  editableItem: React.FC<any>
}
function DateForm({addItem, output, editableItem}: IDateForm){
  return <View>
          <View>
            {addItem}
          </View>
          <View>
            {output}
          </View>
        </View>
}
export default DateForm
