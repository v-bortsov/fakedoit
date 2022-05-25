import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Field } from '../../types/react-app-env'
import { getCitiesByCountry, getCountries } from '../../utils'

export interface IDictionaryProps {
  country: Field<ComponentSelectBase>
  dispatch: Dispatch
  idx?: number
}

const DictionaryForm = ({country, dispatch}: IDictionaryProps) => {
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])

  useEffect(
    async () => {
      const collect = await getCitiesByCountry({countryId: country?.component?.value, limit: 10})
      setCities(collect)
    },
    [country?.component?.value]
  )

  useEffect(async () => {
    const collect = await getCountries()
    setCountries(collect)
  })
  
  return (
    <View>
      <Text>Country</Text>
      {/* <SelectDropdown
      data={countries}
      value={country?.component?.value}
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
      ) => item}/> */}
      {cities.map((
        item: string, keyNumber: number
      ) => (
        <View key={keyNumber} style={{flex: 1, flexDirection: 'row', borderColor: 'black', borderWidth: 1,  alignItems: 'center'}}>
          {item}
        </View>
      ))}
    </View>
  )
}

export default DictionaryForm

const styles = StyleSheet.create({})
