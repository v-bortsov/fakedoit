import { assoc, assocPath, clone, converge, ifElse, pair, path, pathEq, pipe, prop, tap } from 'ramda';
import React, { useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import { makeInstance } from './business';
import ActionSheet from './components/actionsheet/ActionSheet';
import { ConfigContext, configInitialState } from './context';
import Home from './screens/Home';
import { home } from './store';
import { loggerAfter, loggerBefore, useReducerWithMiddleware } from './store/store';
import { evolveInitialState, getReactComponentFromCollect } from './utils';
const { height } = Dimensions.get('window');
const colors = [
  '#4a4e4d',
  '#0e9aa7',
  '#3da4ab',
  '#f6cd61',
  '#fe8a71'
];

// const AnimatedView = Animated.createAnimatedComponent(View);
export const reduceConfig = pipe(
  pair,
  ifElse(
    pathEq(
      [
        1,
        'type'
      ],
      'actionSheet'
    ),
    converge(
      assocPath([
        0,
        'actionSheet'
      ]),
      [
        path([
          1,
          'value'
        ]),
        clone
      ]
    ),
    clone
  ),
  tap(x => console.log(
    'configState',
    x
  )),
  prop<any>(0)
)
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
            style={{paddingHorizontal: 12}}
          >
            <ConfigContext.Consumer>
              {({state, dispatch}: any) => pipe(converge(
                makeInstance,
                [
                  getReactComponentFromCollect,
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
          </View>
        </ActionSheet>
      </ConfigContext.Provider>
    </SafeAreaView>
  );
};

export default hot(App);
const items = [
  100,
  60,
  150,
  200,
  170,
  80,
  41,
  101,
  61,
  151,
  202,
  172,
  82,
  43,
  103,
  64,
  155,
  205,
  176,
  86,
  46,
  106,
  66,
  152,
  203,
  173,
  81,
  42,
];

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
    // justifyContent: "center",
    // flex: 1,
    // backgroundColor: '#eee',
    height
  }
});
