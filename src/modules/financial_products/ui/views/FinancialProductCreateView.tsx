import React, { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFinantialProductCreate } from '../../application/useFinantialProductCreate';
import { FinantialProductForm } from '../components/FinantialProductForm';
import { RepositoryContext } from '../../../common/components/RepositoryProvider';
import { useSnackbarReponse } from '../../../common/hooks/useSnackbarResponse';

export const FinancialProductCreateView = () => {
    const { productRepository } = useContext(RepositoryContext);
    const { actions, state } = useFinantialProductCreate({ productRepository });
    useSnackbarReponse({ status: state.createStatus, successMessage: 'Producto creado con exito!' });

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

