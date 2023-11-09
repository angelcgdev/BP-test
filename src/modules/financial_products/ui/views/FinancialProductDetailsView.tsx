import React, { useContext, useState } from 'react';
import { Text, View, Image, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FinanctialProductsContext } from '../components/FinancialProductsProvider';
import { BPBottomModalSheet } from '../../../common/components/BPModalBottomSheet';
import { useFinantialProductDelete } from '../../application/useFinantialProductDelete';
import { DangerButton, PrimaryButton, SecondaryButton, useBPTheme } from '../../../common/components';
import Icon from 'react-native-vector-icons/Feather';
import { RepositoryContext } from '../../../common/components/RepositoryProvider';
import { useSnackbarReponse } from '../../../common/hooks/useSnackbarResponse';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../../App';
import { useNavigation } from '@react-navigation/native';

type FinancialProductDetailsViewProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
export const FinancialProductDetailsView = ({ navigation }: FinancialProductDetailsViewProps) => {

    const { productRepository } = useContext(RepositoryContext);
    const { state: { productSelected: product }, actions: { getProducts } } = useContext(FinanctialProductsContext);
    const { colors, padding, gap } = useBPTheme();
    const { actions, state } = useFinantialProductDelete({
        product, productRepository,
        deleteSuccess: () => {
            getProducts();
            navigation.goBack();
        }
    });
    useSnackbarReponse({ status: state.deleteStatus, success: { message: 'Producto eliminado con exito!' } });
    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <View style={[styles.body, { padding: padding.sm, gap: gap.md }]}>
                <View style={{ paddingVertical: padding.md }}>
                    <Text style={[styles.title]}>ID:{product.id}</Text>
                    <Text style={{ fontSize: 16 }}>Información extra</Text>
                </View>
                <ExtraInfoItem label='Nombre' value={product.name} />
                <ExtraInfoItem label='Descripción' value={product.description} />
                <View style={styles.extraInfoItemContainerWithLogo}>
                    <Text style={styles.extraInfoItemLabel}>Logo</Text>
                    <FinantialProductLogo logo={product.logo} />
                </View>
                <ExtraInfoItem label='Fecha liberación' value={product.date_release.toLocaleDateString('es')} />
                <ExtraInfoItem label='Fecha revisión' value={product.date_revision.toLocaleDateString('es')} />
            </View>
            <View style={[styles.actionsBody, { gap: gap.sm }]}>
                <SecondaryButton title='Editar' onPress={() => {

                    navigation.push('Edit');
                }} />
                <DangerButton title='Eliminar' onPress={() => actions.setModalStatus('opened')} loading={state.deleteStatus === 'loading'} />
            </View>
            <BPBottomModalSheet
                visible={state.modalStatus === 'opened'}
                onDismiss={() => actions.setModalStatus('closed')}
                header={<View style={[{ width: '100%', minHeight: 20, position: 'relative' }]}>
                    <View style={[{ height: 40, borderRadius: 40, aspectRatio: '1/1', overflow: 'hidden', position: 'absolute', top: -10, right: -10 }]}>
                        <TouchableNativeFeedback onPress={() => actions.setModalStatus('closed')}>
                            <View style={[{ padding: padding.sm * 0.25, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }]}>
                                <Icon name="x" size={25} color={colors.border} />
                            </View>
                        </TouchableNativeFeedback>

                    </View>
                </View>}
                content={<Text numberOfLines={2} style={[{ textAlign: 'center', fontWeight: '500', color: colors.onBackground }]}>¿Estás seguro de eliminar el producto {product.name}?</Text>}
                actions={<>
                    <PrimaryButton title='Confirmar' onPress={() => { actions.deleteProduct(); actions.setModalStatus('closed'); }} loading={state.deleteStatus === 'loading'} />
                    <SecondaryButton title='Cancelar' />
                </>} />
        </SafeAreaView>
    );
};


export const FinantialProductLogo = ({ logo }: { logo: string }) => {

    const isImagePathValid = /^https?:\/\/.*/.test(logo);
    const { colors } = useBPTheme();
    if (!isImagePathValid) {
        return (
            <View style={[styles.extraInfoItemLogo, { backgroundColor: colors.surface }]}>
                <Text style={{ color: colors.onSurface }}>Ocurrio un error</Text>
            </View>
        )
    }
    return (
        <Image style={styles.extraInfoItemLogo} source={{
            uri: logo,
        }} />
    )
}




const ExtraInfoItem = ({ label, value }: { label: string, value: string }) => {
    const { gap } = useBPTheme();
    return (
        <View style={[styles.extraInfoItemContainer, { gap: gap.sm }]}>
            <Text style={styles.extraInfoItemLabel}>{label}</Text>
            <Text style={styles.extraInfoItemValue} numberOfLines={2} ellipsizeMode='tail'>{value}</Text>
        </View>
    )
}


const padding = 20;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    title: {
        fontWeight: '600',
        fontSize: 24,
    },
    extraInfoItemContainer: {
        display: 'flex',
        flexDirection: 'row', justifyContent: 'space-between',
    },
    extraInfoItemLabel: {
        color: 'gray',
    },
    extraInfoItemValue: {
        color: 'black',
        flex: 1,
        textAlign: 'right',
        fontWeight: '500',
    },
    extraInfoItemContainerWithLogo: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    extraInfoItemLogo: {
        width: '50%',
        aspectRatio: '16/9',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionsBody: {
        padding: padding,
    },
})