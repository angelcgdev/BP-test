import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateInputWithLabel, TextInputWithLabel } from '../components/InputWithLabel';
import { PrimaryButton, SecondaryButton } from '../../../common/components/Button';
import { ThemeContext } from '../../../common/components/ThemeProvider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FinanctialProductsContext } from '../components/FinancialProductsProvider';
import { CreateFinancialProductForm, financialProductFormEmpty } from './models/createFinancialProductForm';
import { CreateFinancialProductFormErrors, financialProductFormErrorsEmpty } from './models/createFinancialProductFormErrors';

type FormValue = string | Date;
type FormKey = keyof CreateFinancialProductForm;
export const FinancialProductCreateView = () => {
    const { padding, gap } = useContext(ThemeContext);
    // const { state: { products, productStatus } } = useContext(FinanctialProductsContext);
    const [form, setForm] = useState(financialProductFormEmpty);
    const [erros, setErrors] = useState(financialProductFormErrorsEmpty);
    const handleChange = (key: keyof CreateFinancialProductForm, value: string | Date) => {
        setForm((form) => ({ ...form, [key]: value }));
    }

    const handleResetform = () => {
        setForm(financialProductFormEmpty);
    }
    const getErrors = (): CreateFinancialProductFormErrors => {
        let newErrors = { ...financialProductFormErrorsEmpty };
        console.log("errors default", newErrors)
        Array.from(Object.entries(form)).forEach((entry) => {
            const [key, value] = entry as [FormKey, FormValue];
            switch (key) {
                case 'id':
                    const idMinLength = 3;
                    const idMaxLength = 10;
                    const idLength = (value as String).length;
                    if (idLength < idMinLength || idLength > idMaxLength) {
                        newErrors['id'] = "ID no válido!"
                    }
                    break;

                case 'name':
                    const nameMinLength = 5;
                    const mameMaxLength = 100;
                    const nameLength = (value as String).length;
                    if (nameLength < nameMinLength || nameLength > mameMaxLength) {
                        newErrors['name'] = "Nombre no válido!"
                    }
                    break;
                case 'description':
                    const descriptionMinLength = 5;
                    const descriptionMaxLength = 100;
                    const descriptionLength = (value as String).length;
                    if (descriptionLength < descriptionMinLength || descriptionLength > descriptionMaxLength) {
                        newErrors['description'] = "Descripción no válida!"
                    }
                    break;
                case 'logo':
                    const logoMinLength = 1;
                    const logoLength = (value as String).length;
                    if (logoLength < logoMinLength) {
                        newErrors['logo'] = "Logo es requerido!"
                    }
                    break;
                case 'date_release':

                    break;
                case 'date_revision':

                    break;
            }
        });
        return newErrors;
    }

    const haveErrors = (errors: CreateFinancialProductFormErrors) => {
        return Array.from(Object.entries(errors)).every((entry) => entry[0] !== '');
    }

    const handleSubmit = () => {
        console.log("handleSubmit")
        const errors = getErrors();
        console.log("handleSubmit errors", errors)
        setErrors(errors);
        if (!haveErrors(errors)) {
            console.log("no hay errores")

        }

    }
    // console.log({ products, productStatus });
    return (
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
            <KeyboardAwareScrollView>
                <View style={{ gap: gap.md, flex: 1 }}>
                    <ScrollView
                        style={{ paddingHorizontal: padding.sm }}
                    >
                        <Text style={[styles.title, { paddingVertical: padding.md }]}>Formulario de Registro</Text>
                        <View style={[styles.formContainer, { gap: gap.sm }]}>
                            <TextInputWithLabel label='ID' onChange={(e) => handleChange('id', e.nativeEvent.text)} value={form.id} error={erros.id} />
                            <TextInputWithLabel label='Nombre' onChange={(e) => handleChange('name', e.nativeEvent.text)} value={form.name} error={erros.name} />
                            <TextInputWithLabel label='Descripción' onChange={(e) => handleChange('description', e.nativeEvent.text)} value={form['description']} error={erros.description} />
                            <TextInputWithLabel label='Logo' onChange={(e) => handleChange('logo', e.nativeEvent.text)} value={form.logo} error={erros.logo} />
                            <DateInputWithLabel label='Fecha de Liberación' onChange={(value) => handleChange('date_release', value)} value={form.date_release} error={erros.date_release} />
                            <DateInputWithLabel label='Fecha de Revisión' onChange={(value) => handleChange('date_revision', value)} value={form.date_revision} error={erros.date_revision} />
                        </View>
                    </ScrollView>
                    <View style={[styles.actionsContainer, { gap: gap.sm, paddingHorizontal: padding.sm }]}>
                        <PrimaryButton title='Enviar' onPress={handleSubmit} />
                        <SecondaryButton title='Reiniciar' onPress={handleResetform} />
                    </View>
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '600',
        fontSize: 24,
    },
    formContainer: {
    },
    actionsContainer: {
    }
})

