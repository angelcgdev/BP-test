import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, StyleProp, TextStyle, ColorValue } from "react-native";
import { useSnackbar } from "./SpackbarProvider";
export interface SnackbarProps {
    message: string,
    actionText: string,
    onActionPress: () => void,
    duration: number,
    position: "bottom" | "top",
    containerStyle: StyleProp<ViewStyle>,
    messageStyle: StyleProp<TextStyle>,
    actionTextStyle: StyleProp<TextStyle>,
    backgroundColor?: ColorValue,
    textColor?: ColorValue,
    actionTextColor?: ColorValue,
}
const Snackbar = () => {
    const { state: { config, isVisible } } = useSnackbar();
    const {
        message,
        actionText,
        onActionPress,
        position,
        containerStyle,
        messageStyle,
        actionTextStyle,
        backgroundColor,
        textColor,
        actionTextColor,
    } = config;

    return isVisible ? (
        <View
            style={[
                styles.container,
                position === "top" ? styles.topContainer : styles.bottomContainer,
                containerStyle,
                { backgroundColor: backgroundColor },
            ]}
        >
            <Text style={[styles.messageText, messageStyle, { color: textColor }]}>
                {message}
            </Text>
            {actionText && (
                <TouchableOpacity onPress={onActionPress}>
                    <Text
                        style={[
                            styles.actionText,
                            actionTextStyle,
                            { color: actionTextColor },
                        ]}
                    >
                        {actionText}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    ) : <></>;
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        left: 0,
        right: 0,
    },
    topContainer: {
        top: 15,
    },
    bottomContainer: {
        bottom: 15,
    },
    messageText: {
        fontSize: 16,
    },
    actionText: {
        marginLeft: 8,
        fontSize: 14,
    },
});

export default Snackbar;
