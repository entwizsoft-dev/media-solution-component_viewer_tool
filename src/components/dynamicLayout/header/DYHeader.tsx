import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
//context
import { useDYLayoutContext } from '../DYLayoutContext';
//components
import {
    Box,
    AppBar,
    Typography,
    ButtonGroup,
    Button,
    Popover,
} from '@mui/material';
import DTHeaderPopover from '@/components/datatemplate/header/DTHeaderPopover';

const DYHeader: React.FC = () => 
{
    //context
    const {
        
    } = useDYLayoutContext();
    //state
    const [debugEl, setDebugEl] = useState<HTMLButtonElement | null>(null); //디버그 메뉴

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
                            onClick={(e) => 
                            {
                                setDebugEl(e.currentTarget);
                            }}
                        >
                            <Typography variant='button'>디버깅</Typography>
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
                <RightControlBox>

                </RightControlBox>
            </Head>
            {/* 디버그 팝오버 */}
            <Popover
                id='debugPopover'
                open={Boolean(debugEl)}
                anchorEl={debugEl}
                onClose={() => 
                {
                    setDebugEl(null);
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <DTHeaderPopover
                    close={() => 
                    {
                        setDebugEl(null);
                    }}
                    listData={[
                        {
                            list: [
                                {
                                    label: '기본 선언 규약',
                                    event: () => 
                                    {
                                        
                                    },
                                },
                                {
                                    label: 'Import',
                                    event: () => 
                                    {
                                        
                                    },
                                },
                            ],
                        },
                        {
                            list: [
                                {
                                    label: 'Option',
                                    event: () => 
                                    {
                                        
                                    },
                                },
                                {
                                    label: 'Item Option',
                                    event: () => 
                                    {
                                        
                                    },
                                },
                                {
                                    label: 'BridgeKey',
                                    event: () => 
                                    {
                                        
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </Popover>
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