import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { BPTextInput } from '../../../common/components/BPTextInput'
import { FinancialProductsList } from '../components/FinancialProductsList'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../../App'
import { FinanctialProductsContext } from '../components/FinancialProductsProvider'
import { PrimaryButton } from '../../../common/components/Button'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = NativeStackScreenProps<RootStackParamList, 'Create'>;
type ProfileScreenNavigationProp = Props['navigation'];
export const FinancialProductsView = () => {

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  return (
    <SafeAreaView style={styles.container} edges={['bottom']} >
      <View style={styles.body}>
        <SearchBar />
      </View>
      <FinancialProductsList />
      <View style={styles.body}>
        <PrimaryButton title='Agregar' onPress={() => {
          navigation.push('Create');
        }} />
      </View>
    </SafeAreaView>
  )
}

const SearchBar = () => {

  const { actions: { changeQuery } } = useContext(FinanctialProductsContext);
  return (
    <BPTextInput placeholder='Search...' onChange={(e) => changeQuery(e.nativeEvent.text)} />
  )
}
const padding = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    // flex: 1,
    padding: padding,
    gap: padding,
  }
})