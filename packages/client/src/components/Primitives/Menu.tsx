import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export const Menu = ({items, dispatch}: any) => (
  <View>
    {items.map((
      {backgroundColor, type, action}: any, k: number
    )=>(
      <Pressable
        style={{backgroundColor}}
        onPress={()=>dispatch(action)}
      >
        <Text>{type}</Text>
      </Pressable>
    ))}
  </View>
)

const styles = StyleSheet.create({})
