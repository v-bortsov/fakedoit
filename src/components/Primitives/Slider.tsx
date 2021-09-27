import React, { useRef } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text } from 'react-native';

const Slider = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: 0,
        y: 0,
      });
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
  })).current;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Total:</Text>
      <Animated.View
        style={{
          position: 'absolute',
          transform: [{ translateX: pan.x }, { translateY: 0 }],
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.box} />
      </Animated.View>
      <Animated.View
        style={{
          height: 10,
          width: 400,
          backgroundColor: 'grey',
        }}
      >
        <Animated.View
          style={{
            backgroundColor: 'red',
            width: pan.x,
            height: 10,
          }}
        >
          {pan.x._value}
        </Animated.View>
      </Animated.View>
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
    height: 50,
    width: 50,
    backgroundColor: 'blue',
    borderRadius: 5,
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

export default Slider;
