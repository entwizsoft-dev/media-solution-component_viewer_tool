import React from 'react';
import { styled } from '@mui/material/styles';
//context
import { useDTLayoutContext } from '../DTLayoutContext';
//icon
import CloseIcon from '@mui/icons-material/Close';
//components
import {
    Box,
    Stack,
    Paper,
    Typography,
    IconButton,
} from '@mui/material';
import DTOptionList from './options/DTOptionList';

const DTAside = () => 
{
    //context
    const {
        focusItem,
        optionAside,
        optionAsideWidth,
    } = useDTLayoutContext();
        
    //element aside 창 닫기
    const closeAside = () => 
    {
        focusItem.setState(null);
        optionAside.setState(false);
    };

    return (
        <Area
            sx={{
                width: `${optionAsideWidth}px`,
            }}
        >
            <Wrap>
                <Head>
                    <Title
                        variant='h6'
                    >
                        Element Option
                    </Title>
                    <IconButton
                        onClick={closeAside}
                    >
                        <CloseIconStyle/>
                    </IconButton>
                </Head>
                <Body>
                    <DTOptionList/>
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
    overflow: hidden;
`;

const Title = styled(Typography)`
    flex: 1;
    font-family: 'SF-Pro-Display';
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const CloseIconStyle = styled(CloseIcon)`
    width: 24px;
    height: 24px;
`;

export default DTAside;