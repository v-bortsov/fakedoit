import React, { useRef, useState } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text } from 'react-native';

const Slider = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [value, setValue] = useState(pan)

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    // onPanResponderGrant: () => {
    //   pan.setOffset({
    //     x: 0,
    //     y: 0,
    //   });
    // },
    onPanResponderMove: Animated.event([
      null,
      { dx: pan.x, dy: pan.y }
    ]),
    // onPanResponderRelease: (e, gestureState)=>{
    //   value.setValue({x: realPosition < 0 ? 0 : realPosition.x, y: realPosition.y})
    // },
    onPanResponderRelease: (
      e, gestureState
    ) => {
      console.log(pan)

    // pan.flattenOffset();
    // setValue(pan.x)
    // Animated.spring(
    //   pan,
    //   {
    //     toValue: pan.x,
    //     useNativeDriver: false
    //   }
    // )
    //   .start();
    },
  })).current;

  console.log('re-render')

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Total: {value}</Text>

      <View
        style={{
          position: 'relative',
          height: 10,
          width: 400,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: 'red',
            position: 'absolute',
            zIndex: 101,
            width: pan.x,
            height: 10,
          }}
        />
        <Animated.View
          style={[
            styles.box,
            {
              marginBottom: 40,
              transform: [
                { translateX: pan.x },
                { translateY: 0 }
              ]}
          ]}
          {...panResponder.panHandlers}
        />
        <Animated.View
          style={{
            position: 'absolute',
            zIndex: 1,
            height: 10,
            width: 400,
            backgroundColor: 'grey',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 30,
    width: 30,
    backgroundColor: 'red',
    borderRadius: 25,
    zIndex: 100,
    position: 'absolute'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export {Slider}