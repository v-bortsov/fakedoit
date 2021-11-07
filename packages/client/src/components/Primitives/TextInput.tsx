import { theme } from '../../constants/Colors';
import { omit, pipe, tap, pick } from 'ramda';
import React, { useRef, useState } from 'react';
import { TextInput, StyleSheet, Platform, Text, View, Pressable, StyleProp, TextInputComponent, TextInputProps, Button } from 'react-native';
import Hoverable from './Hoverable';
import SvgEdit from '../icons/SvgEdit';


export interface TextInputHoverFuncProps {
  onChange: (value: React.FormEvent<HTMLInputElement>)=>void
  setToggle: ()=>void
}

export interface TextInputHoverProps extends TextInputHoverFuncProps {
  text: string
  edit: boolean
  height: number
  width: number
  fontSize: number
}
export const TextInputHover: React.FC<TextInputHoverProps> = ({ text, onChange, setToggle, edit, height, width, fontSize }) => 
  // const [toggle, setToggle] = useState(false);
  (
    <View>
      {' '}
      {edit ? (
        <Input
          style={styles.inputHover}
          onKeyPress={(e: any) => e.nativeEvent.key === 'Enter' ? setToggle(false) : null}
          value={text}
          onChange={onChange}
          autoFocus
          rightElement={
            <SvgEdit />
          }
        />
      ) : (
        <Hoverable>
          {(isHovered: boolean) => (
            <View
              style={[
                styles.editField, isHovered && {
                  borderRadius: 10,
                  borderColor: theme.colors.dart,
                  backgroundColor: 'grey',
                },
              ]}
            >
              <Text numberOfLines={1} style={[styles.topField, {fontSize}]}>
                {text}
              </Text>
              {isHovered && (
              // <MaterialCommunityIcons
              //   onPress={() => setToggle(!toggle)}
              //   size={fontSize}
              //   name={"file-edit"}
              // />
                <Pressable onPress={() => setToggle(!edit)}>
                  <SvgEdit height={height} width={width}  />
                </Pressable>
              )}
            </View>
          )}
        </Hoverable>
      )}
    </View>
  )

export interface InputFuncProps {
  onChangeText?: ()=>void
  onEndEditing?: ()=>void
}
export interface InputProps extends InputFuncProps {
  style: any
  placeholder?: string
  value?: string
  ref?: any
  rightElement?: JSX.Element
}

type RemoveKindField<Type> = {
  [Property in keyof Type]:  Extract<InputProps, Function>
};

export const Input = (props: InputProps) => (
  <View
    style={[
      styles.containerInput, omit(
        ['fontSize', 'padding'],
        props.style
      )
    ]}
  >
    <TextInput
      style={[
        styles.input, pick(
          ['fontSize', 'padding'],
          props.style
        )
      ]}
      {...props.ref 
        ? {ref: props.ref}
        : omit(
            ['InputRightElement', 'style', 'ref'],
            props
          )
      }
    />
    {props.rightElement && props.rightElement}
  </View>
);
export interface InputWithButtonFuncProps extends InputProps {
  onPress: ()=>void
}
export interface InputWithButtonProps extends InputWithButtonFuncProps {
  title: string
  icon?: string
  color?: string
}
// useRef
// useState
export const InputWithButton: React.FC<InputWithButtonProps> = (props: InputWithButtonProps)=> (
  <Input 
    {...omit(
      ['title', 'onPress', 'color'],
      props
    )}
    rightElement={
      <Button
        {...pick(['title', 'onPress', 'color']), props}
        accessibilityLabel="Learn more about this purple button"
      />
    }
  />
)

const styles = StyleSheet.create({
  containerInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    ...Platform.select({
      web: {
        outlineStyle: 'none',
        outlineWidth: 0,
      },
    }),
    padding: 0
  },
  inputHover: {
    padding: 5,
    borderRadius: 10,
    borderColor: theme.colors.dart,
    backgroundColor: '#fff',
    minWidth: 200,
  },
  editField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 200,
  },
  topField: { padding: 5 },
});
