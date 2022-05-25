import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export function useAnimateCollapse(
  duration: number, open: boolean
){

  const ref = useRef(new Animated.Value(0)).current;

  useEffect(
    () =>{
      Animated.timing(
        ref,
        {
          duration,
          easing: Easing.bounce,
          toValue: !open ? 0 : 1,
          useNativeDriver: false,
        }
      )
        .start();
    },
    [open]
  );

  const maxHeight = ref.interpolate({
    inputRange: [
      0,
      1
    ],
    outputRange: [
      0,
      300
    ],
    extrapolate: 'clamp',
  })

  return {maxHeight, ref}
} 