import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  // TouchableWithoutFeedback,
  View,
} from 'react-native';
import { hot } from "react-hot-loader/root";
import React, { useEffect, useRef, useState, useMemo } from 'react';
import ActionSheet from './components/actionsheet/ActionSheet';
import FAB from './components/fab/FAB';
// import { FloatingAction } from 'react-native-floating-action';
// import { styles } from "./styles";
const { height } = Dimensions.get('window');
const colors = ["#4a4e4d", "#0e9aa7", "#3da4ab", "#f6cd61", "#fe8a71"];

// const AnimatedView = Animated.createAnimatedComponent(View);

const App: React.FC<any> = (props: any) => {
  // const {} = props;
  // const [open, setOpen] = useState(false);
  // const opacity: Animated.Value = new Animated.Value(open ? 1 : 0);
  // useEffect(() => {
  //   // Animated.sequence([
  //   // Animated.timing(opacity, {
  //   //   toValue: 0.4,
  //   //   duration: 250,
  //   //   useNativeDriver: false,
  //   // }),
  //   Animated.timing(opacity, {
  //     toValue: open ? 0 : 1,
  //     duration: 250,
  //     useNativeDriver: false,
  //   }).start();
  // }, [open, opacity]);

  // return (
  //   <View style={{ height: height }}>
  //     <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
  //       <AnimatedView
  //         style={{
  //           height,
  //           flex: 1,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           // opacity: opacity,
  //         }}
  //       >
  //         <Text>Hello, ttt asdf sdfWorld!!</Text>
  //       </AnimatedView>
  //     </TouchableWithoutFeedback>
  //     <Animated.View
  //       style={{
  //         opacity,
  //         marginBottom: opacity.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: [-40, 40],
  //         }),
  //       }}
  //     >
  //       i am panel!
  //     </Animated.View>
  //   </View>
  // );
  const actionSheetRef = useRef(null);
  const list = useMemo(
    () => [
      { key: "1", component: <Text>Item 1</Text> },
      { key: "2", component: <Text>Item 2</Text> },
      { key: "3", component: <Text>Item 3</Text> },
      { key: "4", component: <Text>Item 4</Text> },
    ],
    []
  );
  return (
    <View style={{ height }}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            actionSheetRef.current?.show();
          }}
          style={styles.btn}
        >
          <Text style={styles.btnTitle}>Open ActionSheet</Text>
        </TouchableOpacity>
        <ActionSheet
          initialOffsetFromBottom={1}
          ref={actionSheetRef}
          statusBarTranslucent
          bounceOnOpen={true}
          drawUnderStatusBar={true}
          bounciness={4}
          gestureEnabled={true}
          defaultOverlayOpacity={0.3}
        >
          <View
            style={{
              paddingHorizontal: 12,
            }}
          >
            <View style={styles.container}>
              {colors.map((color) => (
                <TouchableOpacity
                  onPress={() => {
                    actionSheetRef.current?.hide();
                  }}
                  key={color}
                  style={[
                    styles.circle,
                    {
                      backgroundColor: color,
                    },
                  ]}
                />
              ))}
            </View>

            <ScrollView
              nestedScrollEnabled
              onMomentumScrollEnd={() => {
                actionSheetRef.current?.handleChildScrollEnd();
              }}
              style={styles.scrollview}
            >
              <TextInput
                style={styles.input}
                multiline={true}
                placeholder="Write your text here"
              />

              <View>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      actionSheetRef.current?.hide();
                    }}
                    style={styles.listItem}
                  >
                    <View
                      style={[
                        styles.placeholder,
                        {
                          width: item,
                        },
                      ]}
                    />
                    <View style={styles.btnLeft} />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.footer} />
            </ScrollView>
          </View>
        </ActionSheet>
      </SafeAreaView>
      <FAB
        list={list}
        // backgroundColor="#ffffffcc"
        buttonColor="#ffa500"
        icon={
          <Image
            style={{ width: 50, height: 50 }}
            source={require('./css.jpg')}
          />
        }
      />
    </View>
  );
};

export default App;
const items = [
  100, 60, 150, 200, 170, 80, 41, 101, 61, 151, 202, 172, 82, 43, 103, 64, 155,
  205, 176, 86, 46, 106, 66, 152, 203, 173, 81, 42,
];

const styles = StyleSheet.create({
  footer: {
    height: 100,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: {
    height: 15,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
    borderRadius: 5,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  btnLeft: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 100,
  },
  input: {
    width: '100%',
    minHeight: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  scrollview: {
    width: '100%',
    padding: 12,
  },
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fe8a71',
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0.3 * 4, height: 0.5 * 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * 4,
  },
  safeareview: {
    // justifyContent: 'center',
    // flex: 1,
  },
  btnTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
