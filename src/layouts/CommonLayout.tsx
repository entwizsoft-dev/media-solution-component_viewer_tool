
import React from 'react';
import { styled } from '@mui/material/styles';
//components
import {
    Box,
    Paper,
} from '@mui/material';

interface ICommonLayout {
    children: React.ReactNode;
}

const CommonLayout: React.FC<ICommonLayout> = (props) => 
{
    const {
        children,
    } = props;

    return (
        <Area>
            <ContentsWrap>
                <PaperArea
                    elevation={0}
                >
                    {children}
                </PaperArea>
            </ContentsWrap>
        </Area>
    );
};

const Area = styled(Box)`
    position: relative;
    display: flex;
    min-height: 100%;
`;

const PaperArea = styled(Paper)`
    flex: 1;
    background-color : ${({theme}) => 
    {
        return theme.palette.backgroundTheme.origin;
    }};
`;

const ContentsWrap = styled(Box)`
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 100%;
`;

export default CommonLayout;