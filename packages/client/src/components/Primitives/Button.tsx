import React from 'react';
import { Text, View, StyleSheet, Pressable, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  onPress: (value: any)=>any,
  title: string,
  buttonStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export function Button(props: ButtonProps) {
  const { onPress, title = 'Save' } = props;
  return (
    <Pressable
      style={[
        styles.button,
        props.buttonStyle
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.text,
          props.textStyle
        ]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: 'white',
  },
});