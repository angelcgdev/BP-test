import React, { ReactNode, createContext, useContext, useEffect } from 'react'
import { BPTheme } from '../../../styles/theme'
import { Appearance } from 'react-native';


export const ThemeContext = createContext(BPTheme);
export const useBPTheme = () => useContext(ThemeContext);
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        Appearance.setColorScheme('light');
    }, [])

    return (
        <ThemeContext.Provider value={BPTheme}>
            {children}
        </ThemeContext.Provider>
    )
}
