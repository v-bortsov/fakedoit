import React, { useReducer } from 'react';
import {
  always,
  assoc,
  clone,
  cond,
  converge,
  curry,
  indexBy,
  keys,
  objOf,
  path,
  pathEq,
  pick,
  pipe,
  prop,
  T,
  values,
  __,
} from 'ramda';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
} from 'react-native';
import Collapse from '../components/Effects/Collapse';
import SvgOption from '../components/icons/SvgOption';
import SvgPlus from '../components/icons/SvgPlus';
import { initialState } from '../context';
import Slider from '../components/Primitives/Slider';
// import Fields from '../components/Complex/AddColumn';
import { Field } from '../../react-app-env';
import { TextInputHover } from '../components/Primitives/TextInput';
import { staggerButtons } from '../constants/Fields';
import SvgArrowDown from '../components/icons/SvgArrowDown';
import SvgKey from '../components/icons/SvgKey';
import { theme } from '../constants/Colors';
import { evolveInitialState, reducerFields } from '../utils';
import { Fields } from '../components/Complex';

const getIconByType = (item: Field) => pipe(
  indexBy<any, any>(prop('type')),
  prop(path(
    ['type', 'value'],
    item
  ))
)(staggerButtons);

const pickFieldsByType = pipe(
  converge(
    pick,
    [
      cond([
        [
          pathEq(
            ['type', 'value'],
            'custom'
          ), always(['collect'])
        ], [
          pathEq(
            ['type', 'value'],
            'dates'
          ), always(['days', 'startDay', 'limit']),
        ], [
          pathEq(
            ['type', 'value'],
            'integer'
          ), always(['from-to', 'length'])
        ], [T, keys],
      ]), clone,
    ]
  ),
  values,
  objOf('fields')
);

const HeaderBody = curry(({ circle, label, name, dispatch, idx }: any) => ({ animation, open, setOpen }: any) => (
  <Pressable
    onPress={()=>setOpen(!open)}
    style={[
      {
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row'
      }, styles.accordionItem
    ]}>
    <View style={styles.leftSummary}>
      <Text>{circle.icon}</Text>
    </View>
    <View style={styles.titleSummary}>
      <TextInputHover
        text={name}
        height={30}
        fontSize={24}
        width={30}
        onChange={(value: React.FormEvent<HTMLInputElement>) => dispatch({ type: 'fields', payload: { name: 'updateFields', path: [idx, 'name', 'value'], value: value.currentTarget.value }})}
      />
      <TextInputHover
        text={label}
        fontSize={18}
        height={20}
        width={20}
        onChange={(value: React.FormEvent<HTMLInputElement>) => dispatch({ type: 'fields', payload: { name: 'updateFields', path: [idx, 'label', 'value'], value: value.currentTarget.value }})}
      />
    </View>
    <View style={styles.keyIconSummary}>
      <SvgKey />
      {/* <MaterialCommunityIcons color={name===editColumn ? '#e8e32e' : ''} onPress={ () => dispatch(setLimit(name)) } style={{margin: 0}} size={36} name="key-variant" /> */}
    </View>
    <Animated.View
      key={`desc_${idx}`}
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        transform: [
          {
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg'],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
    >
      <SvgArrowDown/>
    </Animated.View>
  </Pressable>
));

const HeaderFooter = curry(({ actionSheetRef, idx }: any) => ({ animation, open, setOpen }: any) => (
  <View
    style={{
      backgroundColor: '#ffa500',
      justifyContent: 'space-between',
      flex: 1,
      flexDirection: 'row',
    }}
  >
    <TouchableOpacity
      onPress={() => actionSheetRef.current?.show()}
      style={[
        styles.FABButton, {
          backgroundColor: '#ffa500',
          // verticalAlign: 'center',
          // textAlign: 'center',
        },
      ]}
    >
      <Text style={{ fontSize: 36 }}>GO!</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => actionSheetRef.current?.show()}
      style={[styles.FABButton, { backgroundColor: '#ffa500' }]}
    >
      <SvgPlus />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => setOpen(!open)}
      style={[styles.FABButton, { backgroundColor: '#ffa500' }]}
    >
      <Animated.View
        key={`header_${idx}`}
        style={{
          transform: [
            {
              rotate: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <SvgOption />
      </Animated.View>
    </TouchableOpacity>
  </View>
));


export default ({ actionSheetRef }: any) => {
  const [state, dispatch]  = converge(
    curry(useReducer),
    [
      always(evolveInitialState), clone, always(assoc(
        'fields',
        __,
        {}
      ))
    ]
  )(initialState.columns)
  // const state = initialState;
  // const dispatch = () => ({})
  return (
    <>
      <ScrollView>
        {state.fields.map((
          item: any, idx: number
        )=>(<Collapse
          key={idx}
          idx={idx}
          duration={200}
          Header={HeaderBody({
            ...{
              key: `header_${idx}`,
              idx,
              dispatch,
              circle: getIconByType(item),
              label: path(
                ['label', 'value'],
                item
              ),
              name: path(
                ['name', 'value'],
                item
              ),
            },
          })}
        >
          <Fields key={idx} {...{ state: pickFieldsByType(item), dispatch, idx }} />
        </Collapse>))
        }
        {/* <FlatList
          keyExtractor={(item) => item}
          data={state.fields}
          extraData={state.fields}
          renderItem={({ item, index: idx }) => (
          )}
        /> */}
      </ScrollView>
      <Collapse
        style={{
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          height: 50,
          alignItems: 'flex-end',
        }}
        idx={12341}
        duration={200}
        Header={HeaderFooter({ actionSheetRef })}
      >
        <Slider />
      </Collapse>
    </>
  )
}
const childMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 5,
  marginLeft: 5,
};

const styles = StyleSheet.create({
  btnTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  FABButton: {},
  leftSummary: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'space-between',
    ...childMargin,
  },
  titleSummary: {
    flex: 1,
    flexGrow: 4,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignContent: 'space-around',
    ...childMargin,
  },
  keyIconSummary: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'space-between',
    ...childMargin,
  },
  accordionItem: {
    backgroundColor: theme.colors.primary
  }
})