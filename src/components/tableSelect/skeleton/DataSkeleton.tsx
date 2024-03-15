import React from 'react';
import { styled } from '@mui/material/styles';
//icon
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
//components
import {
    Box,
    Typography,
    CircularProgress,
} from '@mui/material';

const DataSkeleton = () => 
{
    return (
        <>
            <Left/>
            <IconBox>
                <ArrowIcon/>
            </IconBox>
            <Right/>
            <BackDropBox>
                <LoaidngIcon
                    size={60}
                />
                <LoadingText>
                    데이터 업데이트중...
                </LoadingText>
            </BackDropBox>
        </>
    );
};

const Left = styled(Box)`
    flex: 1;
    height: 100%;
    aspect-ratio: 3/4;
    border: 1px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
    border-radius: 6px;
    box-sizing: border-box;
    overflow: hidden;
`;

const Right = styled(Box)`
    flex: 1;
    height: 100%;
    border: 1px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
    border-radius: 6px;
    box-sizing: border-box;
    overflow: hidden;
`;

const IconBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
`;

const ArrowIcon = styled(ArrowRightAltIcon)`
    font-size: 40px;
    color: ${({theme}) => 
    {
        return theme.palette.svgColor.main;
    }};
`;

const BackDropBox = styled(Box)`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.dark;
    }};
    opacity: 0.6;
    z-index: 999;
`;

const LoaidngIcon = styled(CircularProgress)`
    color: ${({theme}) => 
    {
        return theme.palette.circularTheme.main;
    }};
`;

const LoadingText = styled(Typography)`
    margin-top: 1rem;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.origin;
    }};
`;

export default DataSkeleton;