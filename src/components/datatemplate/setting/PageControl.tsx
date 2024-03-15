import React from 'react';
import { styled } from '@mui/material/styles';
//context
import { useDTLayoutContext } from '../DTLayoutContext';
//components
import {
    Box, 
    Stack,
    Switch,
    FormControl,
    FormLabel,
} from '@mui/material';

const PageControl: React.FC = () => 
{
    //context
    const {
        tmeplateRootOption,
    } = useDTLayoutContext();

    return (
        <Area>
            <Wrap
                direction={'row'}
                spacing={2}
            >
                <Content
                    spacing={2}
                >
                    <FormControl>
                        <FormLabel>전체 너비</FormLabel>
                        <FormBox>
                            <Switch
                                checked={Boolean(tmeplateRootOption.state.fullwidth)}
                                onChange={(e,v) => 
                                {
                                    tmeplateRootOption.setState(prev => 
                                    {
                                        return {...prev, fullwidth: v};
                                    });
                                }}
                            />
                        </FormBox>
                    </FormControl>
                </Content>
            </Wrap>
        </Area>
    );
};

const Area = styled(Box)`
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

const Wrap = styled(Stack)`
    width: 100%;
    overflow: hidden;
`;

const Content = styled(Stack)`
    flex: 1;
`;

const FormBox = styled(Box)`
    margin-top: 0.5rem;
`;

export default PageControl;