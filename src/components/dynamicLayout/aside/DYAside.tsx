import React from 'react';
import { styled } from '@mui/material/styles';
//context
import { useDYLayoutContext } from '../DYLayoutContext';
//components
import {
    Box,
    Stack,
    Paper,
    Typography,
} from '@mui/material';
import DYListTab from './DYListTab';
import DYElementBridgeList from './bridge/DYElementBridgeList';
import DYElementOptionList from './options/DYElementOptionList';
import DYElementItemOptionList from './options/DYElementItemOptionList';

const DYAside = () => 
{
    //context
    const {
        asideWidth,
    } = useDYLayoutContext();

    return (
        <Area
            sx={{
                width: `${asideWidth}px`,
            }}
        >
            <Wrap>
                <Head>
                    <Title
                        variant='h6'
                    >
                        Options Preview
                    </Title>
                </Head>
                <Body>
                    <DYListTab
                        title='Content Bridge Keys'
                        defaultOpen={true}
                    >
                        <DYElementBridgeList/>
                    </DYListTab>
                    <DYListTab
                        title='Element Options'
                        defaultOpen={true}
                    >
                        <DYElementOptionList/>
                    </DYListTab>
                    <DYListTab
                        title='Element Item Options'
                        defaultOpen={true}
                    >
                        <DYElementItemOptionList/>
                    </DYListTab>
                </Body>
            </Wrap>
        </Area>
    );
};

const Area = styled(Paper)`
    position: relative;
    height: 100%;
`;

const Wrap = styled(Stack)`
    height: 100%;
    overflow: hidden;
`;

const Head = styled(Box)`
    display: flex;
    align-items: center;
    padding: 0.625rem 1rem;
    overflow: hidden;
`;

const Body = styled(Box)`
    position: relative;
    flex: 1;
    height: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0.875rem;
    }
    &::-webkit-scrollbar-track {
        background-color: ${({theme}) => 
    {
        return theme.palette.scrollbarTrack.main;
    }};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => 
    {
        return theme.palette.scrollbarThumb.main;
    }};
        border: 3px solid ${({theme}) => 
    {
        return theme.palette.scrollbarThumb.main;
    }};
        border-radius: 0.875rem;;
    }
    &::-webkit-scrollbar-button {
        display:none;
    }
`;

const Title = styled(Typography)`
    flex: 1;
    font-family: 'SF-Pro-Display';
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

export default DYAside;