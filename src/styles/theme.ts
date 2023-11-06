interface ThemeProps {
    colors: {
        background: string,
        onBackground: string,
        primary: string;
        onPrimary: string;
        seconday: string,
        onSecondary: string,
        surface: string;
        onSurface: string;
        error: string;
        onError: string;
        border: string;
        danger: string;
        onDanger: string;
    };
    padding: ThemeBreakPoints,
    gap: ThemeBreakPoints,
}

interface ThemeBreakPoints {
    xl: number,
    lg: number,
    md: number,
    sm: number,
}
export const BPTheme: ThemeProps = {
    colors: {
        background: 'white',
        onBackground: 'black',
        primary: '#ffdd00',
        onPrimary: '#60643b',
        seconday: '#374a77',
        onSecondary: 'white',
        surface: '#e7ebf2',
        onSurface: '#60643b',
        error: '#ec9595',
        onError: '#ffffff',
        border: '#C0C0C0',
        danger: 'red',
        onDanger: '#ffffff'
    },
    padding: {
        sm: 15,
        lg: 20,
        md: 25,
        xl: 30,
    },
    gap: {
        sm: 10,
        lg: 15,
        md: 20,
        xl: 25,
    }
}