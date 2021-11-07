import { pipe, tap, zipObj } from 'ramda'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { Input, InputProps, InputWithButton, InputWithButtonProps, TextInputHover, TextInputHoverProps } from '../Primitives/TextInput'

export interface EditableItem {
  input: InputProps
}
export interface IManual {
  InputWithButton: any
  EditableItemList?: React.FC<EditableItem>[] | null | undefined
  addItem?: React.FC<InputWithButtonProps>
  editable?: React.FC<TextInputHoverProps>
  output?: string[]
}

// const Manual: React.FC<IManual> = ({addItem, editable, output}) => (
//     <View>
//       <View>{addItem}</View>
//       <View>{output.map((text: string, idx: number)=> editable({text, /* onChange, setToggle: , */ edit: false, height: 18, fontSize: 20, width: 20}))}</View>
//     </View>
//   )
{/* <View><InputWithButton {...{onPress, value, onChangeText}} /></View> */}
{/* <View>{output.map((text: string, idx: number)=> editable({text, /* onChange, setToggle: ,  edit: false, height: 18, fontSize: 20, width: 20}))}</View> */}
const Manual: React.FC<IManual> = ({InputWithButton}) => (
  <View>
    <View>{InputWithButton}</View>
    {/* <View>{EditableItemList}</View> */}
  </View>
)

export interface UseStateInterface {
  value: string
  onChange: (value: any)=>void
}
export interface IManualProps {

}

export const ExampleManual = ({dispatch, collect}) => {
  // const value = pipe<null, any, any[], UseStateInterface>(
  //   useRef,
  //   useState,
  //   zipObj(['value', 'onChange'])
  // )(null)
  // [
  // {global: {onPress}, local: {onChange, value}},
  // {global: {onSave, onDelete}, local: ref}
  // ]
  const ref = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<any>(null);
  useEffect(() => {
    setValue(ref.current?.value);
  }, []);
  const itemsRef:React.MutableRefObject<any[]> = useRef([]);

  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, collect.length);
 }, [collect]);
 // addStoreMethod: onSave, onDelete, onPress
  return <Manual
    {...{
      InputWithButton: <Input
        style={{}}
        ref={ref}
        rightElement={
          <Button
            // {...pick(['title', 'onPress', 'color']), props}
            title={'Добавить'}
            color={'green'}
            onPress={()=>pipe(tap((ref: any)=> console.log(ref)))(ref)}
            accessibilityLabel="Learn more about this purple button"
          />
        }
      />,
      EditableItemList: collect.map((item: any, idx: number) => <Input style={{}} ref={(el: any) => itemsRef.current[idx] = el} key={idx}/>)
    }} 
  />
}



export default Manual