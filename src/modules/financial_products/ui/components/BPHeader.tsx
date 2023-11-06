import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Images } from '../../../../assets'
import { ThemeContext } from '../../../common/components/ThemeProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
export const BPHeader = ({ canGoback = false }: { canGoback?: boolean }) => {
  const { colors } = useContext(ThemeContext);

  const navigation = useNavigation();
  return (
    <SafeAreaView edges={['right', 'left', 'top']} style={{ backgroundColor: colors.background }}>
      <View style={[styles.header, { borderColor: colors.border }]}>
        <View style={styles.leadContent}>
          {
            canGoback
              ? <TouchableWithoutFeedback
                style={styles.backButton}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text>{'<'}</Text>
              </TouchableWithoutFeedback>
              : <></>
          }
        </View>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} source={Images.logos.BPLogo} />
          <Text style={[styles.title, { color: colors.seconday }]} >BANCO PICHINCHA</Text>
        </View>
        <View style={styles.leadContent} />
      </View>
    </SafeAreaView>
  )
}


const padding = 20;
const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    padding: padding,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: padding * 0.5,
  },
  leadContent: {
    flex: 1,
  },
  rightContent: {
    flex: 1,
  },
  titleContainer: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: padding * 0.5,
  },
  logo: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  backButton: {
    padding: 10,
    height: 40,
    width: 40,
  }
})