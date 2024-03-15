import React from 'react';
import { styled } from '@mui/material/styles';
//type
import { ISelectionItemDataProps } from '../interface/element.interface';
//context
import { useDTLayoutContext } from '../DTLayoutContext';
//components
import {
    Box, 
    Stack,
    Switch,
    FormControl,
    FormLabel,
} from '@mui/material';
import CheckList from '@/components/input/CheckList';

const TableControl: React.FC = () => 
{
    //context
    const {
        template,
        tmeplateRootOption,
    } = useDTLayoutContext();

    return (
        <Area>
            <Wrap
                direction={'row'}
                spacing={2}
            >
                <Content
                    spacing={2}
                >
                    <FormControl>
                        <FormLabel>검색</FormLabel>
                        <FormBox>
                            <Switch
                                checked={Boolean(tmeplateRootOption.state.useSearch)}
                                onChange={(e,v) => 
                                {
                                    tmeplateRootOption.setState(prev => 
                                    {
                                        return {...prev, useSearch: v};
                                    });
                                }}
                            />
                        </FormBox>
                    </FormControl>
                    <FormControl>
                        <FormLabel>수정/삭제</FormLabel>
                        <FormBox>
                            <Switch
                                checked={Boolean(tmeplateRootOption.state.useTableMenu)}
                                onChange={(e,v) => 
                                {
                                    tmeplateRootOption.setState(prev => 
                                    {
                                        return {...prev, useTableMenu: v};
                                    });
                                }}
                            />
                        </FormBox>
                    </FormControl>
                    <FormControl>
                        <FormLabel>생성/수정 날짜 표시</FormLabel>
                        <FormBox>
                            <Switch
                                checked={Boolean(tmeplateRootOption.state.viewCreateDate)}
                                onChange={(e,v) => 
                                {
                                    tmeplateRootOption.setState(prev => 
                                    {
                                        return {...prev, viewCreateDate: v};
                                    });
                                }}
                            />
                        </FormBox>
                    </FormControl>
                    <FormControl>
                        <FormLabel>테이블 컬럼 표시 옵션</FormLabel>
                        <FormBox>
                            <CheckList
                                multiple
                                disabled
                                data={(()=>
                                {
                                    const ar = [] as ISelectionItemDataProps[];
                                    const newarr = template.state.reduce((arr, item) => 
                                    {
                                        const json = {
                                            label : item.label || '',
                                            checked : item.useTableColumn || false,
                                        };
                                        arr.push(json);
                                        return arr;
                                    }, ar);
                                    return newarr;
                                })()}
                                callbackCheckbox={(checkItem) => 
                                {
                                    template.setState(prev => 
                                    {
                                        const newArray = [...prev];
                                        newArray[checkItem.index].useTableColumn = checkItem.value;
                                        return newArray;
                                    });
                                }}
                            />
                        </FormBox>
                    </FormControl>
                </Content>
            </Wrap>
        </Area>
    );
};

const Area = styled(Box)`
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0.875rem;
    }
    &::-webkit-scrollbar-track {
        background-color: ${({theme}) => 
    {
        return theme.palette.dividerTheme.main;
    }};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
        border: 3px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
        border-radius: 0.875rem;;
    }
    &::-webkit-scrollbar-button {
        display:none;
    }
`;

const Wrap = styled(Stack)`
    width: 100%;
    overflow: hidden;
`;

const Content = styled(Stack)`
    flex: 1;
`;

const FormBox = styled(Box)`
    margin-top: 0.5rem;
`;

export default TableControl;