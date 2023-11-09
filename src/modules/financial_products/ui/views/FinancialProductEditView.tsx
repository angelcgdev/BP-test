import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FinantialProductForm } from '../components/FinantialProductForm';
import { StyleSheet } from 'react-native';
import { useFinantialProductEdit } from '../../application/useFinantialProductEdit';
import { FinanctialProductsContext } from '../components/FinancialProductsProvider';
import { RepositoryContext } from '../../../common/components/RepositoryProvider';
import { useSnackbarReponse } from '../../../common/hooks/useSnackbarResponse';
import { useNavigation } from '@react-navigation/native';


export const FinancialProductEditView = () => {
    const navigation = useNavigation();
    const { productRepository } = useContext(RepositoryContext);
    const { state: { productSelected }, actions: { getProducts, selectProduct } } = useContext(FinanctialProductsContext);
    const { actions, state } = useFinantialProductEdit({
        productRepository,
        initialForm: productSelected,
        editSuccess: () => {
            selectProduct(state.form);
            getProducts();
        }
    });
    useSnackbarReponse({
        status: state.updateStatus.status,
        success: {
            message: 'Producto actualizado con exito!',
            actionText: 'volver',
            onActionPress: navigation.goBack
        },
        errorMessage: state.updateStatus.error
    });
    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            <KeyboardAwareScrollView>
                <FinantialProductForm actions={actions} state={state} mode='edition' submitting={state.updateStatus.status === 'loading'} />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

