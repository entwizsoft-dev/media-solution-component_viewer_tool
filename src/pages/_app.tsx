import React from 'react';
//types
import { CacheProvider, EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';
//head
import MetaTag from '@/components/seo/MetaTag';
//css
import '@/styles/global.css';
import '@/styles/datepicker.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createMyTheme } from '@/styles/theme';
//redux
import { Provider } from 'react-redux';
import store from '../store';
//time
import 'moment-timezone';
//components
import CommonLayout from '@/layouts/CommonLayout';
//ssr
import createEmotionCache from '@/utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const MyApp = ({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: MyAppProps) => 
{

    return (
        <CacheProvider value={emotionCache}>
            <Provider
                store={store}
            >
                <MetaTag
                    title={'Component Viewer'}
                />
                <ThemeProvider theme={createMyTheme(false)}>
                    <CssBaseline />
                    <CommonLayout>
                        <Component {...pageProps} />
                    </CommonLayout>
                </ThemeProvider>
            </Provider>
        </CacheProvider>
    );
};

export default MyApp;
