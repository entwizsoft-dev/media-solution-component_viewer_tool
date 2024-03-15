import React from 'react';
import NextLink from 'next/link';
//type
import HomeIcon from '@mui/icons-material/Home';
//components
import {
    Box,
    Button,
    SvgIcon,
    Typography,
} from '@mui/material';

const Custom500 = () => 
{
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100%',
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    align="center"
                    variant="h2"
                >
                    500 에러 페이지 입니다.
                </Typography>
                <Button
                    component={NextLink}
                    href="/"
                    startIcon={(
                        <SvgIcon fontSize="small">
                            <HomeIcon />
                        </SvgIcon>
                    )}
                    sx={{ mt: 3 }}
                    variant="contained"
                >
                    홈으로 가기
                </Button>
            </Box>
        </Box>
    );
};

export const getStaticProps = async () => 
{
    return {
        props: {
            layout: 'error',
        },
    };
};

export default Custom500;