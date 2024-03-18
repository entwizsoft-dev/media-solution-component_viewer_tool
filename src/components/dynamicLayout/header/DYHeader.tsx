import React from 'react';
import { styled } from '@mui/material/styles';
import downloadFile from '@/utils/downloadFile';
//components
import {
    Box,
    AppBar,
    Typography,
    ButtonGroup,
    Button,
} from '@mui/material';

const DYHeader: React.FC = () => 
{

    return (
        <>
            <Head
                position='absolute'
            >
                <LeftControlBox>
                    <LeftControlGtoup
                        disableElevation
                        variant="text"
                        color='info'
                    >
                        <ControlIcon
                            onClick={async () => 
                            {
                                try 
                                {
                                    await downloadFile('/api/exportFileDownload');
                                }
                                catch (error) 
                                {
                                    
                                }
                            }}
                        >
                            <Typography variant='button'>파일 저장</Typography>
                        </ControlIcon>
                    </LeftControlGtoup>
                </LeftControlBox>
                <TitleWrap>
                    <TitleBox>
                        <Title
                            variant='button'
                        >
                            컴포넌트 테스트 영역
                        </Title>
                    </TitleBox>
                </TitleWrap>
                <RightControlBox/>
            </Head>
        </>
    );
};

const Head = styled(AppBar)`
    flex-direction: row;
    height: 36px;
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.origin;
    }};
`;

const LeftControlBox = styled(Box)`
    flex-basis: 30%;
`;

const LeftControlGtoup = styled(ButtonGroup)`
    height: 100%;

    & > .MuiButtonGroup-grouped {
        border-color: transparent;
    }
`;

const ControlIcon = styled(Button)`
    padding: 0 0.875rem;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.main;
    }};
`;

const TitleWrap = styled(Box)`
    flex-basis: 40%;
`;

const TitleBox = styled(Box)`
    flex-grow: 1;
    height: 100%;
`;

const Title = styled(Typography)`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const RightControlBox = styled(Box)`
    flex-basis: 30%;
`;

export default DYHeader;