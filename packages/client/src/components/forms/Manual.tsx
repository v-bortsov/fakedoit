import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { NativeSyntheticEvent, Pressable, TextInputKeyPressEventData, View } from 'react-native'
import { adjust, F, isEmpty, pipe, T, tap } from 'ramda'
import { addColumnCollectItem, delColumnCollectItem, updColumnCollectItem } from '../../constants/Actions'
import { theme } from '../../constants/Colors'
import { useDebounceWithCollect } from '../../hooks/useDebounce'
import SvgCross from '../icons/SvgCross'
import SvgEdit from '../icons/SvgEdit'
import { Button } from '../Primitives/Button'
import { Hover, Input, InputProps, TextInputHover } from '../Primitives/TextInput'

export interface EditableItem {
  input: InputProps
}

export interface IManual {
  InputWithButton: any
  EditableItemList?: React.FC<EditableItem>[] | null | undefined
}

const Manual: React.FC<IManual> = ({InputWithButton, EditableItemList}) => (
  <View style={{flex: 1, gap: 10, marginTop: 10, marginRight: 10, marginLeft: 10}}>
    <View>{InputWithButton}</View>
    <View>{EditableItemList}</View>
  </View>
)

export interface UseStateInterface {
  value: string
  onChange: (value: any)=>void
}

export interface IManualProps {
  collect: string[]
  dispatch: Dispatch
  idx: number
}

const submitAddColumn = (
  ref:  React.RefObject<HTMLInputElement>, dispatch: Dispatch, idx: number, passRefButton: any, e: any = null
): void => {
  if(e?.nativeEvent?.key === 'Enter'){
    addColumnCollectItem({dispatch, idx, value: ref?.current?.value})
    try {
      ref?.current?.clear()
        .focus()
    } catch (error) {
      console.warn('It has a trouble, but how to decide not clear');
    }
  }

  
  if(!e) {
    // console.log(passRefButton)
    passRefButton.current.setNativeProps({disabled:  true})

    addColumnCollectItem({dispatch, idx, value: ref?.current?.value})
    ref?.current?.clear()
    ref?.current?.focus()
  }

}

export const ExampleManual = ({dispatch, collect, idx}: IManualProps) => {
  // const value = pipe<null, any, any[], UseStateInterface>(
  //   useRef,
  //   useState,
  //   zipObj(['value', 'onChange'])
  // )(null)
  const ref = useRef<HTMLInputElement>(null)
  const refButton = useRef<HTMLInputElement>(null)
  // const itemsRef:React.MutableRefObject<any[]> = useRef([]);
  const [edit, setEdit] = useState(collect.map(F))
  const [valueText, setValue] = useState(collect)

  const onQueryChange = useDebounceWithCollect(setValue)
  
  const saveStore =(keyNumber: number)=> pipe(
    tap(()=> setEdit(adjust(
      keyNumber,
      F
    ))),
    () => updColumnCollectItem({dispatch, value: valueText[keyNumber], idx, key: keyNumber})
  )
  
  useEffect(
    () => {
      setEdit(collect.map(F))
      setValue(collect)
    },
    [collect] 
  )

  return (<Manual
    {...{
      InputWithButton: <Input
        style={{
          padding: 5,
          flexGrow: 1,
          height: 50,
          fontSize: 20,
          borderWidth: 1,
          borderColor: theme.colors.dart,
          // backgroundColor: '#fff',
        }}
        onKeyPress={
          (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => submitAddColumn(
            ref,
            dispatch,
            idx,
            refButton,
            e
          )}
        passRef={ref}
        rightElement={(
          <Button
            textStyle={{fontSize: 26}}
            buttonStyle={{ height: 50}}
            passRefButton={refButton}
            // {...pick(['title', 'onPress', 'color']), props}
            title={'ADD'}
            onPress={()=>submitAddColumn(
              ref,
              dispatch,
              idx,
              refButton
            )}/>
        )}/>,
      EditableItemList: collect.map((
        item: any, keyNumber: number
      ) => (
        <View key={keyNumber} style={{flex: 1, flexDirection: 'row', borderColor: 'black', borderWidth: 1,  alignItems: 'center'}}>
          <View style={{flex: 1,  alignItems: 'stretch', paddingLeft: 10, paddingRight: 10}}>
            <TextInputHover
              input={(
                <Input
                  style={{fontSize: 20, height: 40, padding: 10}}
                  defaultValue={valueText[keyNumber]}
                  onKeyPress={(e: any) => e.nativeEvent.key === 'Enter' ? saveStore(keyNumber)(null) : null}
                  onChangeText={(value: any)=>onQueryChange(
                    keyNumber,
                    value
                  )}
                  rightElement={(
                    <Pressable onPress={saveStore(keyNumber)}>
                      <SvgEdit height={20} width={20} />
                    </Pressable>
                  )}/>
              )}
              hover={(
                <Hover
                  text={item}
                  onPress={() => setEdit(adjust(
                    keyNumber,
                    T
                  ))}
                  icon={(
                    <SvgEdit height={20} width={20} />
                  )}
                  fontSize={20}/>
              )}
              edit={edit[keyNumber]}/>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', alignContent: 'stretch', paddingLeft: 10, paddingRight: 10}}>
            <Pressable onPress={() => delColumnCollectItem({dispatch, key: keyNumber, idx})}>
              <SvgCross fill='rgb(153 28 28)' height={20} width={20} />
            </Pressable>
          </View>
        </View>
      ))
    }}/>)
}

export default Manual