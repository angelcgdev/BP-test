import { useContext } from "react";
import { FinancialProduct } from "../../domain/entities/financialProduct";
import { useBPTheme } from "../../../common/components/ThemeProvider";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';


interface FinancialProductsItemProps {
    isLast?: boolean,
    isFirst?: boolean,
    onPress?: () => void,
    product: FinancialProduct,
}
export const FinancialProductsItem = ({ isFirst, isLast, onPress, product }: FinancialProductsItemProps) => {
    const borderRadius = 10;
    const firstBorder = isFirst ? borderRadius : 0;
    const lastBorder = isLast ? borderRadius : 0;
    const firstBorderStyle = {
        borderTopWidth: isFirst ? 1 : 0,
        borderTopLeftRadius: firstBorder,
        borderTopRightRadius: firstBorder,
    }
    const lastBorderStyle = {
        borderBottomLeftRadius: lastBorder,
        borderBottomRightRadius: lastBorder,
        borderBottomWidth: isLast ? 1 : 0,
    }
    const { colors } = useBPTheme();
    return (
        <View style={[styles.container, firstBorderStyle, lastBorderStyle, { borderColor: colors.border, }]}>
            <TouchableNativeFeedback onPress={onPress}>
                <View style={[styles.financialProductItemContainer]}>
                    <View style={styles.financialProductItemContentContainer}>
                        <Text style={styles.financialProductItemTitle}>{product.name}</Text>
                        <Text>ID: {product.id}</Text>
                    </View>
                    <Icon name="chevron-right" size={25} color={colors.border} />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        overflow: 'hidden',
    },
    financialProductItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
    },
    financialProductItemContentContainer: {
        gap: 5,
    },
    financialProductItemTitle: {
        fontSize: 16,
        fontWeight: '500',
    }
});