import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
//hooks
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
//utils
import { contentsTableSearchEvent } from '@/utils/table/tableSearchHandler';
//type
import {
    ICallbackEventParamaterProps,
} from '@/interfaces/table.interface';
import {
    IListProps,
    IGenericTableBaseProps,
} from '../interface/list.interface';
//components
import {
    Box,
    CircularProgress,
} from '@mui/material';
import SelectSearch from './SelectSearch';


const SelectList = <T extends {[key: string]: any}>(props: IListProps<T>) => 
{
    const {
        type,
        prePage = 10,
        defaultData,
        defaultCurrentPage,
        defaultSearchOption,
        itemRender,
    } = props;
    //state
    const [hasNext, setHasNext] = useState<boolean>(defaultData.length > 0);
    const [listData, setListData] = useState<T[]>(defaultData);
    //search Base State
    const [searchFilterValue, setSearchFilterValue] = useState<ICallbackEventParamaterProps>({
        page: defaultCurrentPage ?  Number(defaultCurrentPage) : 1,
        perPage: Number(prePage),
        searchvalue: '',
    });

    //observer
    const observer = useIntersectionObserver({
        root: null,
        rootMargin: '0px',
        threshold: 0.4,
        onIntersect: async ({ isIntersecting, target }, obs) => 
        {
            if (isIntersecting) 
            {
                obs.unobserve(target);

                const newST = {...searchFilterValue};
                newST.page = newST.page + 1;

                const res: IGenericTableBaseProps<T> = await contentsTableSearchEvent(newST, { searchType: type });

                if(res.data.length > 0)
                {
                    setListData(prev => 
                    {
                        return [...prev,...res.data];
                    });
                    setSearchFilterValue(prev => 
                    {
                        const newpage = prev.page + 1;
                        return {...prev, page: newpage};
                    });
                }
                else
                {
                    //데이터 끝
                    setHasNext(false);
                }
            }
        },
    });

    return (
        <ListBox>
            <SearchArea>
                <SelectSearch
                    perPage={prePage}
                    searchOptions={defaultSearchOption}
                    callbackSearch={async (value) => 
                    {
                        try 
                        {
                            const res: IGenericTableBaseProps<T> = await contentsTableSearchEvent(value, {
                                searchType: type,
                            });

                            setListData(res.data);
                            setHasNext(res.data.length > 0);
                            setSearchFilterValue(value);
                        }
                        catch (error) 
                        {
                            console.error(error);
                            alert('오류가 발생하였습니다.');
                        }
                    }}
                />
            </SearchArea>
            <DataArea>
                {
                    listData.length > 0 ?
                        listData.map((d,i) => 
                        {
                            return (
                                <DataItem
                                    key={i}
                                >
                                    {
                                        itemRender ? 
                                            itemRender(d)
                                            :
                                            <div>{i}</div>
                                    }
                                </DataItem>
                            );
                        })
                        :
                        <EmptyBox>데이터가 없습니다.</EmptyBox>
                }
                {
                    hasNext &&
                        <LoadingBox
                            ref={observer}
                        >
                            <CircularProgress/>
                        </LoadingBox>
                }
            </DataArea>
        </ListBox>
    );
};

const ListBox = styled(Box)`
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const SearchArea = styled(Box)`
    position: relative;
`;

const DataArea = styled(Box)`
    position: relative;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 20px 5px;
`;

const DataItem = styled(Box)`
    position: relative;
    overflow: hidden;
    &:nth-of-type(odd) {
        background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.main;
    }};
    }
`;

const LoadingBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
`;

const EmptyBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export default SelectList;