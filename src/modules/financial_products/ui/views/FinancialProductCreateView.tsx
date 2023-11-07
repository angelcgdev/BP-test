import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateInputWithLabel, TextInputWithLabel } from '../components/InputWithLabel';
import { PrimaryButton, SecondaryButton } from '../../../common/components/Button';
import { ThemeContext } from '../../../common/components/ThemeProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFinantialProductCreate } from '../../aplication/useFinantialProductCreate';
import { FinancialProductsRepositoryImpl } from '../../infraestructure/repositories/financialProductsRepositoryImpl';


export const FinancialProductCreateView = () => {
    const { padding, gap } = useContext(ThemeContext);
    const { actions, state } = useFinantialProductCreate({ productRepository: new FinancialProductsRepositoryImpl() });
    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            <KeyboardAwareScrollView>
                <View style={[styles.container, { gap: gap.md, paddingBottom: padding.sm }]}>
                    <ScrollView
                        style={{ paddingHorizontal: padding.sm, }}
                    >
                        <Text style={[styles.title, { paddingVertical: padding.md }]}>Formulario de Registro</Text>
                        <View style={[styles.formContainer, { gap: gap.sm }]}>
                            <TextInputWithLabel label='ID' onChange={(e) => actions.handleChange('id', e.nativeEvent.text)} value={state.form.id} error={state.errors.id} />
                            <TextInputWithLabel label='Nombre' onChange={(e) => actions.handleChange('name', e.nativeEvent.text)} value={state.form.name} error={state.errors.name} />
                            <TextInputWithLabel label='Descripción' onChange={(e) => actions.handleChange('description', e.nativeEvent.text)} value={state.form.description} error={state.errors.description} />
                            <TextInputWithLabel label='Logo' onChange={(e) => actions.handleChange('logo', e.nativeEvent.text)} value={state.form.logo} error={state.errors.logo} />
                            <DateInputWithLabel label='Fecha de Liberación' onChange={(value) => actions.handleChange('date_release', value)} value={state.form.date_release} error={state.errors.date_release} />
                            <DateInputWithLabel label='Fecha de Revisión' onChange={(value) => actions.handleChange('date_revision', value)} value={state.form.date_revision} error={state.errors.date_revision} readonly />
                        </View>
                    </ScrollView>
                    <View style={[styles.actionsContainer, { gap: gap.sm, paddingHorizontal: padding.sm }]}>
                        <PrimaryButton title='Enviar' onPress={actions.handleSubmit} />
                        <SecondaryButton title='Reiniciar' onPress={actions.handleResetform} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
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

