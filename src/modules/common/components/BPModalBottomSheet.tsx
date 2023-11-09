import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    PanResponder,
    StyleSheet,
    View,
} from 'react-native';
import { useBPTheme } from './ThemeProvider';
import { delay } from '../../../utils/delay';

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
    const [overlayVisible, setOverlayVisible] = useState(false);
    const animationDuration = 300;
    const resetPositionAnim = Animated.timing(panY, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
    });

    const closeAnim = Animated.timing(panY, {
        toValue: screenHeight,
        duration: animationDuration,
        useNativeDriver: true,
    });

    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const handleDismiss = () => closeAnim.start(props.onDismiss);

    useEffect(() => {
        if (props.visible) {
            setOverlayVisible(true);
            resetPositionAnim.start();
        } else {
            closeAnim.start(() => {
                setOverlayVisible(false);
            });
        }
    }, [props.visible]);

    return (
        <Modal
            animationType="fade"
            visible={overlayVisible}
            transparent
            onRequestClose={handleDismiss}>
            <View style={styles.overlay}>
                <Animated.View
                    style={{
                        ...styles.container,
                        transform: [{ translateY: translateY }],
                    }}
                    >
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