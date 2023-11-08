import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FinantialProductForm } from '../components/FinantialProductForm';
import { StyleSheet } from 'react-native';
import { useFinantialProductEdit } from '../../application/useFinantialProductEdit';
import { FinanctialProductsContext } from '../components/FinancialProductsProvider';
import { RepositoryContext } from '../../../common/components/RepositoryProvider';
import { useSnackbarReponse } from '../../../common/hooks/useSnackbarResponse';


export const FinancialProductEditView = () => {
    const { productRepository } = useContext(RepositoryContext);
    const { state: { productSelected } } = useContext(FinanctialProductsContext);
    const { actions, state } = useFinantialProductEdit({ productRepository, initialForm: productSelected });
    useSnackbarReponse({ status: state.updateStatus.status, successMessage: 'Producto actualizado con exito!', errorMessage: state.updateStatus.error });
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

