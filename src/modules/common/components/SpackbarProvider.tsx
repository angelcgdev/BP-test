import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { SnackbarProps } from './BPSnackbar';
import { useBPTheme } from './ThemeProvider';

const defaultConfig: SnackbarProps = {
    message: "This is a custom Snackbar",
    actionText: "Dismiss",
    onActionPress: () => { },
    duration: 5000,
    position: "bottom",
    backgroundColor: "#2E67F8",
    textColor: "white",
    actionTextColor: "white",
    containerStyle: { marginHorizontal: 12 },
    messageStyle: {},
    actionTextStyle: {},
};

interface SnackbarProviderProps {
    state: {
        isVisible: boolean,
        config: SnackbarProps;
    }
    actions: {
        show: (config: Partial<SnackbarProps>) => void;
        dismiss: () => void;
    };
}

export const SnackbarContext = createContext<SnackbarProviderProps>({
    state: {
        config: defaultConfig,
        isVisible: false
    }, actions: {
        show: (config) => { },
        dismiss: () => { }
    }
});

export const useSnackbar = () => {
    const props = useContext(SnackbarContext);
    return props
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {

    const [isVisible, setIsVisible] = useState(false);
    const { colors, padding } = useBPTheme();
    const [config, setConfig] = useState<SnackbarProps>({ ...defaultConfig, backgroundColor: colors.seconday, containerStyle: { marginHorizontal: padding.sm } });
    const handleShow = (newconfig: Partial<SnackbarProps>) => {
        // if (newconfig) {
        setConfig({ ...config, ...newconfig });
        // }
        setIsVisible(true);
    }
    const handleDismiss = () => {
        setIsVisible(false);
    }


    useEffect(() => {
        if (isVisible) {
            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, config.duration);

            return () => clearTimeout(timeout);
        }
    }, [isVisible, config.duration]);

    return (
        <SnackbarContext.Provider value={{
            state: {
                config,
                isVisible
            }, actions: {
                show: handleShow,
                dismiss: handleDismiss
            }
        }}>
            {children}
        </SnackbarContext.Provider>
    )
}
