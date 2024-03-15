import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
//type
import {
    ISelectTemplateProps,
} from '../interface/template.interface';
import {
    IPageListProps,
} from '../interface/list.interface';
import {
    IUserListDataProps,
} from '@/interfaces/user.interface';
//icon
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
//components
import {
    Box,
} from '@mui/material';
import SelectList from '../part/SelectList';
import ListItem from '../part/item/ListItem';
import ResultSingle from '../part/ResultSingle';
import ResultMultiple from '../part/ResultMultiple';
import SingleResultItem from '../part/item/SingleResultItem';
import MultiResultItem from '../part/item/MultiResultItem';
import DataSkeleton from '../skeleton/DataSkeleton';

const UserSelect = <
    T extends IPageListProps<S>,
    S extends IUserListDataProps,
    M extends IUserListDataProps,
>(props: ISelectTemplateProps<T,S,M>) => 
{
    const {
        singleSelect = true, //단일 선택 여부
        defaultListData, //리스트 데이터
        defaultSelectData, //선택된 데이터
        defaultMultiData, //다중 선택 데이터
        callbackSelect, //셀렉트 선택 콜백
    } = props;
    //state
    const [listData] = useState<T | null>(defaultListData ? defaultListData : null); //list 데이터
    const [selectData, setSelectData] = useState<S | null>(
        defaultSelectData ? defaultSelectData : null,
    ); //선택 데이터
    const [multiSelectData, setMultiSelectData] = useState<M[]>(
        defaultMultiData ? defaultMultiData : [],
    ); //다중 선택 데이터

    //단일 제외 이벤트
    const singleRemoveSelectEvent = () => 
    {
        setSelectData(null);
    };

    //다중 선택 제외 이벤트
    const multiRemoveSelectEvent = (idx: number) => 
    {
        setMultiSelectData(prev => 
        {
            const newPrev = prev.filter((_,i) => 
            {
                return i !== idx;
            });
            return newPrev;
        });
    };

    //데이터 선택 이벤트
    const selectEvent = (data: S | M) => 
    {
        if(singleSelect)
        {
            //단일선택
            const singleData = data as S;
            setSelectData(singleData);
        }
        else
        {
            //다중선택
            const multiData = data as M;
            setMultiSelectData(prev => 
            {
                return [...prev, multiData];
            });
        }
    };

    //단일 선택 re-render update
    useEffect(() => 
    {
        if(singleSelect)
        {
            //단일
            if(typeof callbackSelect === 'function')
            {
                callbackSelect(selectData);
            }
        }
    }, [singleSelect, selectData]);

    //다중 선택 re-render update
    useEffect(() => 
    {
        if(!singleSelect)
        {
            //단일
            if(typeof callbackSelect === 'function')
            {
                callbackSelect(multiSelectData);
            }
        }
    }, [singleSelect, multiSelectData]);

    return (
        <GridBox>
            {
                listData ?
                    <>
                        <Left>
                            <SelectList<S>
                                type={'user'}
                                prePage={10}
                                defaultData={listData.data}
                                defaultCurrentPage={Number(listData.currentPage)}
                                defaultSearchOption={{
                                    searchSelectOptions: [
                                        {
                                            label: '닉네임',
                                            value: 'nickname',
                                        },
                                        {
                                            label: '이메일',
                                            value: 'email',
                                        },
                                    ],
                                }}
                                itemRender={(d) => 
                                {
                                    return (
                                        <ListItem
                                            views={[
                                                {
                                                    label: 'user id',
                                                    value: d.uid,
                                                },
                                                {
                                                    label: '닉네임',
                                                    value: d.nickname,
                                                },
                                            ]}
                                            callbackSelect={() => 
                                            {
                                                selectEvent(d);
                                            }}
                                        />
                                    );
                                }}
                            />
                        </Left>
                        <IconBox>
                            <ArrowIcon/>
                        </IconBox>
                        <Right>
                            {
                                singleSelect ?
                                    <ResultSingle<S>
                                        selectData={selectData}
                                        itemRender={(data) => 
                                        {
                                            return (
                                                <SingleResultItem
                                                    callbackRemove={singleRemoveSelectEvent}
                                                    views={[
                                                        {
                                                            label: 'user id',
                                                            value: data.uid,
                                                        },
                                                        {
                                                            label: '운영자 (본 닉네임)',
                                                            value: data.nickname,
                                                        },
                                                        {
                                                            label: '이메일',
                                                            value: data.email,
                                                        },
                                                    ]}
                                                />
                                            );
                                        }}
                                    />
                                    :
                                    <ResultMultiple<M>
                                        selectData={multiSelectData}
                                        itemRender={({data, idx}, drag) => 
                                        {
                                            return (
                                                <MultiResultItem<M>
                                                    idx={idx}
                                                    currentData={data}
                                                    dragHandle={drag}
                                                    callbackRemove={multiRemoveSelectEvent}
                                                    views={[
                                                        {
                                                            label: 'user id',
                                                            value: data.uid,
                                                        },
                                                        {
                                                            label: '운영자 (본 닉네임)',
                                                            value: data.nickname,
                                                        },
                                                        {
                                                            label: '이메일',
                                                            value: data.email,
                                                        },
                                                    ]}
                                                />
                                            );
                                        }}
                                    />
                            }
                        </Right>
                    </>
                    :
                    <DataSkeleton/>
            }
        </GridBox>
    );
};

const GridBox = styled(Box)`
    position: relative;
    display: flex;
    align-items: center;
    height: 630px;
    overflow: hidden;
`;

const Left = styled(Box)`
    flex: 1;
    height: 100%;
    aspect-ratio: 3/4;
    border: 1px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
    border-radius: 6px;
    box-sizing: border-box;
    overflow: hidden;
`;

const Right = styled(Box)`
    flex: 1;
    height: 100%;
    border: 1px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
    border-radius: 6px;
    box-sizing: border-box;
    overflow: hidden;
`;

const IconBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
`;

const ArrowIcon = styled(ArrowRightAltIcon)`
    font-size: 40px;
    color: ${({theme}) => 
    {
        return theme.palette.svgColor.main;
    }};
`;

export default UserSelect;