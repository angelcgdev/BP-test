import React, { useContext } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DangerButton, SecondaryButton } from '../../../common/components/Button'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../../App'
import { ThemeContext } from '../../../common/components/ThemeProvider'

type FinancialProductDetailsViewProps = NativeStackScreenProps<RootStackParamList, 'Details'>;
export const FinancialProductDetailsView = ({ route }: FinancialProductDetailsViewProps) => {

    const { product } = route.params;
    const { padding, gap } = useContext(ThemeContext);
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
                    <Image style={styles.extraInfoItemLogo} source={{
                        uri: product.logo,
                    }} />
                </View>
                <ExtraInfoItem label='Fecha liberación' value={product.date_release.toLocaleDateString('es')} />
                <ExtraInfoItem label='Fecha revisión' value={product.date_revision.toLocaleDateString('es')} />
            </View>
            <View style={[styles.actionsBody, { gap: gap.sm }]}>
                <SecondaryButton title='Editar' />
                <DangerButton title='Eliminar' />
            </View>
        </SafeAreaView>
    )
}

const ExtraInfoItem = ({ label, value }: { label: string, value: string }) => {
    const { gap } = useContext(ThemeContext);
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
        alignSelf: 'center'
    },
    actionsBody: {
        padding: padding,
    },
})