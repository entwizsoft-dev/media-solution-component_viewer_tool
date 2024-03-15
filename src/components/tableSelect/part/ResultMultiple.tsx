import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
//dnd
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd';
//hooks
import { useDraggableInPortal } from '@/hooks/useDraggableInPortal';

//type
import {
    IMultiResultProps,
} from '../interface/result.interface';
//components
import {
    Box,
    Typography,
} from '@mui/material';

const ResultMultiple = <T extends {[key: string]: any}>(props: IMultiResultProps<T>) => 
{
    const {
        useDrag,
        selectData,
        callbackDrag,
        itemRender,
    } = props;
    //hooks
    const renderDraggable = useDraggableInPortal();
    //state
    const [renderDocument, setRenderDocument] = useState<boolean>(false);

    //react-beautiful-dnd
    const onDragEnd = (dragProps: DropResult) => 
    {
        if(useDrag && typeof callbackDrag === 'function')
        {
            callbackDrag(dragProps);
        }
    };

    //dom ready
    useEffect(() => 
    {
        setRenderDocument(true);
    }, []);

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
                            다중 선택 상태입니다.
                        </Typography>
                    </Notice>
                </NoticeWrap>
                {
                    (useDrag && renderDocument) ?
                        <DragDropContext
                            onDragEnd={onDragEnd}
                        >
                            <Droppable
                                droppableId="contentTableMulitSelect"
                            >
                                {
                                    (provided) => 
                                    {
                                        return (
                                            <DataArea
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                <DataScrollArea>
                                                    {
                                                        selectData.length > 0 ?
                                                            selectData.map((d,i) => 
                                                            {
                                                                return (
                                                                    <Draggable
                                                                        key={i}
                                                                        draggableId={String(i)}
                                                                        index={i}
                                                                    >
                                                                        {
                                                                            renderDraggable((pd) => 
                                                                            {
                                                                                return (
                                                                                    <ItemBox
                                                                                        ref={pd.innerRef}
                                                                                        {...pd.draggableProps}
                                                                                    >
                                                                                        {
                                                                                            itemRender ?
                                                                                                itemRender(
                                                                                                    {data: d, idx: i},
                                                                                                    pd.dragHandleProps,
                                                                                                )
                                                                                                :
                                                                                                <div>
                                                                                                    ddd
                                                                                                </div>
                                                                                        }
                                                                                    </ItemBox>
                                                                                );
                                                                            })
                                                                        }
                                                                    </Draggable>
                                                            
                                                                );
                                                            })
                                                            :
                                                            <EmptyBox>선택된 데이터가 없습니다.</EmptyBox>
                                                    }
                                                    {provided.placeholder}
                                                </DataScrollArea>
                                            </DataArea>
                                        );
                                    }
                                }
                            </Droppable>
                        </DragDropContext>
                        :
                        <DataArea>
                            <DataScrollArea>
                                {
                                    selectData.length > 0 ?
                                        selectData.map((d,i) => 
                                        {
                                            return (
                                                <ItemBox
                                                    key={i}
                                                >
                                                    {
                                                        itemRender ?
                                                            itemRender(
                                                                {data: d, idx: i},
                                                            )
                                                            :
                                                            <div>
                                                                -
                                                            </div>
                                                    }
                                                </ItemBox>
                                            );
                                        })
                                        :
                                        <EmptyBox>선택된 데이터가 없습니다.</EmptyBox>
                                }
                            </DataScrollArea>
                        </DataArea>
                }
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

    .draggable {
        top: auto !important;
        left: auto !important;
    }
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
    position: relative;
    display: flex;
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
`;

const DataScrollArea = styled(Box)`
    position: relative;
    flex: 1;
    padding: 10px 20px 20px;
    overflow: auto;
`;

const EmptyBox = styled(Box)`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ItemBox = styled(Box)`
    
`;

export default ResultMultiple;