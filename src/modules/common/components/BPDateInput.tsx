import React, { useContext, useState } from 'react'
import { ColorValue, Text, TouchableNativeFeedback, View } from 'react-native'
import { ThemeContext } from './ThemeProvider';
import DatePicker from 'react-native-date-picker';
import { BPTextInput } from './BPTextInput';

export interface BPDateInputProps {
  onChange?: (date: Date) => void;
  value?: Date,
  placeholderTextColor?: ColorValue,
  error?: string
  readonly?: boolean
}
export const BPDateInput = ({ error, readonly = false, ...props }: BPDateInputProps) => {
  const { colors } = useContext(ThemeContext);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  return (
    <TouchableNativeFeedback onPress={readonly ? undefined : () => { setOpen(true) }}>
      <View>
        <View pointerEvents='none'>
          <BPTextInput
            value={(props.value ?? date).toLocaleDateString('es')}
            selectionColor={colors.seconday}
            error={error}
            placeholderTextColor={props.placeholderTextColor ?? colors.onBackground}
            style={readonly && { backgroundColor: colors.surface }}
          />

        </View>
        <DatePicker
          modal
          open={open}
          date={date}
          mode='date'
          locale='es'
          onConfirm={(date) => {
            setOpen(false)
            setDate(date);
            if (props.onChange) {
              props.onChange(date);
            }
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </TouchableNativeFeedback>
  )
}