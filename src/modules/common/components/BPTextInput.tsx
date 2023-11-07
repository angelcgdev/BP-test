import React, { useContext } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { ThemeContext } from './ThemeProvider';

type BPInputBorderMode = 'focus' | 'unfocus';
export interface BPTextInputProps extends TextInputProps {
  error?: string
}
export const BPTextInput = ({ error = '', ...props }: BPTextInputProps) => {

  const { colors } = useContext(ThemeContext);
  const [focusMode, setFocusMode] = React.useState<BPInputBorderMode>('unfocus');
  const borderColor = error.length > 0 ? colors.error : colors.border;
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        selectionColor={colors.seconday}
        placeholderTextColor={props.placeholderTextColor ?? colors.onBackground}
        style={[styles.input, { borderColor: borderColor }, props.style]}
        onFocus={() => setFocusMode('focus')}
        onBlur={() => setFocusMode('unfocus')}
      />
      {
        (error.length > 0)
        && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
      }
    </View>
  )

}

const borderRadius = 8;
const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  input: {
    borderRadius: borderRadius,
    borderWidth: 1,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
  },
  error: {
    fontWeight: '600'
  }
})