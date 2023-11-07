import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { RootStackParamList } from '../../../../../App';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../../common/components/ThemeProvider';
import { FinanctialProductsContext } from './FinancialProductsProvider';
import { FinancialProductsItem } from './FinancialProductItem';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
type ProfileScreenNavigationProp = Props['navigation'];
export const FinancialProductsList = () => {
    const { state: { products, productStatus } } = useContext(FinanctialProductsContext);
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const { colors } = useContext(ThemeContext);

    switch (productStatus.status) {
        case 'initial':
            return <></>
        case 'loading':
            return (
                <View style={styles.defaultContainer}>
                    <Text>Cargando...</Text>
                </View>
            )
        case 'failure':
            return (
                <View style={styles.defaultContainer}>
                    <Text>{productStatus.error ?? 'Error desconocido.'}</Text>
                </View>
            )
        case 'successfully':
            if (products.length === 0) {
                return (
                    <View style={styles.defaultContainer}>
                        <Text>No hay productos registrados.</Text>
                    </View>
                )
            }
            return (
                <FlatList
                    data={products}
                    contentContainerStyle={styles.container}
                    renderItem={({ item }) => {
                        const isFirst = item === products[0];
                        const isLast = item === products[products.length - 1];
                        return (
                            <FinancialProductsItem
                                isFirst={isFirst}
                                isLast={isLast}
                                product={item}
                                onPress={() => { navigation.push('Details', { product: item }); }}
                            />
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: colors.border }} />}
                    keyExtractor={(item, index) => item.id + index}
                />
            )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    defaultContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});