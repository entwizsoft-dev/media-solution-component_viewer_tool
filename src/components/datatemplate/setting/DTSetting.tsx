import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
//icon
import CloseIcon from '@mui/icons-material/Close';
//context
import { useDTLayoutContext } from '../DTLayoutContext';
//components
import {
    Tabs,
    Stack,
    Tab,
    Box,
    IconButton,
} from '@mui/material';
import TabPanel from '@/components/tabs/TabPanel';
import DBControl from './DBControl';
import PageControl from './PageControl';
import TableControl from './TableControl';

interface IDTSettingProps {
    close?: () => void;
}

const DTSetting: React.FC<IDTSettingProps> = (props) => 
{
    const {
        close,
    } = props;
    //context
    const {
        templatePage,
    } = useDTLayoutContext();
    //state
    const [tabIndex, setTabIndex] = useState<number>(0); //현재 tab index

    return (
        <Area>
            <Head
                direction={'row'}
                justifyContent={'flex-end'}
                alignItems={'center'}
            >
                <IconButton
                    onClick={() => 
                    {
                        if(typeof close === 'function')
                        {
                            close();
                        }
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </Head>
            <TabsStyle
                value={tabIndex}
                onChange={(e,v) => 
                {
                    setTabIndex(v);
                }}
            >
                <TabStyle label="DB 설정"  />
                <TabStyle label="페이지 구성"  />
                {
                    templatePage.state.templateType === 'list' &&
                        <TabStyle label="테이블 구성"  />
                }
            </TabsStyle>
            <Wrap>
                <TabPanel itemid='0' index={0} currentIndex={tabIndex}>
                    <DBControl/>
                </TabPanel>
                <TabPanel itemid='1' index={1} currentIndex={tabIndex}>
                    <PageControl/>
                </TabPanel>
                {
                    templatePage.state.templateType === 'list' &&
                        <TabPanel itemid='2' index={2} currentIndex={tabIndex}>
                            <TableControl/>
                        </TabPanel>
                }
            </Wrap>
        </Area>
    );
};

const Area = styled(Box)`
    position: relative;
    overflow: hidden;
`;

const Head = styled(Stack)`
    width: 100%;
    padding: 0.5rem 1rem 0;
    margin-bottom: 0.25rem;
    box-sizing: border-box;
`;

const TabsStyle = styled(Tabs)`
    background-color: transparent;
    min-height: 3rem;
    border-bottom: 1px solid;
    border-color: ${({theme}) => 
    {
        return theme.palette.dividerTheme.main;
    }};;

`;

const TabStyle = styled(Tab)`
    min-height: 3rem;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.light;
    }};

    &.Mui-selected {
        color: ${({theme}) => 
    {
        return theme.palette.typoColor.main;
    }};
    }
`;

const Wrap = styled(Box)`
    padding: 1.5rem 2rem 3rem;
    max-height: 700px;
    overflow: auto;
`;

export default DTSetting;