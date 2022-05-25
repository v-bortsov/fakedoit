import { curry, reduce, assoc, keys, omit } from 'ramda';
import React from 'react';
import { Animated, PanResponder, PanResponderGestureState, View } from 'react-native';
import Svg, { Circle, G, Path, Text } from 'react-native-svg';

export type CircularSliderProps = {
  /** Radius of Circular Slider */
  trackRadius?: number;
  /** Size of Thumb*/
  thumbRadius?: number;
  /** Size of Track */
  trackWidth?: number;
  /** Value between minValue to maxValue */
  value?: number;
  /** Minimum value */
  minValue?: number;
  /** Maximum value */
  maxValue?: number;
  /** onChange Handler */
  onChange?: (angle: number) => any;
  /** Color for Track  */
  trackColor?: string;
  /** Color for Track Tint  */
  trackTintColor?: string;
  /** Color for Thumb  */
  thumbColor?: string;
  /** Color for Text on Thumb  */
  thumbTextColor?: string;
  /** Font size for Text on Thumb  */
  thumbTextSize?: number;
  /** Show text on center of thumb  */
  showThumbText?: boolean;
  /** Show Thumb on Track  */
  noThumb?: boolean;
  /** Show text on center of circle  */
  showText?: boolean;
  /** Text color for center of circle  */
  textColor?: string;
  /** Text Size for center of circle  */
  textSize?: number;
  /** Maximum arc angle in degrees i.e. its range is 0 to 359  */
  maxAngle?: number;
  /** Minimum arc angle in degrees i.e. its range is 0 to 359  */
  minAngle?: number;
};

const CircularSlider: React.FC<CircularSliderProps> = ({
  /** prop1 description */
  thumbRadius = 12,
  trackRadius = 100,
  trackWidth = 5,
  trackTintColor = '#e1e8ee',
  trackColor = '#2089dc',
  value = 0,
  minValue = 0,
  maxValue = 100,
  minAngle = 0,
  maxAngle = 359.9,
  onChange,
  thumbTextColor = 'white',
  thumbTextSize = 10,
  noThumb = false,
  showText = true,
  showThumbText = false,
  thumbColor = 'red',
  textColor = '#2089dc',
  textSize = 80,
}) => {
  const location = React.useRef({ x: 0, y: 0 });
  const viewRef = React.useRef<View>(null);
  const valuePercentage = ((value - minValue) * 100) / maxValue;

  const  { current: panResponder } = React.useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => location.current.x && location.current.y,
    onPanResponderMove: (
      _e, { moveX, moveY }: PanResponderGestureState
    ) => {
      let angle = cartesianToPolar(
        moveX - location.current.x + trackRadius + thumbRadius,
        moveY - location.current.y + trackRadius + thumbRadius
      );
      if (angle <= minAngle) {
        onChange?.(minAngle / 3.6);
      } else if (angle >= maxAngle) {
        onChange?.(maxAngle / 3.6);
      } else {
        onChange?.(angle / 3.6);
      }
    },
  }));

  const renameKeys = curry((
    keysMap, obj
  ) => reduce(
    (
      acc, key
    ) => assoc(
      keysMap[key] || key,
      obj[key],
      acc
    ),
    {},
    keys(obj)
  ));

  const methodsOverride = renameKeys(
    {onResponderMove: 'onPanResponderMove'},
    panResponder.panHandlers
  )
  // console.log(panResponder);
  
  const polarToCartesian = React.useCallback(
    (angleToChange: number) => {
      let r = trackRadius;
      let hC = trackRadius + thumbRadius;
      let a = ((angleToChange - 90) * Math.PI) / 180.0;

      let x = hC + r * Math.cos(a);
      let y = hC + r * Math.sin(a);
      return { x, y };
    },
    [
      trackRadius,
      thumbRadius
    ]
  );

  const cartesianToPolar = React.useCallback(
    (
      x, y
    ) => {
      let hC = trackRadius + thumbRadius;

      if (x === 0) {
        return y > hC ? 0 : 180;
      } else if (y === 0) {
        return x > hC ? 90 : 270;
      } else {
        return (
          Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
          (x > hC ? 90 : 270)
        );
      }
    },
    [
      trackRadius,
      thumbRadius
    ]
  );

  const width = (trackRadius + thumbRadius) * 2;
  const startCoord = polarToCartesian(0);
  const endCoord = polarToCartesian(valuePercentage * 3.6);
  const endTintCoord = polarToCartesian(maxAngle);


  const wrap = (Cmp: any) => class Wrapped extends React.Component {
    render() {
      return (
        <Cmp
          {...omit(
            [
              'onResponderMove',
              'onMoveShouldSetResponder',
              'onStartShouldSetResponder',
              'onStartShouldSetResponderCapture',
              'onStartShouldSetResponderCapture',
              'onMoveShouldSetResponderCapture',
              'onResponderRelease',
              'onResponderGrant',
              'onResponderReject',
              'onResponderStart',
              'onResponderMove',
              'onResponderEnd',
              'onResponderTerminate',
              'onResponderTerminationRequest'
            ],
            this.props
          )}
        />
      )
    }
  }
  const AnimatedG = Animated.createAnimatedComponent(wrap(G));
  console.log(AnimatedG);
  
  return (
    <View
      style={{ width, height: width }}
      ref={viewRef}
      onLayout={() => {
        viewRef.current?.measure((
          x, y, w, h, px, py
        ) => {
          location.current = {
            x: px + w / 2,
            y: py + h / 2,
          };
        });
      }}
    >
      <Svg width={width} height={width} ref={viewRef}>
        <Path
          stroke={trackTintColor}
          strokeWidth={trackWidth}
          d={[
            'M',
            startCoord.x,
            startCoord.y,
            'A',
            trackRadius,
            trackRadius,
            0,
            maxAngle <= 180 ? '0' : '1',
            1,
            endTintCoord.x,
            endTintCoord.y,
          ].join(' ')}
        />
        <Path
          stroke={trackColor}
          strokeWidth={trackWidth}
          fill="none"
          d={`M${startCoord.x} ${
            startCoord.y
          } A ${trackRadius} ${trackRadius} 0 ${
            valuePercentage * 3.6 > 180 ? 1 : 0
          } 1 ${endCoord.x} ${endCoord.y}`}
        />
        {showText && (
          <Text
            x={trackRadius + thumbRadius}
            y={trackRadius + 40}
            fontSize={textSize}
            fill={textColor}
            textAnchor="middle"
          >
            {Math.ceil(value)
              .toString()}
          </Text>
        )}

        {!noThumb && (
          <AnimatedG x={endCoord.x - thumbRadius} y={endCoord.y - thumbRadius} {...panResponder.panHandlers}>
            <Circle
              r={thumbRadius}
              cx={thumbRadius}
              cy={thumbRadius}
              fill={thumbColor}
            />
            
            {showThumbText && (
              <Text
                x={thumbRadius}
                y={thumbRadius + thumbTextSize / 2}
                fontSize={10}
                fill={thumbTextColor}
                textAnchor="middle"
              >
                {Math.ceil(value)
                  .toString()
                  .padStart(
                    2,
                    '0'
                  )}
              </Text>
            )}
          </AnimatedG>
        )}
      </Svg>
    </View>
  );
};
CircularSlider.defaultProps = {};

export default CircularSlider;