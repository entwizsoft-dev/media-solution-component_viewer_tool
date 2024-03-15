import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
//type
import {
    ISelectTemplateProps,
} from '../interface/template.interface';
import {
    IPageListProps,
} from '../interface/list.interface';
import { IWecandeoTableDataProps } from '@/interfaces/wecandeo.interface';

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
import MultiResultItem from '../part/item/MultiResultItem';
import SingleResultVideoItem from '../part/item/SingleResultVideoItem';
import DataSkeleton from '../skeleton/DataSkeleton';


const VideoSelect = <
    T extends IPageListProps<IWecandeoTableDataProps>,
    S extends IWecandeoTableDataProps,
    M extends IWecandeoTableDataProps,
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
    const selectEvent = (data: IWecandeoTableDataProps) => 
    {
        if(singleSelect)
        {
            setSelectData(data as S);
        }
        else
        {    
            //다중선택

            setMultiSelectData(prev => 
            {
                return [...prev, data as M];
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
        <>
            <GridBox>
                {
                    listData ?
                        <>
                            <Left>
                                <SelectList<IWecandeoTableDataProps>
                                    type={'video'}
                                    prePage={10}
                                    defaultData={listData.data}
                                    defaultCurrentPage={Number(listData.currentPage)}
                                    defaultSearchOption={{
                                        searchSelectOptions: [
                                            {
                                                label: '영상 제목',
                                                value: 'fileName',
                                            },
                                            {
                                                label: '유통사',
                                                value: 'distributor',
                                            },
                                        ],
                                    }}
                                    itemRender={(d) => 
                                    {
                                        return (
                                            <ListItem
                                                views={[
                                                    {
                                                        label: 'uid',
                                                        value: d.uid,
                                                    },
                                                    {
                                                        label: '유통사',
                                                        value: d.distributorName,
                                                    },
                                                    {
                                                        label: '재생 시간',
                                                        value: d.duration,
                                                    },
                                                    {
                                                        label: '영상 제목',
                                                        value: d.fileName,
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
                                                    <>
                                                        <SingleResultVideoItem
                                                            callbackRemove={singleRemoveSelectEvent}
                                                            videoKey={data.videoKey}
                                                            views={[
                                                                // {
                                                                //     label: '영상 제목',
                                                                //     value: data.fileName,
                                                                // },
                                                                {
                                                                    label: '재생 시간',
                                                                    value: data.duration,
                                                                },
                                                                // {
                                                                //     label: '유통사',
                                                                //     value: data.distributorName,
                                                                // },
                                                                {
                                                                    label: '비디오 키',
                                                                    value: data.videoKey,
                                                                },
                                                            ]}
                                                        />
                                                    </>
                                                );
                                            }}
                                        />
                                        :
                                        <ResultMultiple<M>
                                            selectData={multiSelectData}
                                            useDrag
                                            callbackDrag={({source,destination}) => 
                                            {
                                                if (!destination) 
                                                {
                                                    console.error('destination 없음');
                                                    return;
                                                }

                                                setMultiSelectData(prev => 
                                                {
                                                    const newArray = [...prev];
    
                                                    const [targetItem] = newArray.splice(source.index, 1);
                                                    newArray.splice(destination.index, 0, targetItem);
    
                                                    return newArray;
                                                });
                                            }}
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
                                                                label: 'uid',
                                                                value: data.uid,
                                                            },
                                                            {
                                                                label: '타이틀',
                                                                value: data.fileName,
                                                            },
                                                            {
                                                                label: '관리용 이름',
                                                                value: data.distributorName,
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
        </>
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

export default VideoSelect;