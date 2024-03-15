import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import axiosGuard from '@/utils/axiosGuard';
import axiosResponseProcessor from '@/utils/axiosResponseProcessor';
//redux
import { useSelector } from 'react-redux';
//type
import {
    IAsideDataRowsProps,
} from '@/interfaces/aside.interface';
import { IDistributorAccountProps } from '@/interfaces/distributor.interface';
import { IGeneralDBDataProps } from '@/pages/setting/general';
//components
import {
    Box,
    Drawer,
    Toolbar,
    Divider,
    Typography,
    CircularProgress,
} from '@mui/material';
import NavGroup from './navigation/NavGroup';

interface IAsideProps<T> {
    asideData: T[] | null;
}

const Aside = <T extends IAsideDataRowsProps>(props: IAsideProps<T>) => 
{
    const {
        asideData,
    } = props;
    //redux
    const asideDrawerState = useSelector((state: {asideMode: { open: boolean } }) => 
    {
        return state.asideMode.open;
    });
    //state
    const [adminInfo, setAdminInfo] = useState<IDistributorAccountProps | null>(null);
    const [navMenuData, setNavMenuData] = useState<T[] | null>(null); //aside 메뉴 데이터
    const [logo, setLogo] = useState<string | null>(null); //전역 설정 로고 이미지

    useEffect(() => 
    {
        axiosGuard.get('/config/general')
            .then((res) => 
            {
                axiosResponseProcessor<IGeneralDBDataProps>(res, {
                    successCallback(d) 
                    {
                        setLogo(d.logo ? d.logo[0] : null);
                    },
                });
            })
            .catch((error) => 
            {
                console.error(error);
            });
    }, []);

    //aside data update (설정 페이지에 따른 부모측에서 데이터 전달 받는 방식)
    useEffect(() => 
    {
        setNavMenuData(asideData);
    }, [asideData]);

    useEffect(() => 
    {
        axiosGuard.get('/admin/info')
            .then((res) => 
            {
                axiosResponseProcessor<IDistributorAccountProps>(res, {
                    successCallback(d) 
                    {
                        setAdminInfo(d);
                    },
                });
            })
            .catch((error) => 
            {
                console.error(error);
            });
    }, []);

    return (
        <AsideArea
            variant="permanent"
            anchor="left"
            open={asideDrawerState}
        >
            <AsideWrap>
                <Toolbar
                    sx={{
                        py: 1,
                    }}
                >
                    <Link
                        href={'/'}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <LogoBox>
                            {
                                logo &&
                                    <Image
                                        src={logo}
                                        alt='logo'
                                        fill
                                        sizes='100%'
                                        style={{objectFit: 'contain'}}
                                        priority={true}
                                    />
                            }
                        </LogoBox>
                    </Link>
                </Toolbar>
                <DividerItem/>
                {
                    navMenuData ?
                        navMenuData.map((d,i) => 
                        {
                            return (
                                <Box
                                    key={i}
                                    sx={{
                                        px: 2,
                                    }}
                                >
                                    <NavGroup
                                        asideDrawerState={asideDrawerState}
                                        adminInfo={adminInfo}
                                        {...d}
                                    />
                                    {
                                        i !== (navMenuData.length - 1) &&
                                            <DividerItem/>
                                    }
                                </Box>
                            );
                        })
                        :
                        <LoadingMenu>
                            <CircularProgressLoading
                                size={50}
                            />
                        </LoadingMenu>
                }
            </AsideWrap>
            <VersionWrap>
                <TypographyArea
                    variant='caption'
                >
                    {
                        asideDrawerState &&
                        'version '
                    }
                    {process.env.NEXT_PUBLIC_VERSION}
                </TypographyArea>
            </VersionWrap>
        </AsideArea>
    );
};

const drawerWidth = 230;

const openedMixin = (theme: Theme): CSSObject => 
{
    return {
        width: drawerWidth,
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    };
};
const closedMixin = (theme: Theme): CSSObject => 
{
    return {
        transition: theme.transitions.create('all', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // opacity:0,
        overflowX: 'hidden',
        width: `calc(${theme.spacing(7)} + 1px)`,
        [theme.breakpoints.up('sm')]: {
            width: `calc(${theme.spacing(8)} + 1px)`,
        },
    };
};

const AsideArea = styled(Drawer, { shouldForwardProp: (prop) => 
{
    return prop !== 'open';
} })`
${(props) => 
    {
        return (props.open ? openedMixin(props.theme) : closedMixin(props.theme));
    }}
    // width: 230px;
    & .MuiDrawer-paper {
        // width: 230px;
        width:inherit;
        background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.light;
    }};
        box-sizing: border-box;
    }
    
`;

const AsideWrap = styled(Box)`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0.75rem;
    }
    &::-webkit-scrollbar-track {
        background-color: ${({theme}) => 
    {
        return theme.palette.dividerTheme.main;
    }};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
        border: 2px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
        border-radius: 0.75rem;;
    }
    &::-webkit-scrollbar-button {
        display:none;
    }
`;

const LoadingMenu = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const DividerItem = styled(Divider)`
    background-color: ${({theme}) => 
    {
        return theme.palette.dividerTheme.main;
    }};
`;

const CircularProgressLoading = styled(CircularProgress)`
    color: ${({theme}) => 
    {
        return theme.palette.circularTheme.main;
    }};
`;

const TypographyArea = styled(Typography,{ shouldForwardProp: (prop) => 
{
    return prop !== 'open';
} })`
    font-family: 'SF-Pro-Display';
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.light;
    }};
`;

const VersionWrap = styled(Box)`
    padding: 0.5rem 1rem;
`;

const LogoBox = styled(Box)`
    position: relative;
    width: 100%;
    height: 100%;
`;

export default Aside;