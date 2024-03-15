import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
//type
import {
    IFocusItemProps,
} from '@/components/datatemplate/interface/context.interface';
import {
    ITemplateDataProps,
    ITemplatePageDataProps,
    ITemplateListRowDataProps,
    ITemplateMainDataProps,
    ITemplateRootOptionProps,
} from './interface/element.interface';
//components
import {
    Box,
    Drawer,
    Backdrop,
    CircularProgress,
} from '@mui/material';
import DTHeader from '@/components/datatemplate/header/DTHeader';
import DTAside from './aside/DTAside';
import DTBoard from '@/components/datatemplate/body/DTBoard';
import { DTLayoutProvider } from './DTLayoutContext';

interface IDTLayoutProps {
    defaultData: ITemplateListRowDataProps;
}

const DTLayout: React.FC<IDTLayoutProps> = (props) => 
{
    const {
        defaultData,
    } = props;
    const router = useRouter();
    //state
    const [templateID] = useState<string>(defaultData._id); //템플릿 고유키 번호
    const [optionAsideWidth] = useState<number>(400); //option aside 상태창 width (*useState 필요시에만 선언)
    const [optionAsideState, setOptionAsideState] = useState<boolean>(false); //option aside 상태창 state
    const [focusItemIndex, setFocusItemIndex] = useState<IFocusItemProps | null>(null); //element focuse data
    //data state
    const [beforeTemplateData, setBeforeTemplateData] = useState<ITemplateMainDataProps>({
        _templateName: defaultData._templateName || '',
        templateLabel: defaultData.templateLabel || '제목 없음',
        templateType: defaultData.templateType || 'object',
        templateOption: defaultData.templateOption || {},
        templateData:  defaultData.templateData || [],
    }); // 뒤로가기 전 확인 용 (이걸로 데이터 통신 하지말 것!!)
    const [templatePageData, setTemplatePageData] = useState<ITemplatePageDataProps>({
        _templateName: defaultData._templateName || '',
        templateLabel: defaultData.templateLabel || '제목 없음',
        templateType: defaultData.templateType || 'object',
    }); //템플릿 페이지 DB 데이터 (*핵심)
    const [templateOptionData, setTemplateOptionData] = useState<ITemplateRootOptionProps>(
        defaultData?.templateOption || {}
    ); //템플릿 페이지 옵션 데이터 (* 핵심)
    const [templateData, setTemplateData] = useState<ITemplateDataProps[]>(
        defaultData?.templateData || []
    ); //템플릿 데이터 (*핵심)
    //page state
    const [isLoading, setIsLoading] = useState<boolean>(false); //페이지 로딩 상태
    const [isChanged, setIsChanged] = useState<boolean>(false); //페이지의 데이터 변동이 있는지 확인하는 state

    //
    useEffect(() => 
    {
        const beforeData = JSON.stringify(beforeTemplateData);
        const afterData = JSON.stringify({
            ...templatePageData,
            templateOption: templateOptionData,
            templateData: templateData,
        });

        const beforeDataJson = beforeData.split('').sort().join('');
        const afterDataJson = afterData.split('').sort().join('');

        setIsChanged(Boolean(beforeDataJson != afterDataJson));
    }, [beforeTemplateData, templateData, templatePageData, templateOptionData]);

    //페이지 unmount 전 세이브 확인
    useEffect(() => 
    {
        const handleRouteChange = () => 
        {
            //변화가 있을 경우 뒤로갈 것 인지 판별
            if(isChanged)
            {
                if(!confirm('변경 사항이 저장되지 않았습니다.\n뒤로가시겠습니까?'))
                {
                    window.history.pushState('', '');
                    void router.push(router.asPath);
                    return false;
                }
            }

            return true;
        };

        router.beforePopState(handleRouteChange);

        return () => 
        {
            router.beforePopState(() => 
            {
                return true;
            });
        };
    }, [isChanged, router]);

    return (
        <Area>
            <DTLayoutProvider
                value={{
                    templateID,
                    optionAsideWidth,
                    isChanged,
                    loading: {
                        state: isLoading,
                        setState: setIsLoading,
                    },
                    optionAside: {
                        state: optionAsideState,
                        setState: setOptionAsideState,
                    },
                    templatePage: {
                        state: templatePageData,
                        setState: setTemplatePageData,
                    },
                    tmeplateRootOption: {
                        state: templateOptionData,
                        setState: setTemplateOptionData,
                    },
                    template: {
                        state: templateData,
                        setState: setTemplateData,
                    },
                    focusItem: {
                        state: focusItemIndex,
                        setState: setFocusItemIndex,
                    },
                    beforeTemplateData: {
                        state: beforeTemplateData,
                        setState: setBeforeTemplateData,
                    },
                }}
            >
                <DTHeader/>
                <BoardArea>
                    <DTBoard/>
                    <Drawer
                        variant='persistent'
                        hideBackdrop
                        anchor='right'
                        open={optionAsideState}
                        PaperProps={{
                            style: {
                                position: 'absolute',
                                zIndex: 2,
                            },
                        }}
                    >
                        <DTAside/>
                    </Drawer>
                </BoardArea>
                <BackdropBox
                    open={isLoading}
                    sx={{
                        zIndex: 999,
                    }}
                >
                    <CircularProgressLoad
                        size={60}
                    />
                </BackdropBox>
            </DTLayoutProvider>
        </Area>
    );
};

const Area = styled(Box)`
    position: relative;
    flex: 1;
    padding-top: 36px;
    overflow: hidden;
`;

const BoardArea = styled(Box)`
    position: relative;
    height: 100%;
    overflow: hidden;
`;

const BackdropBox = styled(Backdrop)`
    color: #fff;
`;

const CircularProgressLoad = styled(CircularProgress)`
    color: inherit;
`;

export default DTLayout;