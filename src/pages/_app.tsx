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
            <MetaTag
                title={'Component Viewer Tool'}
            />
            <ThemeProvider theme={createMyTheme(false)}>
                <CssBaseline />
                <CommonLayout>
                    <Component {...pageProps} />
                </CommonLayout>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;
