import React from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
//components
import {
    Box,
} from '@mui/material';

interface INoImageProps {
    size?: number;
}

const NoImage = (props: INoImageProps) => 
{
    const {
        size = 50,
    } = props;
    return (
        <NoImageBox
            style={{
                width: size + '%',
                height: size + '%',
            }}
        >
            <Image
                src={'/images/noimg-white.svg'}
                alt='noImage'
                fill
                priority
                style={{
                    objectFit: 'contain',
                }}
            />
        </NoImageBox>
    );
};

const NoImageBox = styled(Box)`
    position: relative;
`;

export default NoImage;