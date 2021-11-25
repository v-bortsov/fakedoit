import { isEmpty, pipe, tap } from 'ramda'
import React, { useEffect, useRef, useState } from 'react'
import { Button, View } from 'react-native'
import { Input, InputProps, InputWithButtonProps, TextInputHover, TextInputHoverProps } from '../Primitives/TextInput'
import { theme } from '../../constants/Colors';
import { addColumnCollectItem } from '../../constants/Actions';

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

const Manual: React.FC<IManual> = ({InputWithButton, EditableItemList}) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <View style={{flex: 1, flexGrow: 1,  justifyContent: 'space-between'}}>{InputWithButton}</View>
    <View style={{flex: 1, flexGrow: 1}}>{EditableItemList}</View>
  </View>
)

export interface UseStateInterface {
  value: string
  onChange: (value: any)=>void
}

export interface IManualProps {
  collect: string[]
  addItem: any
  dispatch: Dispatch
  idx: number
}
export const ExampleManual = ({dispatch, collect, idx}: IManualProps) => {
  // const value = pipe<null, any, any[], UseStateInterface>(
  //   useRef,
  //   useState,
  //   zipObj(['value', 'onChange'])
  // )(null)
  // [
  // {global: {onPress}, local: {onChange, value}},
  // {global: {onSave, onDelete}, local: ref}
  // ]
  console.log(collect);
  const ref = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<any>('');


  useEffect(
    () => {
      console.log(ref);
      setValue(ref.current?.value);
    },
    []
  );
  // const itemsRef:React.MutableRefObject<any[]> = useRef([]);

  // useEffect(
  //   () => {
  //     itemsRef.current = itemsRef.current.slice(
  //       0,
  //       collect.length
  //     );
  //   },
  //   [collect]
  // );
  console.log(
    value,
    ref
  );
  
  // addStoreMethod: onSave, onDelete, onPress
  return <Manual
    {...{
      InputWithButton: <Input
        style={{
          padding: 5,
          // borderWidth: 1,
          // borderColor: theme.colors.dart,
          // backgroundColor: '#fff',
        }}
        // value={ref.current.value}
        // onChangeText={setValue}
        // onChangeText={(text: string)=> ref.current.value = text}
        passRef={ref}
        rightElement={
          <Button
            // {...pick(['title', 'onPress', 'color']), props}
            title={'Добавить'}
            color={'green'}
            // clearLocal, sendAction, setFocus
            onPress={()=>{
              if(!isEmpty(ref?.current?.value)){
                addColumnCollectItem({dispatch, idx, value: ref.current.value})
                ref.current.clear()
              }
              ref.current.focus()
            }}
            // onPress={()=>pipe(tap((ref: any)=> console.log(ref)))(ref)}
            accessibilityLabel="Learn more about this purple button"
          />
        }
      />,
      EditableItemList: collect.map((
        item: any, idx: number
      ) => <TextInputHover
        height={18}
        isStaticIcon={true}
        width={20}
        text={item}
        fontSize={20}
        // input={<Input style={{}} ref={(el: any) => itemsRef.current[idx] = el} key={idx} rightElement={}/>}
        
      />)
    }} 
  />
}

export default Manual