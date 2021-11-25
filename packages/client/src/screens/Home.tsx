import { curry, pipe } from 'ramda';
import React, { MutableRefObject } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ColumnType, headType } from '../types/enums';
import { GeneratorState } from '../types/react-app-env';
import Collapse from '../components/Effects/Collapse';
import { ExampleManual } from '../components/forms/Manual';
import SvgArrowDown from '../components/icons/SvgArrowDown';
import SvgKey from '../components/icons/SvgKey';
import SvgOption from '../components/icons/SvgOption';
import SvgPlus from '../components/icons/SvgPlus';
import { Slider } from '../components/Primitives/Slider';
import { TextInputHover } from '../components/Primitives/TextInput';
import { addMenuToActionSheet, startGen, updColumnEdit, updColumnValue } from '../constants/Actions';
import { theme } from '../constants/Colors';

const HeaderBody = curry(({ items: [
  type,
  name,
  label
], dispatch, idx }: any) => ({ animation, open, setOpen }: any) => (
  <Pressable
    onPress={()=>setOpen(!open)}
    style={[
      {
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row'
      },
      styles.accordionItem
    ]}>
    <View style={styles.leftSummary}>
      <Text>{type.name}</Text>
    </View>
    <View style={styles.titleSummary}>
      {[
        [
          headType.NAME,
          name.value,
          name.edit,
          30,
          24,
          30
        ],
        [
          headType.LABEL,
          label.value,
          label.edit,
          18,
          20,
          20
        ]
      ].map((
        [
          prop,
          text,
          toggle,
          height,
          fontSize,
          width
        ], key
      )=> <TextInputHover
        key={key}
        text={text}
        height={height}
        fontSize={fontSize}
        isStaticIcon={false}
        edit={toggle}
        width={width}
        setToggle={()=>updColumnEdit({dispatch, idx, prop, value: toggle })}
        onChange={(value: React.FormEvent<HTMLInputElement>) => updColumnValue({dispatch, idx, prop, value: value.currentTarget.value})}
      />)}
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
              inputRange: [
                0,
                1
              ],
              outputRange: [
                '0deg',
                '180deg'
              ],
              extrapolate: 'clamp',
            })
          }
        ]
      }}
    >
      <SvgArrowDown/>
    </Animated.View>
  </Pressable>
));

const HeaderFooter = curry(({ dispatch, actionSheetRef, idx }: any) => ({ animation, open, setOpen }: any) => (
  <View
    style={{
      backgroundColor: '#ffa500',
      justifyContent: 'space-between',
      flex: 1,
      flexDirection: 'row',
    }}
  >
    <TouchableOpacity
      onPress={pipe(
        () => actionSheetRef.current?.show(),
        ()=> startGen({dispatch})
      )}
      style={[
        styles.FABButton,
        {
          backgroundColor: '#ffa500',
          // verticalAlign: 'center',
          // textAlign: 'center',
        },
      ]}
    >
      <Text style={{ fontSize: 36 }}>GO!</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={pipe(
        () => actionSheetRef.current?.show(),
        ()=> addMenuToActionSheet({dispatch})
      )}
      style={[
        styles.FABButton,
        { backgroundColor: '#ffa500' }
      ]}
    >
      <SvgPlus />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => setOpen(!open)}
      style={[
        styles.FABButton,
        { backgroundColor: '#ffa500' }
      ]}
    >
      <Animated.View
        key={`header_${idx}`}
        style={{
          transform: [
            {
              rotate: animation.interpolate({
                inputRange: [
                  0,
                  1
                ],
                outputRange: [
                  '0deg',
                  '180deg'
                ],
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

export interface IHomePropsScreen {
  actionSheetRef: MutableRefObject<null>
  dispatch: Dispatch
  state: GeneratorState
}

export default ({ actionSheetRef, dispatch, state }: IHomePropsScreen) => (
  <>
    <ScrollView>
      {state.columns && state.columns.map((
        item: CollapseForm<FormTypes>, idx: number
      )=>(
        <Collapse
          key={idx}
          idx={idx}
          duration={200}
          Header={HeaderBody({ key: `header_${idx}`, idx, dispatch, items: item.head })}
        >
          {(() => {
            switch(item.head[headType.TYPE].component.value){
            case ColumnType.CUSTOM:
              return <ExampleManual idx={idx} collect={item.body.collect.value} addItem={item.body.addItem} dispatch={dispatch} />
            default:
              return <ExampleManual idx={idx}  collect={item.body.collect.value} addItem={item.body.addItem} dispatch={dispatch} />
            }
          })()}
        </Collapse>
      ))}
    </ScrollView>
    <Collapse
      style={styles.collapseFooter}
      idx={12341}
      duration={200}
      Header={HeaderFooter({ actionSheetRef, dispatch })}
    >
      <Slider />
    </Collapse>
  </>
)

const childMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 5,
  marginLeft: 5,
};

const styles = StyleSheet.create({
  collapseFooter: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
    alignItems: 'flex-end',
  },
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