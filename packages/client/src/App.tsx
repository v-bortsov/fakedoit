import { assoc, converge, pipe, prop } from 'ramda';
import React, { useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { makeInstance } from './business';
import ActionSheet from './components/actionsheet/ActionSheet';
import { ConfigContext, configInitialState } from './context';
import { loggerAfter, loggerBefore, useReducerWithMiddleware } from './hooks/useReducerWithMiddleware';
import Home from './screens/Home';
import { home } from './store';
import { getReactComponentFromCollect } from './utils';
const { height } = Dimensions.get('window');

// const AnimatedView = Animated.createAnimatedComponent(View);
const App: React.FC<any> = (props: any) => {
  const actionSheetRef = useRef(null);

  // const [state, dispatch] = converge(
  //   curry(useReducer),
  //   [always(evolveInitialState), clone, always(clone)]
  // )(configInitialState)
  // @ts-ignore
  const [state, dispatch]: [GeneratorState, Dispatch] = useReducerWithMiddleware(
    home,
    configInitialState,
    [loggerBefore],
    [loggerAfter]
  )

  console.log(state)
  return (
    <SafeAreaView style={styles.safeareview}>
      <ConfigContext.Provider value={{state, dispatch}}>
        <Home actionSheetRef={actionSheetRef} dispatch={dispatch} state={state} />
        <ActionSheet
          // initialOffsetFromBottom={100}
          // extraScroll={100}
          // headerAlwaysVisible={true}
          // bottomOffset={100}
          // delayActionSheetDraw={0}
          ref={actionSheetRef}
          statusBarTranslucent
          bounceOnOpen={true}
          drawUnderStatusBar={false}
          bounciness={4}
          gestureEnabled={true}
          defaultOverlayOpacity={0.3}
        >
          <ScrollView
            // nestedScrollEnabled
            onMomentumScrollEnd={() => {
              actionSheetRef.current?.handleChildScrollEnd();
            }}
            style={styles.scrollview}
          >
            <ConfigContext.Consumer>
              {({state, dispatch}: any) => pipe<any, any>(converge(
                makeInstance,
                [
                  getReactComponentFromCollect(['component']),
                  pipe(
                    prop('data'),
                    assoc(
                      'state',
                      state
                    ),
                    assoc(
                      'dispatch',
                      dispatch
                    )
                  )
                ]
              ))(state.actionSheet)}
              {/* <View style={styles.container}>
              {colors.map((color) => (
                <TouchableOpacity
                  onPress={() => {
                    actionSheetRef.current?.hide();
                  }}
                  key={color}
                  style={[styles.circle, {backgroundColor: color}]}
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
                      style={[styles.placeholder, {width: item,},]}
                    />
                    <View style={styles.btnLeft} />
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.footer} />
            </ScrollView> */}

            </ConfigContext.Consumer>
          </ScrollView>
        </ActionSheet>
      </ConfigContext.Provider>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  footer: {
    height: 100
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeholder: {
    height: 15,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
    borderRadius: 5
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 100
  },
  btnLeft: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 100
  },
  input: {
    width: '100%',
    minHeight: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 15,
    paddingHorizontal: 10
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  scrollview: {
    width: '100%',
    padding: 12
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
    shadowOffset: {width: 0.3 * 4, height: 0.5 * 4},
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * 4
  },
  safeareview: {
    // justifyContent: 'center',
    // flex: 1,
    // backgroundColor: '#eee',
    height
  }
});


export default hot(App);