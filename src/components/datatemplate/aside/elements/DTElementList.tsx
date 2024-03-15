import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
//type
import { ITotalElementListProps } from '../../interface/element.interface';
//json
import basicElements from '@/components/datatemplate/json/basicElements';
import customElements from '@/components/datatemplate/json/customElements';
import dataBindingElements from '@/components/datatemplate/json/dataBindingElements';
//components
import {
    Box,
    Tabs,
    Tab,
    List,
} from '@mui/material';
import TabPanel from '@/components/tabs/TabPanel';
import DTElementListItem from './DTElementListItem';

interface IElementTabListProps {
    id: string;
    label: string;
    value: ITotalElementListProps[] | Promise<ITotalElementListProps[]>;
}

const elementTabList: IElementTabListProps[] = [
    {
        id: 'basic',
        label: '일반',
        value: basicElements,
    },
    {
        id: 'custom',
        label: '커스텀',
        value: customElements,
    },
    {
        id: 'binding',
        label: '데이터 바인딩',
        value: dataBindingElements,
    },
];

const DTElementList = () => 
{
    //state
    const [tabIndex, setTabIndex] = useState<number>(0); //현재 tab index

    return (
        <DTElementListArea>
            <TabsStyle
                value={tabIndex}
                aria-label='elementSelect'
                onChange={(e,v) => 
                {
                    setTabIndex(v);
                }}
            >
                {
                    elementTabList.map((d,i) => 
                    {
                        return (
                            <TabStyle
                                key={i}
                                label={d.label}
                            />
                        );
                    })
                }
            </TabsStyle>
            {
                elementTabList.map((d,i) => 
                {
                    return (
                        <TabPanel
                            key={i}
                            itemid={d.id}
                            index={i}
                            currentIndex={tabIndex}
                        >
                            <List
                                dense={false}
                            >
                                <DTElementListItem
                                    data={d.value}
                                />
                            </List>
                        </TabPanel>
                    );
                })
            }
        </DTElementListArea>
    );
};

const DTElementListArea = styled(Box)`
`;

const TabsStyle = styled(Tabs)`
    background-color: transparent;
    min-height: 2.5rem;
`;

const TabStyle = styled(Tab)`
    padding: 0.5rem;
    min-height: 2.5rem;
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

export default DTElementList;