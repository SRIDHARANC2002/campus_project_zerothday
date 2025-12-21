import { createTheme, alpha } from '@mui/material/styles';

// Corporate Professional Palette
const primaryMain = '#0A66C2'; // LinkedIn/Corporate Blue
const secondaryMain = '#455A64'; // Blue Grey
const successMain = '#057642'; // Dark Green
const warningMain = '#F5C75D'; // Muted Gold
const errorMain = '#CC1016'; // Professional Red
const backgroundDefault = '#F3F2EF'; // Light Grey Background
const textPrimary = '#191919'; // Near Black
const textSecondary = '#666666'; // Standard Grey

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: primaryMain,
            light: '#5890FF', // Lighter blue
            dark: '#004182', // Darker navy
            contrastText: '#ffffff',
        },
        secondary: {
            main: secondaryMain,
            light: '#718792',
            dark: '#1C313A',
            contrastText: '#ffffff',
        },
        background: {
            default: backgroundDefault,
            paper: '#ffffff',
        },
        text: {
            primary: textPrimary,
            secondary: textSecondary,
        },
        success: { main: successMain },
        warning: { main: warningMain },
        error: { main: errorMain },
    },
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        h1: { fontWeight: 700, color: textPrimary },
        h2: { fontWeight: 700, color: textPrimary },
        h3: { fontWeight: 600, color: textPrimary },
        h4: { fontWeight: 600, color: textPrimary },
        h5: { fontWeight: 600, color: textPrimary },
        h6: { fontWeight: 600, color: textPrimary },
        button: { textTransform: 'none', fontWeight: 600 },
        subtitle1: { color: textSecondary },
        body1: { lineHeight: 1.5, color: 'rgba(0, 0, 0, 0.9)' },
        body2: { lineHeight: 1.5, color: 'rgba(0, 0, 0, 0.6)' },
    },
    shape: {
        borderRadius: 8, // Slightly squarer for professional look
    },
    shadows: [
        'none',
        '0px 0px 0px 1px rgba(0,0,0,0.04), 0px 2px 4px rgba(0,0,0,0.08)', // 1: Card border/shadow mix
        '0px 0px 0px 1px rgba(0,0,0,0.06), 0px 4px 6px rgba(0,0,0,0.1)', // 2
        '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 6px 12px rgba(0,0,0,0.12)', // 3
        ...Array(22).fill('none'),
    ],
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: textPrimary,
                    borderBottom: '1px solid rgba(0,0,0,0.08)',
                    boxShadow: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 24, // Pill shape often used in modern corporate
                    padding: '6px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                        backgroundColor: alpha(primaryMain, 0.08),
                    },
                },
                contained: {
                    borderRadius: 24,
                    '&:hover': {
                        backgroundColor: '#004182',
                        boxShadow: 'none',
                    },
                },
                outlined: {
                    borderRadius: 24,
                    borderColor: textSecondary,
                    color: textSecondary,
                    '&:hover': {
                        borderColor: textPrimary,
                        backgroundColor: alpha(textPrimary, 0.04),
                        color: textPrimary,
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#004182', // Darker Navy
                    }
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.08), 0px 2px 4px rgba(0,0,0,0.04)', // Subtle border/shadow
                    transition: 'box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.1), 0px 4px 12px rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    borderRadius: 4,
                },
                filled: {
                    border: '1px solid transparent',
                },
                outlined: {
                    border: '1px solid rgba(0,0,0,0.12)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                        backgroundColor: '#ffffff',
                        '& fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(0, 0, 0, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: primaryMain,
                            borderWidth: 2,
                        },
                    },
                },
            },
        },
    },
});

export default theme;
