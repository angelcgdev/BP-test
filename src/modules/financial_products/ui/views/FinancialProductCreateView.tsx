import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFinantialProductCreate } from '../../application/useFinantialProductCreate';
import { FinantialProductForm } from '../components/FinantialProductForm';
import { RepositoryContext } from '../../../common/components/RepositoryProvider';
import { useSnackbarReponse } from '../../../common/hooks/useSnackbarResponse';
import { useNavigation } from '@react-navigation/native';
import { FinanctialProductsContext } from '../components/FinancialProductsProvider';

export const FinancialProductCreateView = () => {

    const navigation = useNavigation();
    const { productRepository } = useContext(RepositoryContext);
    const { actions: { getProducts } } = useContext(FinanctialProductsContext);
    const { actions, state } = useFinantialProductCreate({
        productRepository,
        createSuccess: () => {
            getProducts();
        },
    });
    useSnackbarReponse({
        status: state.createStatus,
        success: {
            message: 'Producto creado con exito!',
            actionText: 'volver',
            onActionPress: navigation.goBack
        }
    });

    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            <KeyboardAwareScrollView>
                <FinantialProductForm actions={actions} state={state} mode='creation' submitting={state.createStatus === 'loading'} />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

