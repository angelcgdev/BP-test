import { useContext } from "react";
import { FinancialProduct } from "../../domain/entities/financialProduct";
import { ThemeContext } from "../../../common/components/ThemeProvider";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";

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
    const { colors } = useContext(ThemeContext);
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={[styles.financialProductItemContainer, firstBorderStyle, lastBorderStyle, { borderColor: colors.border }]}>
                <View style={styles.financialProductItemContentContainer}>
                    <Text style={styles.financialProductItemTitle}>{product.name}</Text>
                    <Text>ID: {product.id}</Text>
                </View>
                <Text>{'>'}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}


const styles = StyleSheet.create({
    financialProductItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        justifyContent: 'space-between',
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    financialProductItemContentContainer: {
        gap: 5,
    },
    financialProductItemTitle: {
        fontSize: 16,
        fontWeight: '500',
    }
});