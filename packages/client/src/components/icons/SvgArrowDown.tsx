import * as React from 'react'
import Svg, { Path, Polygon } from 'react-native-svg'

function SvgArrowDown(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="50"
      height="50"
      viewBox="0 0 330 330"
      xmlSpace="preserve"
      enableBackground="new 0 0 330 330"
      {...props}
    >
      {/* <Polygon points="0,100 50,0 100,100"/> */}
      <Path d="M325.607 79.393c-5.857-5.857-15.355-5.858-21.213.001l-139.39 139.393L25.607 79.393c-5.857-5.857-15.355-5.858-21.213.001-5.858 5.858-5.858 15.355 0 21.213l150.004 150a14.999 14.999 0 0021.212-.001l149.996-150c5.859-5.857 5.859-15.355.001-21.213z" />
    </Svg>
  )
}

export default SvgArrowDown