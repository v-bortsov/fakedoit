import React, { memo, MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { curry, filter, is, path, pipe, tap } from 'ramda';
import AnimateCounter from '../components/Effects/AnimateCounter';
import Collapse from '../components/Effects/Collapse';
import DateForm from '../components/forms/Date';
import DictionaryForm from '../components/forms/Dictionary';
import FilterForm from '../components/forms/Filter';
import Manual from '../components/forms/Manual';
import NumberForm from '../components/forms/Number';
import SvgArrowDown from '../components/icons/SvgArrowDown';
import SvgEdit from '../components/icons/SvgEdit';
import SvgKey from '../components/icons/SvgKey';
import SvgOption from '../components/icons/SvgOption';
import SvgPlus from '../components/icons/SvgPlus';
import { Button } from '../components/Primitives/Button';
import { Hover, Input, TextInputHover } from '../components/Primitives/TextInput';
import { addColumn, addMenuToActionSheet, startGen, updColumnValue } from '../constants/Actions';
import { theme } from '../constants/Colors';
import { daysOfWeek, MenuActionAddColumn } from '../constants/Fields';
import useDebounce from '../hooks/useDebounce';
import { ColumnType, headType } from '../types/enums';
import { GeneratorState } from '../types/react-app-env';
import { calcCount } from '../utils';
import Hoverable from '../components/Primitives/Hoverable';


function DoubleInput({keyNumber, prop, toggle, width, height, fontSize, text, dispatch, collapseIdx}: any) {

  const [edit, setEdit] = useState(toggle)
  const [valueText, setValue] = useState(text)

  const padding = {paddingLeft: 6,  paddingRight: 6,  marginTop: 5, marginBottom: 5}
  const ref = useRef<HTMLInputElement>(null)
  
  const onQueryChange = useDebounce(setValue)
  const saveStore = pipe(
    tap(()=> setEdit(false)),
    () => updColumnValue({dispatch, path: [
      collapseIdx,
      'head',
      prop,
      'value'
    ], value: valueText})
  )

  useEffect(
    () => setEdit(toggle),
    [toggle]
  )
    
  return (
    <TextInputHover
      key={keyNumber}
      keyNumber={keyNumber}
      input={(
        <Input
          style={{ fontSize, height, width: (200-width) }}
          padding={ padding }
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
          keyNumber={`hover_${keyNumber}`}
          text={text}
          onPress={pipe(tap(() => setEdit(!edit)))}
          icon={(
            <SvgEdit height={height} width={width} />
          )}
          fontSize={fontSize}
          padding={padding}
        />
      )}
      edit={edit}
    />
  )
}

function HeaderBody({ items: [
  type,
  name,
  label
], dispatch, collapseIdx }: any) {
  return  ({ animation, open, setOpen }: any) => {
    const Double = memo(DoubleInput)
    return (
      <Hoverable>
        {
          (isHovered: boolean ) => (
            <Pressable
              onPress={()=>setOpen(!open)}
              style={[
                {
                  justifyContent: 'space-between',
                  flex: 1,
                  flexDirection: 'row',
                  paddingLeft: 15,
                  paddingRight: 15,
                  backgroundColor: isHovered || open ? 'rgb(99,209,221)' : theme.colors.primary,
                },
                styles.accordionItem
              ]}
            >
              <View style={styles.leftSummary}>
                <Text>{type.component.value}</Text>
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
                ) => (
                  <Double
                    collapseIdx={collapseIdx}
                    keyNumber={keyNumber}
                    prop={prop}
                    text={text}
                    toggle={toggle}
                    height={height}
                    fontSize={fontSize}
                    width={width}
                    dispatch={dispatch}
                  />
                ))}
              </View>
              <View style={styles.keyIconSummary}>
                <SvgKey />
                {/* <MaterialCommunityIcons color={name===editColumn ? '#e8e32e' : ''} onPress={ () => dispatch(setLimit(name)) } style={{margin: 0}} size={36} name="key-variant" /> */}
              </View>
              <Animated.View
                key={`desc_${collapseIdx}`}
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
                <SvgArrowDown />
              </Animated.View>
            </Pressable>
          )}
      </Hoverable>
    )
  }
}

const HeaderFooter = curry(({  idx, getStart, addColumn, totalCombination }: any) => ({animation, setOpen, open}: any) => (
  <View
    style={{
      backgroundColor: '#ffa500',
      justifyContent: 'space-between',
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 15,
      paddingRight: 15,
    }}
  >
    <TouchableOpacity
      onPress={getStart}
      style={[
        styles.FABButton,
        {
          backgroundColor: '#ffa500',
          // verticalAlign: 'center',
          // textAlign: 'center',
        },
      ]}
    >
      <Text style={{ fontSize: 36 }}>GO (
        {/* <AnimateNumber
          value={totalCombination}
          interval={5} // in miliseconds
          formatter={(number: any) => parseInt(number)}
          timing={'easeIn'}
        /> */}
        <AnimateCounter totalCombination={totalCombination} />
      )!</Text>

    </TouchableOpacity>
    <TouchableOpacity
      onPress={addColumn}
      style={[
        styles.FABButton,
        { backgroundColor: '#ffa500' }
      ]}
    >
      <SvgPlus />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={()=>setOpen(!open)}
      style={[
        styles.FABButton,
        { backgroundColor: '#ffa500' }
      ]}
    >
      <Animated.View
        key={`header_${idx}`}
        style={{
          flex: 1,
          // alignItems: 'center',
          justifyContent: 'center',
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
        <SvgOption fill={!open ? 'rgb(0,0,0)' : 'rgb(202, 217, 219)'} />
      </Animated.View>
    </TouchableOpacity>
  </View>
));

export interface IHomePropsScreen {
  actionSheetRef: MutableRefObject<any>
  dispatch: Dispatch
  state: GeneratorState
}

export default ({ actionSheetRef, dispatch, state: {columns, limiting, filter} }: IHomePropsScreen) => {
  const totalCombination = is(
    Number,
    limiting
  ) ? useMemo(
      ()=>columns.length<=1 ? 0 : calcCount(
        columns,
        limiting
      ),
      [
        columns,
        limiting
      ]
    ) : 10

  const getStart = pipe(
    () => actionSheetRef.current?.setModalVisible(),
    ()=> startGen({dispatch}),
    ()=> addMenuToActionSheet({dispatch, value: { component: 'Formatter', data: {}}})
  )

  const addColumn = pipe(
    () => actionSheetRef.current?.setModalVisible(),
    ()=> addMenuToActionSheet({ dispatch, value: { component: 'Menu', data: {items: MenuActionAddColumn} } })
  )
  
  const columnsList = columns.map((column: CollapseForm<FormTypes>)=> path(
    [
      'head',
      headType.LABEL,
      'value'
    ],
    column
  )) as string[]

  filter.byColumn.options = columnsList
  console.log(
    '🚀 ~ file: Home.tsx ~ line 312 ~ columnsList',
    columnsList
  )
  filter.total.max = totalCombination
  filter.dispatch = dispatch

  return (
    <>
      <ScrollView>
        {columns && columns.map((
          item: CollapseForm<FormTypes>, idx: number
        )=>(
          <Collapse
            backgroundColor='rgb(202,217,219)'
            key={idx}
            idx={idx}
            duration={200}
            Header={HeaderBody({ collapseIdx: idx, dispatch, items: item.head })}
          >
            
            <View style={{flex: 1, marginTop: 10, marginRight: 10, paddingLeft: 10, paddingRight: 10, marginLeft: 10}}>
              {(() => {
                switch(item.head[headType.TYPE].component.value){
                case ColumnType.CUSTOM:
                  return <Manual idx={idx} collect={item.body.collect.component.value} dispatch={dispatch} />
                case ColumnType.NUMBER:
                  return <NumberForm idx={idx} options={item.body} dispatch={dispatch} />
                case ColumnType.DATE:
                  return <DateForm idx={idx} daysOfWeek={item.body.days.component.value} limit={item.body.limit.component.value} options={item.body} dispatch={dispatch} />
                case ColumnType.ONTOLOGY:
                  return <DictionaryForm idx={idx} country={item.body.country} dispatch={dispatch} />
                default:
                  return <Manual idx={idx}  collect={item.body.collect.component.value} dispatch={dispatch} />
                }
              })()}
            </View>

          </Collapse>
        ))}
      </ScrollView>
      <Collapse
        backgroundColor='rgb(202, 217, 219)'
        idx={12341}
        duration={200}
        Header={HeaderFooter({ addColumn, getStart, idx: 12341, totalCombination })}
      >
        <FilterForm {...filter} />
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(0,0,0)',
    borderStyle: 'solid'
  }
})