import React from 'react';
import { styled } from '@mui/material/styles';
//context
import { useDYLayoutContext } from '../DYLayoutContext';
//components
import {
    Box,
} from '@mui/material';
import PartMapping from '../factoryElements/PartMapping';


const DYBoard: React.FC = () => 
{
    //context
    const {
        asideState,
        asideWidth,
    } = useDYLayoutContext();

    return (
        <Area
            sx={{
                width: asideState ? `calc(100% - ${asideWidth}px)` : '100%',
            }}
        >
            {
                <Wrap>
                    <Contents>
                        <PartMapping/>
                    </Contents>
                </Wrap>
            }
        </Area>
    );
};

const Area = styled(Box)`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    box-sizing: border-box;
    transition-duration: 0.3s;
    transition-property: width;
    overflow: hidden;
`;

const Wrap = styled(Box)`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 36px 24px;
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

const Contents = styled(Box)`
    position: relative;
`;

export default DYBoard;