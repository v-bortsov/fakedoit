import React, { useState } from 'react';
import { Animated, ScrollView, StyleSheet } from 'react-native';
import { useAnimateCollapse } from '../../hooks/useAnimateCollapse';
import { View } from '../Themed';

interface Collapse {
  idx: number;
  duration: number;
  Header: React.FC<(animation: any, setOpen: any, open: boolean) => JSX.Element>;
  children: JSX.Element;
  icon?: JSX.Element;
  borderStyle?: any;
  backgroundColor?: any;
  buttonProps?: any;
  Button?: any;
  style?: any;
}

const Collapse = ({
  idx,
  duration,
  Header,
  children,
  backgroundColor
}: Collapse) => {

  const [open, setOpen] = useState(false);

  const {maxHeight, value} = useAnimateCollapse(
    duration,
    open
  )
  
  return (
    <View key={idx}>
      <Header animation={value} setOpen={setOpen} open={open} />
      <Animated.View
        key={`desc_${idx}`}
        style={{
          maxHeight,
          backgroundColor,
          overflow: 'hidden',
        }}
      >
        <ScrollView>{children}</ScrollView>
      </Animated.View>
    </View>
  );
};

const parentMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: -5,
};

const childMargin = {
  marginTop: 0,
  marginRight: 0,
  marginBottom: 5,
  marginLeft: 5,
};

const styles = StyleSheet.create({
  summary: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    flexDirection: 'row',
    ...parentMargin,
  },
  turnoverSummary: { flex: 1, alignItems: 'flex-end', ...childMargin },
});

export default Collapse;
