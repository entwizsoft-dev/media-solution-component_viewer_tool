import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
//type
import {
    IAsideListDataProps,
} from '@/interfaces/aside.interface';
import { IDistributorAccountProps } from '@/interfaces/distributor.interface';
//components
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import MappingIcon from '@/components/MappingIcon';

interface INavItemProps extends IAsideListDataProps {
    asideDrawerState?: boolean;
    adminInfo: IDistributorAccountProps | null;
}

const NavItem: React.FC<INavItemProps> = (props) => 
{
    const {
        label,
        focus,
        icon,
        link,
        ACL,
        newTab,
        asideDrawerState,
        adminInfo,
    } = props;

    //router
    const router = useRouter();
    const { pathname, asPath } = router;
    //state
    const [active, setActive] = useState(pathname.includes(focus as string));
    const [isVisible, setIsVisible] = useState<boolean>(asideDrawerState || false);

    useEffect(() => 
    {
        if(typeof focus === 'string')
        {
            const at = pathname.includes(focus);
            const bt = asPath.includes(focus);
            
            setActive(at || bt);
        }
    }, [focus,pathname,asPath]);

    useEffect(()=>
    {
        let timer: ReturnType<typeof setTimeout>;
        
        if(asideDrawerState)
        {
            timer = setTimeout(() => 
            {
                setIsVisible(true);
            }, 200);
        }
        else 
        {
            setIsVisible(false);
        }

        return () => 
        {
            clearTimeout(timer);
        };
    }, [asideDrawerState]);

    return (
        <React.Fragment>
            {
                adminInfo && adminInfo.authority <= ACL &&
                    <ListItem
                        selected={active}
                        sx={{
                            display: asideDrawerState ? 'flex' : 'flex',
                            justifyContent: asideDrawerState ?'flex-start' :'center',
                        }}
                        onClick={() => 
                        {
                            if(typeof link === 'string' && link.length > 0)
                            {
                                if(newTab)
                                {
                                    window.open(link);
                                }
                                else
                                {
                                    return router.push(link);
                                }
                            }
                        }}
                    >
                        {
                            <IConItem
                                sx={{
                                    paddingLeft: asideDrawerState ? '0px' : '0px !important',
                                    paddingRight: asideDrawerState ? '16px' : '0px !important',
                                    marginRight: asideDrawerState ? '0px' : '0px !important',
                                }}
                            >
                                <MappingIcon
                                    icon={icon ? icon : 'ArrowRightIcon'}
                                />
                            </IConItem>
                        }
                        {
                            isVisible &&
                                <TextItem
                                    disableTypography
                                    primary={label}
                                    sx={{
                                        opacity: isVisible ? 1 : 0,
                                        animation: 'fadeIn 0.1s ease-in-out',
                                    }}
                                />
                        }
                    </ListItem>
            }
        </React.Fragment>
    );
};

const ListItem = styled(ListItemButton)`
    &.MuiButtonBase-root:hover,
    &.Mui-selected {
        background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.main;
    }};

        & .MuiListItemIcon-root {
            color: ${({theme}) => 
    {
        return theme.palette.typoColor.main;
    }};
        }
        & .MuiListItemText-root {
            color: ${({theme}) => 
    {
        return theme.palette.typoColor.main;
    }};
            font-weight: 700;
        }
    }
`;

const IConItem = styled(ListItemIcon)`
    
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.light;
    }};
    &.mui-style-1jkvcnv-MuiButtonBase-root-MuiListItemButton-root{
        justify-content: center !important;
    };
    justify-content: center !important;
`;

const TextItem = styled(ListItemText)`
    margin: 0;
    font-size: 0.75rem;
    font-weight: 500;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.light;
    }};
    @keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
`;

export default NavItem;