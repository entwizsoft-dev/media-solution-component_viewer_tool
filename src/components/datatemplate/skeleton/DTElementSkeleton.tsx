import React from 'react';
import { styled } from '@mui/material/styles';
//
import DescriptionIcon from '@mui/icons-material/Description';
//components
import {
    Box,
    Typography,
} from '@mui/material';

const DTElementSkeleton = () => 
{
    return (
        <Area>
            <IconBox>
                <DescriptionIcon
                    fontSize='inherit'
                    color='inherit'
                />
            </IconBox>
            <Title
                variant='h5'
            >
                Create Data Form
            </Title>
        </Area>
    );
};

const Area = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`;

const IconBox = styled(Box)`
    font-size: 80px;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.light;
    }};
`;

const Title = styled(Typography)`
    margin-top: 4px;
    font-family: 'SF-Pro-Display';
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.light;
    }};
`;

export default DTElementSkeleton;