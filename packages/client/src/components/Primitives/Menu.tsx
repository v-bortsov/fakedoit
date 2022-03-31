import React from 'react'
import { Pressable, Text, View } from 'react-native'

export const Menu = ({items, dispatch}: any) => (
  <View>
    {items.map((
      {backgroundColor, icon, action, label}: any, k: number
    )=>(
      <Pressable
        key={k}
        style={{backgroundColor, padding: 10}}
        onPress={()=>dispatch(action)}
      >
        <Text style={{fontSize: 25}}>{label}</Text>
      </Pressable>
    ))}
  </View>
)

// const styles = StyleSheet.create({})