import { theme } from '../../constants/Colors';
import { omit, pipe, tap, pick } from 'ramda';
import React, { useState } from 'react';
import { TextInput, StyleSheet, Platform, Text, View, Pressable, StyleProp, TextInputComponent, TextInputProps } from 'react-native';
import Hoverable from './Hoverable';
import SvgEdit from '../icons/SvgEdit';

export const TextInputHover = ({ text, onChange, setToggle, edit, height, width, fontSize }: any) => 
  // const [toggle, setToggle] = useState(false);
  (
    <View>
      {' '}
      {edit ? (
        <Input
          style={{
            padding: 5,
            borderRadius: 10,
            borderColor: theme.colors.dart,
            backgroundColor: '#fff',
            minWidth: 200,
          }}
          onKeyPress={(e: any) => e.nativeEvent.key === 'Enter' ? setToggle(false) : null}
          value={text}
          onChange={onChange}
          autoFocus
          InputRightElement={
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
;
interface IInput {
  style: any
  onChangeText: ()=>void
  placeholder: string
  value: string
}

export const Input = (props: TextInputProps) => (
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
      {...omit(
        ['InputRightElement', 'style'],
        props
      )}
    />
    {props.InputRightElement}
  </View>
);

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
