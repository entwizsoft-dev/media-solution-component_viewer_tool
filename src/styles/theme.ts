import { createTheme } from '@mui/material/styles';
//palette
import { lightPalette } from './palette/light';
import { darkPalette } from './palette/dark';

/*
    팔렛트 색상 추가 시 /types/theme.d.ts 파일 안에 있는 paletteList 배열에 컬리 제목 추가
*/

export const createMyTheme = (isDarkMode: boolean) => 
{
    const darkModePalette = isDarkMode ? darkPalette : {};

    const myTheme = createTheme({
        components : {
            MuiPaper: {
                styleOverrides: {
                    root: ({theme}) => 
                    {
                        return {
                            backgroundColor: theme.palette.backgroundTheme.light,
                        };
                    },
                    elevation0: {
                        boxShadow: 'rgba(0, 0, 0, 0.06) 0px 6px 16px',
                    },
                    elevation6: {
                        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 6px 32px',
                    },
                    
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: '16px',
                        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
                    },
                },
            },
            MuiCardHeader: {
                styleOverrides: {
                    root: ({theme}) => 
                    {
                        return {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.typoColor.origin,
                            fontSize: '24px',
                            fontWeight: 'bold',
                        };
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: 0,
                        marginRight: '16px',
                    },
                },
            },
            MuiTabs: {
                styleOverrides: {
                    root: ({theme}) => 
                    {
                        return {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.typoColor.origin,
                        };
                    },
                    indicator: ({theme}) => 
                    {
                        return {
                            backgroundColor: theme.palette.primary.main,
                        };
                    },
                },
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        color: 'rgba(255,255,255,0.7)',
                        '&.Mui-selected': {
                            color: '#fff',
                        },
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    head: ({theme}) => 
                    {
                        return {
                            padding: '16px 24px',
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.typoColor.origin,
                        };
                    },
                    body: {
                        padding: '14px 24px',
                        lineHeight: '1',
                    },
                },
            },
            MuiAvatar: {
                styleOverrides: {
                    root: {
                        borderRadius: '12px',
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(145, 158, 171, 0.32)',
                        },
                    },
                },
            },
            MuiAccordionDetails: {
                styleOverrides: {
                    root: {
                        padding: '16px',
                    },
                },
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: ({theme}) => 
                    {
                        return {
                            '&.Mui-expanded': {
                                minHeight: '56px',
                                '& .MuiAccordionSummary-content': {
                                    margin: '17px 0',
                                    '& .MuiTypography-root': {
                                        fontSize: '0.875rem',
                                        color: theme.palette.typoColor.light,
                                    },
                                },
                            },
                            backgroundColor: theme.palette.backgroundTheme.main,
                            '& .MuiAccordionSummary-expandIconWrapper': {
                                color: theme.palette.typoColor.light,
                            },
                            '& .MuiAccordionSummary-content': {
                                '& .MuiTypography-root': {
                                    fontSize: '0.875rem',
                                    color: theme.palette.typoColor.light,
                                    transition: 'color 0.25s',
                                },
                            },
                        };
                    },
                },
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        color: 'rgb(145, 158, 171)',
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: ({theme}) => 
                    {
                        return {
                            width: 42,
                            height: 26,
                            padding: 0,
                            '& .MuiSwitch-switchBase': {
                                padding: 0,
                                margin: 3,
                                transitionDuration: '300ms',
                                '&.Mui-checked': {
                                    transform: 'translateX(16px)',
                                    color: theme.palette.switchColor.main,
                                    '& + .MuiSwitch-track': {
                                        opacity: 1,
                                        border: 0,
                                        backgroundColor : theme.palette.switchBackgroundColor.main,
                                    },
                                    '&.Mui-disabled + .MuiSwitch-track': {
                                        opacity: 0.5,
                                    },
                                },
                                '&.Mui-focusVisible .MuiSwitch-thumb': {
                                    color: '#33cf4d',
                                    border: '6px solid #fff',
                                },
                            },
                            '& .MuiSwitch-thumb': {
                                boxSizing: 'border-box',
                                width: 20,
                                height: 20,
                            },
                            '& .MuiSwitch-track': {
                                borderRadius: 26 / 2,
                            },
                        };
                    },
                },
            },
            MuiFormControl: {
                styleOverrides: {
                    root: ({theme}) => 
                    {
                        return {
                            '& .MuiFormLabel-root.Mui-focused': {
                                color: theme.palette.typoColor.light,
                            },
                        };
                    },
                },
            },
        },
        typography: {
            fontFamily: [
                'NotoSansKR',
                'sans-serif',
            ].join(','),
        },
        palette: {
            ...lightPalette,
            ...darkModePalette,
            mode: isDarkMode ? 'dark': 'light',
            tonalOffset: 0.25,
        },
    });

    const dynamicColor = myTheme.palette.typoColor.dark;

    const resultTheme = createTheme({
        ...myTheme,
        typography: {
            ...myTheme.typography,
            allVariants : {
                color : dynamicColor,
            },
        },
    });

    return resultTheme;
};