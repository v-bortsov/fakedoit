import * as React from 'react';
import {
  Animated,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// import TouchableWithoutFeedback from "react-native-web/dist/exports/TouchableWithoutFeedback";
// import View from "react-native-web/dist/exports/View";
// import Text from "react-native-web/dist/exports/Text";
// import Dimensions from "react-native-web/dist/exports/Dimensions";
// import Animated from "react-native-web/dist/exports/Animated";
import { hot } from "react-hot-loader/root";
const { height } = Dimensions.get('window');

const AnimatedView = Animated.createAnimatedComponent(View);

const App: React.FC<any> = (props: any) => {
  const {} = props;
  const opacity: Animated.Value = new Animated.Value(1);

  const animate = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0.4,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View style={{ height: height }}>
      <TouchableWithoutFeedback onPress={animate}>
        <AnimatedView
          style={{
            height,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: opacity,
          }}
        >
          <Text>Hello, ttt World!!</Text>
        </AnimatedView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default hot(App);
