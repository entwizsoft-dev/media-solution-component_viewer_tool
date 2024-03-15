import React from 'react';
import { styled } from '@mui/material/styles';
//dnd
import {
    DragDropContext,
    Droppable,
} from 'react-beautiful-dnd';
//context
import { useDTLayoutContext } from '../DTLayoutContext';
//components
import {
    Box,
    Container,
    Paper,
} from '@mui/material';
import DTCreateForm from './DTCreateForm';

const DTBody = () => 
{
    //context
    const {
        optionAside,
        optionAsideWidth,
        template,
        focusItem,
    } = useDTLayoutContext();

    return (
        <Area
            sx={{
                width: `${
                    (optionAside.state) ?
                        `calc(100% - ${optionAsideWidth}px)`
                        :
                        '100%'
                }`,
            }}
        >
            <Wrap>
                <Container>
                    <PaperArea
                        elevation={0}
                    >
                        <DragDropContext
                            onDragEnd={({ source, destination }) => 
                            {
                                if (!destination) 
                                {
                                    return;
                                }

                                template.setState(prev => 
                                {
                                    const [item] = prev.splice(source.index, 1);
                                    prev.splice(destination.index, 0, item);

                                    return prev;
                                });

                                focusItem.setState(prev => 
                                {
                                    return {
                                        ...prev,
                                        index: destination.index,
                                        type: template.state[destination.index].type,
                                    };
                                });
                            }}
                        >
                            <Droppable 
                                droppableId='droppable'
                            >
                                {
                                    (provided) => 
                                    {
                                        return (
                                            <Box
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                            >
                                                <DTCreateForm
                                                    dropPlaceHolader={provided.placeholder}
                                                />
                                            </Box>
                                        );
                                    }
                                }
                            </Droppable>
                        </DragDropContext>
                    </PaperArea>
                </Container>
            </Wrap>
        </Area>
    );
};

const Area = styled(Box)`
    position: absolute;
    top: 0;
    height: 100%;
    z-index: 1;
    transition: 0.3s;
    transform: translateX(0);
`;

const Wrap = styled(Box)`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 3rem 2rem 5rem 2rem;
    box-sizing: border-box;
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

const PaperArea = styled(Paper)`
    padding: 1rem;
`;

export default DTBody;