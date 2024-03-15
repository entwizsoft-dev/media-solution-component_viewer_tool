import React from 'react';
import { styled } from '@mui/material/styles';
//type
import {
    ISingleResultProps,
} from '../interface/result.interface';
import {
    Box,
    Paper,
    Typography,
} from '@mui/material';

const ResultSingle = <T extends {[key: string]: any}>(props: ISingleResultProps<T>) => 
{
    const {
        selectData,
        itemRender,
    } = props;

    return (
        <>
            <ResultBox>
                <NoticeWrap>
                    <Notice>
                        <Typography
                            variant='body1'
                            sx={{
                                fontWeight: 'bold',
                            }}
                        >
                            단일 선택 상태입니다.
                        </Typography>
                    </Notice>
                </NoticeWrap>
                <DataArea>
                    {
                        selectData ?
                            <DataCard
                                elevation={4}
                            >
                                {
                                    itemRender ? 
                                        itemRender(selectData)
                                        :
                                        <div>itemRender empty</div>
                                }
                            </DataCard>
                            :
                            <EmptyBox>선택된 데이터가 없습니다.</EmptyBox>
                    }
                </DataArea>
            </ResultBox>
        </>
    );
};

const ResultBox = styled(Box)`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
`;

const NoticeWrap = styled(Box)`
    padding: 20px 20px 10px 20px;
`;

const Notice = styled(Box)`
    padding: 1rem;
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.light;
    }};
    border-radius: 8px;
`;

const DataArea = styled(Box)`
    flex: 1;
    padding: 10px 20px;
    box-sizing: border-box;
    overflow: auto;
`;

const DataCard = styled(Paper)`
    padding: 20px;
    border-radius: 6px;
    border: 1px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.origin;
    }};
    overflow: hidden;
    box-sizing: border-box;
`;

const EmptyBox = styled(Box)`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export default ResultSingle;