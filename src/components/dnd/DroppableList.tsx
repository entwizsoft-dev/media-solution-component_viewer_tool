import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import {
    Stack,
    Box,
} from '@mui/material';

interface IDroppableListProps {
    droppableId: string;
    type?: string;
    children?: React.ReactNode;

}

const DroppableList: React.FC<IDroppableListProps> = (props) => 
{
    const {
        droppableId,
        type,
        children,
    } = props;

    return (
        <Droppable
            droppableId={droppableId}
            type={type}
        >
            {(provided) => 
            {
                return (
                    <Stack
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <Box>
                            {children}
                        </Box>
                        {provided.placeholder}
                    </Stack>
                );
            }}
        </Droppable>
    );
};

export default DroppableList;
