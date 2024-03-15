import React, { useState,useCallback, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import axiosGuard from '@/utils/axiosGuard';
//redux
import {
    useDispatch,
} from 'react-redux';
import { update } from '@/store/modules/slice/datatemplateSaveTrigger';
//hooks
import useModal from '@/hooks/useModal';
//context
import { useDTLayoutContext } from '../DTLayoutContext';
//icon
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
//components
import {
    AppBar,
    Box,
    Tooltip,
    Typography,
    Button,
    ButtonGroup,
    Popover,
} from '@mui/material';
import CommonModal from '@/components/modal/CommonModal';
import DebugItem from '../modal/DebugItem';
import PreviewItem from '../modal/PreviewItem';
import DTHeaderPopover from './DTHeaderPopover';
import DTSetting from '../setting/DTSetting';

const DTHeader = () => 
{
    //context
    const {
        optionAside,
        focusItem,
        templatePage,
        tmeplateRootOption,
        template,
        templateID,
        beforeTemplateData,
        isChanged,
        loading,
    } = useDTLayoutContext();
    //redux
    const dispatch = useDispatch();
    //router
    const router = useRouter();
    //hooks
    const [settingActive, settingOpen, settingClose] = useModal(); //setting modal hooks
    const [debugActive, debugOpen, debugClose] = useModal(); //debug modal hooks
    const [previewActive, previewOpen, previewClose] = useModal(); //preview modal hooks
    //state
    const [settingEl, setSettingEl] = useState<HTMLButtonElement | null>(null); // 설정 메뉴
    const [debugEl, setDebugEl] = useState<HTMLButtonElement | null>(null); //디버그 메뉴

    //템플릿 저장
    const saveEvent = useCallback(
        async () => 
        {
            try 
            {
                if (confirm('저장하시겠습니까?')) 
                {
                    loading.setState(true);
                    const json = {
                        ...templatePage.state,
                        templateOption: tmeplateRootOption.state,
                        templateData: template.state,
                    };
                    const res = await axiosGuard.put(`/template/${templateID}`, json);
                    const { code } = res.data;
                    if (code === 1) 
                    {
                        // save complete
                        alert('저장이 완료되었습니다');
                        beforeTemplateData.setState(json);
                        //aside data trigger
                        dispatch(update());
                    }
                    else 
                    {
                        alert(`클라이언트 에러가 발생했습니다.\ncode - ${code}`);
                    }
                }
            }
            catch (error) 
            {
                alert('서버 에러가 발생했습니다.');
            }
            finally 
            {
                loading.setState(false);
            }
        },
        [
            loading,
            templatePage.state,
            tmeplateRootOption.state,
            template.state,
            templateID,
            beforeTemplateData,
            dispatch,
        ]
    );

    //데이터 초기화
    const resetEvent = useCallback(() => 
    {
        if(confirm('되돌릴 수 없습니다.\n모든 데이터를 리셋하시겠습니까?'))
        {
            optionAside.setState(false);
            focusItem.setState(null);
            template.setState([]);
        }
    }, [focusItem, optionAside, template]);

    //템플릿 삭제
    const deleteEvent = useCallback(async () => 
    {
        try 
        {
            if(confirm('되돌릴 수 없습니다.\n현재 페이지를 삭제하시겠습니까?'))
            {
                const res = await axiosGuard.delete(`/template/${templateID}`);
                const {
                    code,
                } = res.data;

                if(code === 1)
                {
                    alert('삭제가 완료되었습니다.');
                    router.back();
                }
                else
                {
                    alert(`클라이언트 에러가 발생하였습니다.\ncode - ${code}`);
                }
            }
        }
        catch (error) 
        {
            console.error(error);
            alert('삭제 도중 서버 에러가 발생하였습니다.');
        }
    }, [templateID]);

    // 명령어 커멘드 키 로직
    const handleKeyPress = useCallback(async (event: KeyboardEvent) => 
    {
        if(event.ctrlKey)
        {
            if(event.altKey)
            {
                if(event.key === 's')
                    
                {
                    event.preventDefault();
                    if(!settingActive)
                    {
                        settingOpen();
                    }
                    else
                    {
                        settingClose();
                    }
                }
            }
            else if(event.shiftKey)
            {
                if(event.key === 'F12')
                {
                    event.preventDefault();
                    if(!debugActive)
                    {
                        debugOpen();
                    }
                    else
                    {
                        debugClose();
                    }
                }
            }
            else
            {
                //저장
                if(event.key === 's') 
                {
                    event.preventDefault();
                    await saveEvent();
                }
                //데이터 초기화
                else if(event.key === 'r')
                {
                    event.preventDefault();
                    resetEvent();
                }
            }
        }
    }, [debugActive, resetEvent, saveEvent, debugOpen, debugClose, settingActive, settingOpen, settingClose]);

    useEffect(() => 
    {
        document.addEventListener('keydown', handleKeyPress);
        return () => 
        {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

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
                        <Tooltip
                            title="뒤로가기"
                        >
                            <ControlIcon
                                onClick={() => 
                                {
                                    router.back();
                                }}
                            >
                                <ArrowBackIosNewIcon
                                    fontSize='small'
                                />
                            </ControlIcon>
                        </Tooltip>
                        <ControlIcon
                            onClick={(e) => 
                            {
                                setSettingEl(e.currentTarget);
                            }}
                        >
                            <Typography variant='button'>설정</Typography>
                        </ControlIcon>
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
                            {
                                templatePage.state.templateLabel || '제목 없음'
                            }
                            <PageChangedDot>
                                {
                                    isChanged && '*'
                                }
                            </PageChangedDot>
                        </Title>
                    </TitleBox>
                </TitleWrap>
                <RightControlBox>
                </RightControlBox>
            </Head>
            {/* 셋팅 모달 */}
            <CommonModal
                modalActive={settingActive}
                // close={settingClose}
                wd='840px'
            >
                <DTSetting
                    close={settingClose}
                />
            </CommonModal>
            {/* 디버그 모달 */}
            <CommonModal
                modalActive={debugActive}
                close={debugClose}
                wd='960px'
            >
                <DebugItem/>
            </CommonModal>
            {/* 미리보기 모달 */}
            <CommonModal
                modalActive={previewActive}
                close={previewClose}
                wd='1100px'
            >
                <PreviewItem
                    templateData={template.state}
                />
            </CommonModal>
            {/* 설정 팝오버 */}
            <Popover
                id='settingPopover'
                open={Boolean(settingEl)}
                anchorEl={settingEl}
                onClose={() => 
                {
                    setSettingEl(null);
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <DTHeaderPopover
                    close={() => 
                    {
                        setSettingEl(null);
                    }}
                    listData={[
                        {
                            list: [
                                {
                                    label: '템플릿 설정',
                                    shortcutLabel: 'Ctrl + Alt + S',
                                    event: () => 
                                    {
                                        settingOpen();
                                    },
                                },
                            ],
                        },
                        {
                            list: [
                                {
                                    label: '저장',
                                    shortcutLabel: 'Ctrl + S',
                                    event: saveEvent,
                                },
                            ],
                        },
                        {
                            list: [
                                {
                                    label: '데이터 초기화',
                                    shortcutLabel: 'Ctrl + R',
                                    event: resetEvent,
                                },
                                {
                                    label: '삭제',
                                    event: deleteEvent,
                                },
                            ],
                        },
                    ]}
                />
            </Popover>
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
                                    label: '코드 확인',
                                    shortcutLabel: 'Ctrl + Shift + F12',
                                    event: () => 
                                    {
                                        debugOpen();
                                    },
                                },
                                {
                                    label: '템플릿 미리보기',
                                    event: () => 
                                    {
                                        previewOpen();
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

const PageChangedDot = styled('strong')`
    color: ${({theme}) => 
    {
        return theme.palette.warning.main;
    }};
    margin-left: 6px;
`;

export default DTHeader;