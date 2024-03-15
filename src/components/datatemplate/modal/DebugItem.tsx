import React from 'react';
import { styled } from '@mui/material/styles';
import { JsonViewer } from '@textea/json-viewer';
//context
import { useDTLayoutContext } from '../DTLayoutContext';
//components
import {
    Box,
} from '@mui/material';

const DebugItem = () => 
{
    //context
    const {
        templatePage,
        tmeplateRootOption,
        template,
    } = useDTLayoutContext();

    return (
        <JsonBox>
            <JsonViewer
                value={{
                    ...templatePage.state,
                    templateOption: tmeplateRootOption.state,
                    templateData: template.state,
                }}
            />
        </JsonBox>
    );
};

const JsonBox = styled(Box)`
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.light;
    }};
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.main;
    }};
    padding: 2rem;
    height: 560px;
    white-space: pre;
    font-size: 0.875rem;
    font-family: 'SF-Pro-Display';
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0.875rem;
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
        border: 3px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
        border-radius: 0.875rem;;
    }
    &::-webkit-scrollbar-button {
        display:none;
    }
`;

export default DebugItem;