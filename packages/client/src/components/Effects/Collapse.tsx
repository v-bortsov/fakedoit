import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet } from 'react-native';
import { Text, View } from '../Themed';
interface Collapse {
  idx: number;
  duration: number;
  Header: JSX.Element;
  children: JSX.Element;
  icon?: JSX.Element;
  borderStyle?: any;
  backgroundColor?: any;
  buttonProps?: any;
  Button?: any;
  style?: any;
}
export const collapseView = (
  duration: number,
  animationHeight: any,
  toValue: number   
) => {
  Animated.timing(
    animationHeight,
    {
      duration,
      easing: Easing.back(1),
      toValue,
      useNativeDriver: false,
    }
  )
    .start();
};
const Collapse = ({
  idx,
  duration,
  Header,
  children,
  icon,
  style,
  borderStyle,
  backgroundColor,
  Button,
  buttonProps,
}: Collapse) => {
  const [open, setOpen] = useState(false);
  const animationHeight = useRef(new Animated.Value(0)).current;
  useEffect(
    () => collapseView(
      duration,
      animationHeight,
      !open ? 0 : 1
    ),
    [open]
  );
  return (
    <View key={idx}>
      <Header animation={animationHeight} setOpen={setOpen} open={open} />
      <Animated.View
        key={`desc_${idx}`}
        style={{
          maxHeight: animationHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 300],
            extrapolate: 'clamp',
          }),
          overflow: 'hidden',
        }}
      >
        {children}
      </Animated.View>
    </View>
  );
};
const parentMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: -5,
};
const childMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 5,
  marginLeft: 5,
};
const styles = StyleSheet.create({
  summary: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    flexDirection: 'row',
    ...parentMargin,
  },
  turnoverSummary: { flex: 1, alignItems: 'flex-end', ...childMargin },
});
export default Collapse;
