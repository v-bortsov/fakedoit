import { uniq } from 'ramda'
import React from 'react'
import { StyleSheet, Switch, Text, View } from 'react-native'
import { NewSlider } from '../Primitives/Slider/NewSlider'

export default function NumberForm() {
  const isEnablede = true
  return (
    <View>
      <Text>Range:</Text>
      <NewSlider
        animateTransitions
        value={[
          1,
          2
        ]}
        maximumValue={10}
        onValueChange={(value: any) => console.log(value)}
      />
      <Text>Count:</Text>
      <NewSlider
        animateTransitions
        value={2}
        maximumValue={10}
        onValueChange={(value: any) => console.log(value)}
      />
      <Text>Random:</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnablede ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={console.log}
        value={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
