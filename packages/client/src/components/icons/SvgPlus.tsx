import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function SvgPlus(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -256 1792 1792"
      width="50"
      height="50"
      {...props}
    >
      <Path
        d="M1408 800V608q0-40-28-68t-68-28H896V96q0-40-28-68T800 0H608q-40 0-68 28t-28 68v416H96q-40 0-68 28T0 608v192q0 40 28 68t68 28h416v416q0 40 28 68t68 28h192q40 0 68-28t28-68V896h416q40 0 68-28t28-68z"
        transform="matrix(1 0 0 -1 205.017 1368.95)"
        fill="currentColor"/>
    </Svg>
  );
}

export default SvgPlus;
