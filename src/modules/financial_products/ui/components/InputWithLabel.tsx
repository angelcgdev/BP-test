import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BPTextInput, BPTextInputProps } from '../../../common/components/BPTextInput'
import { BPDateInput, BPDateInputProps } from '../../../common/components/BPDateInput'


interface TextInputWithLabelProps extends BPTextInputProps {
    label: string,
}
export const TextInputWithLabel = ({ label, ...inputProps }: TextInputWithLabelProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <BPTextInput {...inputProps} />
        </View>
    )
}

interface DateInputWithLabelProps extends BPDateInputProps {
    label: string,
}
export const DateInputWithLabel = ({ label, ...inputProps }: DateInputWithLabelProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <BPDateInput {...inputProps} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
    },
    label: {
        fontWeight: '500'
    }
});