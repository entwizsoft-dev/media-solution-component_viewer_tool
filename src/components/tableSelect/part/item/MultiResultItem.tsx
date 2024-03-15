import React from 'react';
import { styled } from '@mui/material/styles';
//dnd
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
//icon
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
//components
import {
    Box,
    Paper,
    Button,
    IconButton,
    Typography,
} from '@mui/material';

interface IItemArrayProps {
    label: string;
    value?: string | number | null;
}

interface ITableMultiItemProps<T> {
    idx: number;
    currentData: T;
    dragHandle?: DraggableProvidedDragHandleProps | null;
    callbackRemove?: (idx: number, data: T) => void;
    views: IItemArrayProps[];
    buttonRender?: React.ReactNode;
}

const MultiResultItem = <T extends {[key: string]: any}>(props: ITableMultiItemProps<T>) => 
{
    const {
        idx,
        currentData,
        dragHandle,
        callbackRemove,
        views,
        buttonRender,
    } = props;
        
    return (
        <DataCard
            elevation={1}
        >
            <DataContent>
                {
                    views.map((d,i) => 
                    {
                        return (
                            <InfoText
                                key={i}
                            >
                                <CaptionTitle
                                    variant='caption'
                                >
                                    {
                                        (typeof d.label === 'string' && d.label !== '') ?
                                            d.label : '-'
                                    }
                                </CaptionTitle>
                                <InfoContent
                                    variant='body2'
                                >
                                    {
                                        (typeof d.value === 'string' && d.value !== '') ||
                                        typeof d.value === 'number'
                                            ?
                                            String(d.value) : '-'
                                    }
                                </InfoContent>
                            </InfoText>
                        );
                    })
                }
            </DataContent>
            <DataBottom>
                {
                    buttonRender &&
                        <ButtonRenderBox>
                            {buttonRender}
                        </ButtonRenderBox>
                }
                <Button
                    variant='outlined'
                    color='error'
                    onClick={() => 
                    {
                        if(typeof callbackRemove === 'function')
                        {
                            callbackRemove(idx, currentData);
                        }
                    }}
                >
                    제외
                </Button>
                {
                    dragHandle &&
                        <IconButton
                            {...dragHandle}
                        >
                            <DragIndicatorIcon/>
                        </IconButton>
                }
            </DataBottom>
        </DataCard>
    );
};

const DataCard = styled(Paper)`
    position: relative;
    display: flex;
    align-items: center;
    padding: 12px 20px;
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
    margin-bottom: 1rem;
`;

const DataContent = styled(Box)`
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
`;

const DataBottom = styled(Box)`
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 1rem;
`;

const InfoText = styled(Box)`
    flex: 1;
    overflow: hidden;
    padding: 6px 0;
`;

const CaptionTitle = styled(Typography)`
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.light;
    }};
`;

const InfoContent = styled(Typography)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
`;

const ButtonRenderBox = styled(Box)`
    margin-right: 0.5rem;
`;

export default MultiResultItem;