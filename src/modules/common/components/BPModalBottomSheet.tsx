import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    StyleSheet,
    View,
} from 'react-native';
import { useBPTheme } from './ThemeProvider';

interface BPBottomModalSheetProps {
    onDismiss?: () => void;
    visible?: boolean,
    content: ReactNode
    actions?: ReactNode
    header?: ReactNode
}
export function BPBottomModalSheet(props: BPBottomModalSheetProps) {

    const { colors, padding, gap } = useBPTheme();
    const screenHeight = Dimensions.get('screen').height;
    const panY = useRef(new Animated.Value(screenHeight)).current;

    const resetPositionAnim = Animated.timing(panY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
    });

    const closeAnim = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 500,
        useNativeDriver: true,
    });

    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const handleDismiss = () => closeAnim.start(props.onDismiss);

    useEffect(() => {
        resetPositionAnim.start();
    }, [resetPositionAnim]);

    const panResponders = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderMove: Animated.event([null, { dy: panY }], {
                useNativeDriver: false,
            }),
            onPanResponderRelease: (_, gs) => {
                if (gs.dy > 0 && gs.vy > 2) {
                    return handleDismiss();
                }
                return resetPositionAnim.start();
            },
        }),
    ).current;

    return (
        <Modal
            animated
            animationType="fade"
            visible={props.visible}
            transparent
            onRequestClose={handleDismiss}>
            <View style={styles.overlay}>
                <Animated.View
                    style={{
                        ...styles.container,
                        transform: [{ translateY: translateY }],
                    }}
                    {...panResponders.panHandlers}>
                    <View style={[styles.header, { padding: padding.sm }]}>
                        {
                            (props.header)
                                ? props.header
                                : <View style={styles.sliderIndicator} />
                        }
                    </View>
                    <View style={[{ height: 1, width: '100%', backgroundColor: colors.border }]} />
                    <View style={{ padding: padding.sm }}>
                        {props.content}
                    </View>
                    {props.actions && <View style={[{ height: 1, width: '100%', backgroundColor: colors.border }]} />}
                    <View style={[{ gap: gap.sm, padding: padding.sm }]}>
                        {props.actions}
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: 'white',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        minHeight: 200,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderIndicator: {
        backgroundColor: '#CECECE',
        height: 4,
        width: 45,
    },
});