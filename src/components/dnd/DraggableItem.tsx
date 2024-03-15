import React from 'react';
import {
    Draggable,
    DraggableProvided, 
} from 'react-beautiful-dnd';
import { useDraggableInPortal } from '@/hooks/useDraggableInPortal';
//components
import {
    Box,
} from '@mui/material';

interface IDraggableItemProps {
    itemId: any;
    itemIndex: number;
    children?: (provided: DraggableProvided) => React.ReactNode;
}

const DraggableItem: React.FC<IDraggableItemProps> = (props) => 
{
    const {
        itemId,
        itemIndex,
        children,
    } = props;
    //hooks
    const renderDraggable = useDraggableInPortal();

    return (
        <Draggable
            draggableId={itemId}
            index={itemIndex}
        >
            {
                renderDraggable((provided) => 
                {
                    return (
                        <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                        >
                            {
                                typeof children === 'function' &&
                                children(provided)
                            }
                        </Box>
                    );
                })
            }
        </Draggable>
    );
};

export default DraggableItem;
