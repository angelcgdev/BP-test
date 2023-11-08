import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { useBPTheme } from "./ThemeProvider";

interface BPBaseButtonProps {
    onPress?: () => void;
    disabled?: boolean,
    title: string,
    loading?: boolean,
}


interface BaseButtonProps extends BPBaseButtonProps {
    backgroundColor: string,
    color: string,
}

function BaseButton(props: BaseButtonProps) {
    const { padding } = useBPTheme();
    return (
        <View style={{ borderRadius: 8, overflow: 'hidden' }}>
            <TouchableNativeFeedback onPress={props.onPress} >
                <View style={[styles.container, { backgroundColor: props.backgroundColor, padding: padding.sm }]}>
                    {
                        props.loading
                            ? <Text style={[styles.title, { color: props.color }]}>Cargando...</Text>
                            : <Text style={[styles.title, { color: props.color }]}>{props.title}</Text>
                    }
                </View>
            </TouchableNativeFeedback>

        </View>
    )
}
export function PrimaryButton(props: BPBaseButtonProps) {

    const { colors } = useBPTheme();
    return (
        <BaseButton {...props} backgroundColor={colors.primary} color={colors.onPrimary} />
    )
}
export function SecondaryButton(props: BPBaseButtonProps) {
    const { colors } = useBPTheme();
    return (
        <BaseButton {...props} backgroundColor={colors.surface} color={colors.onSurface} />
    )
}
export function DangerButton(props: BPBaseButtonProps) {
    const { colors } = useBPTheme();
    return (
        <BaseButton {...props} backgroundColor={colors.danger} color={colors.onDanger} />
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