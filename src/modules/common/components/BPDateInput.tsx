import React, { useContext, useState } from 'react'
import { ColorValue, View } from 'react-native'
import { ThemeContext } from './ThemeProvider';
import DatePicker from 'react-native-date-picker';
import { BPTextInput } from './BPTextInput';
import { financialProductDefaultDate } from '../constants/defaultDate';

export interface BPDateInputProps {
  onChange?: (date: Date) => void;
  value?: Date,
  placeholderTextColor?: ColorValue,
  error?: string
  readonly?: boolean,
  minimumDate?: Date,
}
export const BPDateInput = ({ error, readonly = false, minimumDate = new Date(), ...props }: BPDateInputProps) => {
  const { colors } = useContext(ThemeContext);
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const value = !Object.is(props.value, financialProductDefaultDate) ? (props.value ?? date).toLocaleDateString('es') : '';
  return (
    <View>
      <BPTextInput
        value={value}
        selectionColor={colors.seconday}
        error={error}
        placeholderTextColor={props.placeholderTextColor ?? colors.onBackground}
        readonly={readonly}
        onPress={readonly ? undefined : () => { console.log("/////"); setOpen(true); }}
      />
      <DatePicker
        modal
        open={open}
        date={date}
        minimumDate={minimumDate}
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
  )
}