import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Images } from '../../../../assets'
import { useBPTheme } from '../../../common/components/ThemeProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Feather'
export const BPAppBar = ({ canGoback = false }: { canGoback?: boolean }) => {
  const { colors, padding, gap } = useBPTheme();

  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: colors.background }}>
      <SafeAreaView edges={['right', 'left', 'top']}>
        <View style={[styles.header, { borderColor: colors.border, padding: padding.sm, gap: gap.sm, paddingLeft: canGoback ? padding.sm * 0.5 : padding.sm }]}>
          <View style={styles.leadContent}>
            {
              canGoback
                ? <View style={styles.backButton}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                      <Icon name="chevron-left" size={25} color={colors.border} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                : <></>
            }
          </View>
          <View style={[styles.titleContainer, { gap: gap.sm * 0.5 }]}>
            <Image style={styles.logo} source={Images.logos.BPLogo} />
            <Text style={[styles.title, { color: colors.seconday }]} >BANCO PICHINCHA</Text>
          </View>
          <View style={styles.leadContent} />
        </View>
      </SafeAreaView>
    </View>
  )
}


const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 70,
  },
  leadContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
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
    borderRadius: 5,
    height: 40,
    width: 40,
  }
})