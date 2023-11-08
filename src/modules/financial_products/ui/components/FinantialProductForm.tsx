import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useBPTheme } from '../../../common/components/ThemeProvider';
import { DateInputWithLabel, TextInputWithLabel } from './InputWithLabel';
import { PrimaryButton, SecondaryButton } from '../../../common/components/Button';
import { FinancialProductForm, FinancialProductFormKeys } from '../models/financialProductForm';
import { FinancialProductFormErrors } from '../models/financialProductFormErrors';

interface FinantialProductFormProps {
    mode: 'creation' | 'edition',
    submitting?: boolean,
    actions: {
        handleSubmit: () => Promise<void>;
        handleChange: (key: FinancialProductFormKeys, value: string | Date) => void;
        handleResetform: () => void;
    }
    state: {
        form: FinancialProductForm,
        errors: FinancialProductFormErrors
    }
}
export const FinantialProductForm = ({ actions, state, mode, submitting = false }: FinantialProductFormProps) => {
    const { padding, gap } = useBPTheme();
    return (
        <View style={[styles.container, { gap: gap.md, paddingBottom: padding.sm }]}>
            <ScrollView
                style={{ paddingHorizontal: padding.sm, }}
            >
                <Text style={[styles.title, { paddingVertical: padding.md }]}>Formulario de Registro</Text>
                <View style={[styles.formContainer, { gap: gap.sm }]}>
                    <TextInputWithLabel label='ID' onChange={(e) => actions.handleChange('id', e.nativeEvent.text)} value={state.form.id} error={state.errors.id} readonly={mode === 'edition'} />
                    <TextInputWithLabel label='Nombre' onChange={(e) => actions.handleChange('name', e.nativeEvent.text)} value={state.form.name} error={state.errors.name} />
                    <TextInputWithLabel label='Descripción' onChange={(e) => actions.handleChange('description', e.nativeEvent.text)} value={state.form.description} error={state.errors.description} />
                    <TextInputWithLabel label='Logo' onChange={(e) => actions.handleChange('logo', e.nativeEvent.text)} value={state.form.logo} error={state.errors.logo} />
                    <DateInputWithLabel label='Fecha de Liberación' onChange={(value) => actions.handleChange('date_release', value)} value={state.form.date_release} error={state.errors.date_release} />
                    <DateInputWithLabel label='Fecha de Revisión' onChange={(value) => actions.handleChange('date_revision', value)} value={state.form.date_revision} error={state.errors.date_revision} readonly />
                </View>
            </ScrollView>
            <View style={[styles.actionsContainer, { gap: gap.sm, paddingHorizontal: padding.sm }]}>
                <PrimaryButton title='Enviar' onPress={actions.handleSubmit} loading={submitting} />
                <SecondaryButton title='Reiniciar' onPress={actions.handleResetform} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: '600',
        fontSize: 24,
    },
    formContainer: {
    },
    actionsContainer: {
    }
})