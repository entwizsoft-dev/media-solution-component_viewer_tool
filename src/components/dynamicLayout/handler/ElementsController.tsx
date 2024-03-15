import React from 'react';
import { styled } from '@mui/material/styles';
//dnd
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
//icon
import InfoIcon from '@mui/icons-material/Info';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
//components
import {
    IconButton,
    Stack,
} from '@mui/material';

interface IGridBoxItemHandleProps {
    dragHandleProps?:  DraggableProvidedDragHandleProps | null;
    callbackDelete?: () => void;
    callbackInfo?: () => void;
}

const ElementsController: React.FC<IGridBoxItemHandleProps> = (props) => 
{
    const {
        dragHandleProps,
        callbackDelete,
        callbackInfo,
    } = props;

    return (
        <ItemControlBox
            direction={'row'}
            spacing={1}
        >
            {
                dragHandleProps &&
                    <IconButtonBox
                        area-aria-label='move'
                        size="small"
                        {...dragHandleProps}
                    >
                        <DragIndicatorIcon />
                    </IconButtonBox>
            }
            {
                callbackInfo &&
                    <IconButtonBox
                        area-aria-label='info'
                        size="small"
                        onClick={(event) => 
                        {
                            event.stopPropagation();
                            if(typeof callbackInfo === 'function')
                            {
                                callbackInfo();
                            }
                        }}
                    >
                        <InfoIcon />
                    </IconButtonBox>
            }
            <IconButtonBox
                area-aria-label='delete'
                size="small"
                onClick={(event) => 
                {
                    event.stopPropagation();
                    if(typeof callbackDelete === 'function')
                    {
                        callbackDelete();
                    }
                }}
            >
                <DeleteIcon />
            </IconButtonBox>
        </ItemControlBox>
    );
};

const ItemControlBox = styled(Stack)`
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 2px 6px;
    background-color : ${({theme}) => 
    {
        return theme.palette.backgroundTheme.light;
    }};
    border-bottom: 1px solid ${({theme}) => 
    {
        return theme.palette.dividerTheme.light;
    }};
    border-left: 1px solid ${({theme}) => 
    {
        return theme.palette.dividerTheme.light;
    }};
    border-radius: 0 6px 0 6px;
    box-shadow: -3px 3px 8px 0 rgba(0, 0, 0, 0.05);
`;

const IconButtonBox = styled(IconButton)`
    color: ${({theme}) => 
    {
        return theme.palette.svgColor.main;
    }};
`;

export default ElementsController;