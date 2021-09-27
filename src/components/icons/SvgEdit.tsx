import { omit } from 'ramda'
import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'

function SvgEdit(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 55.25 55.25"
      xmlSpace="preserve"
      enableBackground="new 0 0 55.25 55.25"
      {...
        props
      }
    >
      <Path d="M.523 51.933l-.497 2.085a.991.991 0 00-.022.202c0 .014-.004.026-.004.039a.995.995 0 00.095.403c.049.107.11.21.196.296a1.006 1.006 0 00.938.266l2.086-.497-2.792-2.794zM52.618 2.631c-3.51-3.508-9.219-3.508-12.729 0L3.827 38.693c-.017.017-.027.038-.042.056-.021.024-.039.05-.058.076a.972.972 0 00-.125.239c-.009.026-.022.049-.029.075l-.012.03-2.495 10.48L5.6 54.182l10.48-2.495c.027-.006.051-.021.077-.03a.985.985 0 00.3-.162c.024-.019.049-.033.072-.054.008-.008.018-.012.026-.02l36.063-36.063c3.509-3.508 3.509-9.218 0-12.727zM17.157 47.992l.354-3.183L39.889 22.43a.999.999 0 10-1.414-1.414L16.097 43.395l-4.773.53.53-4.773 22.38-22.378a.999.999 0 10-1.414-1.414L10.44 37.738l-3.183.354L34.94 10.409l9.9 9.9-27.683 27.683zm29.097-29.097l-9.9-9.9 1.414-1.414 9.9 9.9-1.414 1.414zm2.828-2.828l-9.9-9.9 1.415-1.415 9.9 9.9-1.415 1.415z" />
    </Svg>
  )
}

export default SvgEdit