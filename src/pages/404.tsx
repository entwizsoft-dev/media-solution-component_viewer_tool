import React from 'react';
import NextLink from 'next/link';
//icon
import HomeIcon from '@mui/icons-material/Home';
//components
import {
    Box,
    Button,
    Container,
    SvgIcon,
    Typography,
} from '@mui/material';

const Custom404 = () => 
{
    return (
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%',
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            mb: 1,
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            align="center"
                            sx={{ mb: 1 }}
                            variant="h1"
                        >
                            404
                        </Typography>
                    </Box>
                    <Typography
                        align="center"
                        sx={{ mb: 1 }}
                        variant="h4"
                    >
                        페이지를 찾을 수 없습니다.
                    </Typography>
                    <Typography
                        align="center"
                        color="text.secondary"
                        variant="body1"
                    >
                        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
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
            </Container>
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

export default Custom404;