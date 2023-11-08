import React, { useContext } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, TouchableNativeFeedback, View } from 'react-native'
import { useBPTheme } from './ThemeProvider';

type BPInputBorderMode = 'focus' | 'unfocus';
export interface BPTextInputProps extends TextInputProps {
  error?: string,
  readonly?: boolean,
  onPress?: () => void,
}
export const BPTextInput = ({ error = '', readonly = false, onPress, ...props }: BPTextInputProps) => {

  const { colors } = useBPTheme();
  const [focusMode, setFocusMode] = React.useState<BPInputBorderMode>('unfocus');
  const borderColor = error.length > 0 ? colors.error : colors.border;
  return (
    <View style={styles.container}>
      <View style={{ borderRadius: 8, overflow: 'hidden' }}>
        <TouchableNativeFeedback onPress={onPress} disabled={!onPress}>
          <View >
            <View pointerEvents={(readonly || onPress) ? 'none' : 'auto'}>
              <TextInput
                {...props}
                selectionColor={colors.seconday}
                placeholderTextColor={props.placeholderTextColor ?? colors.onBackground}
                style={[styles.input, { borderColor: borderColor, backgroundColor: readonly ? colors.surface : 'transparent' }, props.style]}
                onFocus={() => setFocusMode('focus')}
                onBlur={() => setFocusMode('unfocus')}
              />
            </View>

          </View>
        </TouchableNativeFeedback>

      </View>
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