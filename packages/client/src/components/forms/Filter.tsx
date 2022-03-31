import React, { useState } from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
import SvgArrowDown from '../icons/SvgArrowDown';
import { NewSlider } from '../Primitives/Slider/NewSlider';
import SelectDropdown from '../Primitives/Select/Select';
import { FilterType } from '../../types/react-app-env';


const FilterForm = ({uniq, total, shuffle, byColumn}: FilterType) => {

  const [isEnabled, setIsEnabled] = useState(shuffle.value);
  const toggleSwitch = () => setIsEnabled((previousState: boolean) => !previousState);
  
  return (<View style={styles.container}>
    <View style={{ flex: 1, padding: 10 }}>
      <Text>Uniq:</Text>
      <NewSlider
        animateTransitions
        value={uniq.value}
        maximumValue={uniq.max}
        onValueChange={(value: any) => console.log(value)}/>
      <Text>Shuffle:</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}/>
    </View>
    <View style={{ flex: 1, padding: 10 }}>
      <Text>Total:</Text>
      <NewSlider
        value={total.value}
        maximumValue={total.max}
        onValueChange={(value: any) => console.log(value)}/>
      <SelectDropdown
        data={byColumn.options}
        value={byColumn.value}
        // disabled={true}
        // defaultValueByIndex={1} // use default value by index or default value
        // defaultValue={'Canada'} // use default value by index or default value
        renderDropdownIcon={(isOpened: boolean) => (
          <SvgArrowDown width={18} height={18} />
        )}
        defaultButtonText={'Select a column'}
        onSelect={(
          selectedItem: string, index: number
        ) => {
          console.log(
            selectedItem,
            index
          );
        }}
        buttonTextAfterSelection={(
          selectedItem: string, index: number
        ) => selectedItem}
        rowTextForSelection={(
          item: string, index: number
        ) => item}/>
    </View>
  </View>)
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', padding: 10 /* , height: 100 */ },

})
export default FilterForm
