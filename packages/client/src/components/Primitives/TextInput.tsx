import { omit, pick, props } from 'ramda';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, Easing, NativeSyntheticEvent, Platform, Pressable, StyleSheet, Text, TextInput, TextInputChangeEventData, View } from 'react-native';
import { theme } from '../../constants/Colors';
import Hoverable from './Hoverable';

interface HoverProps {
  fontSize: number
  icon: JSX.Element
  text: string|number
  padding: any
  onPress: ()=>void
}

export const Hover = ({fontSize, icon, text, onPress, padding}: HoverProps)=> (
  <Hoverable>
    {(isHovered: boolean) => (
      <Pressable
        onPress={onPress}
        style={[
          styles.editField,
          padding,
          isHovered && {
            // borderRadius: 10,
            borderColor: theme.colors.dart,
            backgroundColor: 'grey'
          },
        ]}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.topField,
            {fontSize}
          ]}
        >
          {text}
        </Text>
        {isHovered /* && !isStaticIcon  */&& (
          icon
        )}
      </Pressable>
    )}
  </Hoverable>
)

export interface InputHoverProps {
  input: React.FC<InputProps>
  hover: JSX.Element
  edit: boolean
}

export const TextInputHover: React.FC<InputHoverProps> = ({edit, input, hover})=>{

  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(
    () => {
      Animated.timing(
        fadeAnim,
        {
          useNativeDriver: false,
          easing: Easing.bounce,
          toValue: 1,
          duration: 500,
        }
      )
        .start();
    },
    [fadeAnim]
  )

  return (<Animated.View                 // Special animatable View
    style={{
      opacity: fadeAnim,         // Bind opacity to animated value
    }}
  >
    {edit ? input : hover}
  </Animated.View>)
}

export interface InputFuncProps {
  onChangeText?: (value: string)=>void
  onChange?: (value: string)=>void
  onEndEditing?:  (value: React.FormEvent<HTMLInputElement>)=>void
  onKeyPress?: (value: NativeSyntheticEvent<TextInputChangeEventData>)=>void|null
}

export interface InputProps extends InputFuncProps {
  style: any
  placeholder?: string
  value?: string
  defaultValue?: string
  rightElement?: JSX.Element
  passRef?: any
  padding?:any
}

export const Input = (props: InputProps) => {

  const ref = props.passRef ? props.passRef : useRef<HTMLInputElement>(null)

  useEffect(
    () => {
      ref?.current?.focus()
    },
    []
  );

  return (<View
    style={[
      styles.containerInput,
      omit(
        [
          'fontSize',
          'padding'
        ],
        props.style
      )
    ]}
  >
    <TextInput
      style={[
        styles.input,
        props.style,
        props.padding
        // pick(
        //   [
        //     'fontSize',
        //     'padding'
        //   ],
        //   props.style
        // )
      ]}
      ref={ref}
      {
        ...omit(
          [
            'rightElement',
            'style',
            'passRef'
          ],
          props
        )
      }/>
    {props.rightElement && props.rightElement}
  </View>)
};

export interface InputWithButtonFuncProps extends InputProps {
  onPress: ()=>void
}

export interface InputWithButtonProps extends InputWithButtonFuncProps {
  title: string
  icon?: string
  color?: string
}

export const InputWithButton: React.FC<InputWithButtonProps> = (props: InputWithButtonProps)=> (
  <Input
    {...omit(
      [
        'title',
        'onPress',
        'color'
      ],
      props
    )}
    rightElement={(
      <Button
        {...pick([
          'title',
          'onPress',
          'color'
        ]), props}
        accessibilityLabel="Learn more about this purple button"/>
    )}/>
)

const styles = StyleSheet.create({
  containerInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    ...Platform.select({
      web: {
        backgroundColor: '#fff',
        outlineStyle: 'none',
        outlineWidth: 0,
      },
    }),
    padding: 0,
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
    // padding: 5,
    minWidth: 200,
  },
  topField: { /* paddingLeft: 5, paddingRight: 5, paddinTop: 0, paddingBottom: 0 padding: 0*/ },
});
