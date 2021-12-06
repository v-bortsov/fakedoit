import { curry, pipe, tap } from 'ramda';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Collapse from '../components/Effects/Collapse';
import { ExampleManual } from '../components/forms/Manual';
import SvgArrowDown from '../components/icons/SvgArrowDown';
import SvgEdit from '../components/icons/SvgEdit';
import SvgKey from '../components/icons/SvgKey';
import SvgOption from '../components/icons/SvgOption';
import SvgPlus from '../components/icons/SvgPlus';
import { Button } from '../components/Primitives/Button';
import { Slider } from '../components/Primitives/Slider';
import { Hover, Input, TextInputHover } from '../components/Primitives/TextInput';
import { addMenuToActionSheet, startGen, updColumnValue } from '../constants/Actions';
import { theme } from '../constants/Colors';
import { MenuActionAddColumn } from '../constants/Fields';
import useDebounce from '../hooks/useDebounce';
import { ColumnType, headType } from '../types/enums';
import { GeneratorState } from '../types/react-app-env';

const HeaderBody = ({ items: [
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
          32,
          24,
          30
        ],
        [
          headType.LABEL,
          label.value,
          label.edit,
          27,
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
        ], keyNumber: number
      )=> {

        const [edit, setEdit] = useState(toggle)

        useEffect(
          () => {
            setEdit(toggle)
          },
          [toggle]
        )

        const [valueText, setValue] = useState(text)
        const ref = useRef<HTMLInputElement>(null)

        const onQueryChange = useDebounce(setValue)

        const saveStore = pipe(
          tap(()=> setEdit(false)),
          () => updColumnValue({dispatch, idx, prop, value: valueText})
        )
        const padding = {paddingLeft: 6,  paddingRight: 6,  marginTop: 5, marginBottom: 5}
        // console.log(ref)
        return (<TextInputHover
          key={keyNumber}
          input={(
            <Input
              style={{fontSize, height, width: (200-width)}}
              padding={padding}
              defaultValue={valueText}
              onKeyPress={(e: any) => e.nativeEvent.key === 'Enter' ? saveStore(null) : null}
              onChangeText={(value: any)=> onQueryChange(value)}
              ref={ref}
              rightElement={(
                <Button onPress={saveStore} buttonStyle={{width, height, backgroundColor: 'green'}} title={'OK'} />
                // <Pressable onPress={saveStore}>
                //   <SvgEdit height={height} width={width} />
                // </Pressable>
              )}
            />
          )}
          hover={(
            <Hover
              text={text}
              onPress={()=>pipe(tap(() => setEdit(!edit)),
                // tap(()=> ref.current?.focus())
              )(null)}
              icon={(
                <SvgEdit height={height} width={width} />
              )}
              fontSize={fontSize}
              padding={padding}
            />
          )}
          edit={edit} />)
      })}
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
);

const HeaderFooter = ({ dispatch, actionSheetRef, idx, rows, format }: any) => ({ animation, open, setOpen }: any) => (
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
        ()=> startGen({dispatch}),
        ()=> addMenuToActionSheet({dispatch, value: { component: 'Formatter', data: {}}})
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
        ()=> addMenuToActionSheet({ dispatch, value: { component: 'Menu', data: {items: MenuActionAddColumn} } })
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
);

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
          Header={HeaderBody({ idx, dispatch, items: item.head })}
        >
          {(() => {
            switch(item.head[headType.TYPE].component.value){
            case ColumnType.CUSTOM:
              return <ExampleManual idx={idx} collect={item.body.collect.component.value} dispatch={dispatch} />
            default:
              return <ExampleManual idx={idx}  collect={item.body.collect.component.value} dispatch={dispatch} />
            }
          })()}
        </Collapse>
      ))}
    </ScrollView>
    <Collapse
      style={styles.collapseFooter}
      idx={12341}
      duration={200}
      Header={HeaderFooter({idx: 12341, actionSheetRef, dispatch, rows: state.rows, format: state.format })}
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
    height: 70,
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