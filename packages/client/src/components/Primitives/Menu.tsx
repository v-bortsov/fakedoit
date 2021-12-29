import React from 'react'
import { Pressable, Text, View } from 'react-native'

export const Menu = ({items, dispatch}: any) => (
  <View>
    {items.map((
      {backgroundColor, icon, action}: any, k: number
    )=>(
      <Pressable
        style={{backgroundColor, padding: 10, fontSize: 25}}
        onPress={()=>dispatch(action)}
      >
        <Text>{action.payload.type}</Text>
      </Pressable>
    ))}
  </View>
)

// const styles = StyleSheet.create({})