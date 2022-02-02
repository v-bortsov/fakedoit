import { WeekDays } from './WeekDays';
// import InputSpinner from 'react-native-input-spinner';
import { NewSlider } from './Slider/NewSlider';
import { Input } from './TextInput';
import { Menu } from './Menu';
import { TextArea } from './TextArea';
import { DatePicker } from './DatePicker';
import { Formatter } from './Formatter';
// export {Input} from './TextInput'
// export {Slider as InputNumber} from './Slider'
// export {Select} from './CustomPicker'
// export {TextArea} from './TextArea'
// export {WeekDays} from './WeekDays'
// export {DatePicker} from './DatePicker'
// export {Multislider} from './Multislider'
export default {
  Input,
  Menu,
  InputNumber: NewSlider /* InputSpinner */,
  TextArea,
  WeekDays,
  DatePicker,
  Formatter
};
