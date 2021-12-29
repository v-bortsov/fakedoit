import { inc } from 'ramda'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Animated } from 'react-native'

function AnimateCounter({totalCombination}: any) {

  const [total, setTotal] = useState(totalCombination)
  const counter = useRef()

  useEffect(
    () => {
      console.log('useEffects');
      
      counter.current = total;
    },
    []
  );
  const prevCount = counter.current
  
  return (
    <Text>{total}</Text>
  )
}

export default AnimateCounter
