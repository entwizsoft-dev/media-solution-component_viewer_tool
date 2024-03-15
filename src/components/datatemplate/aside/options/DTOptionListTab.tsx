import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
//icon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//components
import {
    Box,
    ListItemButton,
    ListItemText,
    Collapse,
} from '@mui/material';

interface IDTOptionListTabPorps {
    title?: string;
    defaultOpen?: boolean;
    children?: React.ReactNode;
}

const DTOptionListTab: React.FC<IDTOptionListTabPorps> = (props) => 
{
    const {
        title,
        defaultOpen,
        children,
    } = props;
    //state
    const [open, setOpen] = useState<boolean>(defaultOpen || false);

    return (
        <>
            <ItemHead
                onClick={() => 
                {
                    setOpen(prev => 
                    {
                        return !prev;
                    });
                }}
            >
                <ItemText
                    disableTypography
                    primary={title || 'title'}
                />
                {
                    open ?
                        <ExpandLess />
                        :
                        <ExpandMore />
                }
            </ItemHead>
            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
            >
                {
                    children &&
                        <ItemBox>
                            {children}
                        </ItemBox>
                }
            </Collapse>
        </>
    );
};

const ItemHead = styled(ListItemButton)`
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.main;
    }};

    &:hover {
        background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.dark;
    }};
    }
`;

const ItemText = styled(ListItemText)`
    font-size: 0.75rem;
    color: ${({theme})=>
    {
        return theme.palette.typoColor.light;
    }};
`;

const ItemBox = styled(Box)`
    padding: 0.5rem 0;
`;

export default DTOptionListTab;