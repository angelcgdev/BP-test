import React, { ReactNode, createContext } from 'react'
import { BPTheme } from '../../../styles/theme'


export const ThemeContext = createContext(BPTheme);
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeContext.Provider value={BPTheme}>
            {children}
        </ThemeContext.Provider>
    )
}
