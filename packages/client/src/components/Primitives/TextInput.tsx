import { omit, pick } from 'ramda';
import React from 'react';
import { Button, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { theme } from '../../constants/Colors';
import SvgEdit from '../icons/SvgEdit';
import Hoverable from './Hoverable';


export interface TextInputHoverFuncProps {
  onChange: (value: React.FormEvent<HTMLInputElement>)=>void
  setToggle: (value: boolean)=>void
}

export interface TextInputHoverProps extends TextInputHoverFuncProps {
  text: string
  edit: boolean
  height: number
  width: number
  fontSize: number
  isStaticIcon: boolean
}

export const TextInputHover: React.FC<TextInputHoverProps> = ({ text, onChange, setToggle, edit, height, width, fontSize, isStaticIcon }) => 
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
                styles.editField,
                isHovered && {
                  borderRadius: 10,
                  borderColor: theme.colors.dart,
                  backgroundColor: 'grey',
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.topField,
                  {fontSize}
                ]}>
                {text}
              </Text>
              {isHovered && !isStaticIcon && (
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
  onChangeText?: (value: string)=>void
  onChange?: (value: string)=>void
  onEndEditing?:  (value: React.FormEvent<HTMLInputElement>)=>void
  onKeyPress?: (value: React.FormEvent<HTMLInputElement>)=>void|null
}

export interface InputProps extends InputFuncProps {
  style: any
  placeholder?: string
  value?: string
  ref?: any
  rightElement?: JSX.Element
}

export const Input = (props: InputProps) => (
  <View
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
    {/* {console.log(props.style) } */}
    <TextInput
      style={[
        styles.input,
        props.style
        // pick(
        //   [
        //     'fontSize',
        //     'padding'
        //   ],
        //   props.style
        // )
      ]}
      ref={props.passRef && props.passRef}
      {
        // ...props.ref 
        // ? {ref: props.ref}
        // : 
        ...omit(
          [
            'InputRightElement',
            'style',
            'passRef'
          ],
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
      [
        'title',
        'onPress',
        'color'
      ],
      props
    )}
    rightElement={
      <Button
        {...pick([
          'title',
          'onPress',
          'color'
        ]), props}
        accessibilityLabel="Learn more about this purple button"
      />
    }
  />
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
    minWidth: 200,
  },
  topField: { padding: 5 },
});
