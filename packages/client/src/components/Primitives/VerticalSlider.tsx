import React from 'react';
import {
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';

type StateType = {
  barHeight: number | null,
  deltaValue: number,
  value: number
};

const initialValue = 0;
const min = 0;
const max = 100;
const CIRCLE_DIAMETER = 20;

export default class Slider extends React.Component<{}, StateType> {
  state = {
    barHeight: null,
    deltaValue: 0,
    value: initialValue
  };

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (
      _, gestureState
    ) => this.onMove(gestureState),
    onPanResponderRelease: () => this.onEndMove(),
    onPanResponderTerminate: () => {}
  });

  onMove(gestureState: PanResponderGestureState) {
    const { barHeight } = this.state;
    console.log('it ');
    
    const newDeltaValue = this.getValueFromBottomOffset(
      -gestureState.dy,
      barHeight,
      min,
      max
    );

    this.setState({
      deltaValue: newDeltaValue
    });
  }
  onEndMove() {
    const { value, deltaValue } = this.state;
    this.setState({ value: value + deltaValue, deltaValue: 0 });
  }

  onBarLayout = (event: LayoutChangeEvent) => {
    console.log(event);
    
    const { height: barHeight } = event.nativeEvent.layout;
    this.setState({ barHeight });
  };

  capValueWithinRange = (
    value: number, range: number[]
  ) => {
    if (value < range[0]) return range[0];
    if (value > range[1]) return range[1];
    return value;
  };

  getValueFromBottomOffset = (
    offset: number,
    barHeight: number | null,
    rangeMin: number,
    rangeMax: number
  ) => {
    if (barHeight === null) return 0;
    return ((rangeMax - rangeMin) * offset) / barHeight;
  };

  getBottomOffsetFromValue = (
    value: number,
    rangeMin: number,
    rangeMax: number,
    barHeight: number | null
  ) => {
    if (barHeight === null) return 0;
    const valueOffset = value - rangeMin;
    const totalRange = rangeMax - rangeMin;
    const percentage = valueOffset / totalRange;
    return barHeight * percentage;
  };

  render() {
    const { value, deltaValue, barHeight } = this.state;

    const cappedValue = this.capValueWithinRange(
      value + deltaValue,
      [
        min,
        max
      ]
    );
    const bottomOffset = this.getBottomOffsetFromValue(
      cappedValue,
      min,
      max,
      barHeight
    );

    return (
      <View style={styles.pageContainer}>
        <Animated.Text style={styles.value}>{Math.floor(cappedValue)}</Animated.Text>
        <View style={styles.container}>
          <View style={styles.barContainer}>
            <View style={styles.bar} onLayout={this.onBarLayout}>
              <Animated.View
                style={[
                  styles.nestedBar,
                  {height: bottomOffset}
                ]}>
                <Animated.View
                  style={[
                    styles.circle,
                    {bottom: bottomOffset}
                  ]}
                  {...this.panResponder.panHandlers}
                />
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 20
  },
  container: {
    flexGrow: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row'
  },
  value: {
    color: 'white'
  },
  barContainer: {
    width: CIRCLE_DIAMETER,
    alignItems: 'center',
    paddingVertical: CIRCLE_DIAMETER / 2,
    marginHorizontal: 20
  },
  bar: {
    width: 2,
    height: 100,
    alignItems: 'center',
    backgroundColor: 'white',
    flexGrow: 0
  },
  nestedBar: {
    width: 2,
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: 'red',
    flexGrow: 1
  },
  circle: {
    borderRadius: CIRCLE_DIAMETER / 2,
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    backgroundColor: 'black',
    position: 'absolute'
  }
})
