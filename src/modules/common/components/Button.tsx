import { useContext } from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { ThemeContext } from "./ThemeProvider";

interface BaseButtonProps {
    onPress?: () => void;
    disabled?: boolean,
    title: string,
    loading?: boolean,
}
export function PrimaryButton(props: BaseButtonProps) {

    const { colors, padding } = useContext(ThemeContext);
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={[styles.container, { backgroundColor: colors.primary, padding: padding.sm }]}>
                <Text style={[styles.title, { color: colors.onPrimary }]}>{props.title}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}
export function SecondaryButton(props: BaseButtonProps) {
    const { colors, padding } = useContext(ThemeContext);
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={[styles.container, { backgroundColor: colors.surface, padding: padding.sm }]}>
                <Text style={[styles.title, { color: colors.onSurface }]}>{props.title}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}
export function DangerButton(props: BaseButtonProps) {
    const { colors, padding } = useContext(ThemeContext);
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={[styles.container, { backgroundColor: colors.danger, padding: padding.sm }]}>
                <Text style={[styles.title, { color: colors.onDanger }]}>{props.title}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    title: {
        fontWeight: '700',
    }
})