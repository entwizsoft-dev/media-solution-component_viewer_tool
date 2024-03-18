import React from 'react';
import { styled } from '@mui/material/styles';
//dnd
import DroppableList from '@/components/dnd/DroppableList';
import DraggableItem from '@/components/dnd/DraggableItem';
import {
    DragDropContext,
    DropResult,
} from 'react-beautiful-dnd';
//type
import { IDataFilterRowProps } from './DataTemplateFilterRow';
import {
    ITemplateKeyGroupProps,
    ITemplateKeyProps,
} from '../../factoryOptions/part/SelectDataTemplate';
//icon
import AddIcon from '@mui/icons-material/Add';
//components
import {
    Box,
    Stack,
    Button,
} from '@mui/material';
import DataTemplateFilterRow from './DataTemplateFilterRow';

export interface IStateProrps<T> {
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
}


//필터 생성 이벤트 타입
export type ICreateFilterHandlerProps = (type: 'object' | 'group') => void;

interface IDataTemplateFilterPopoverProps {
    allTempaltekeyData: ITemplateKeyProps | null;
    currentTemplateData:ITemplateKeyGroupProps | null;
    whereClause: IStateProrps<IDataFilterRowProps[]>;
}

const DataTemplateFilterPopover: React.FC<IDataTemplateFilterPopoverProps> = (props) => 
{
    const {
        currentTemplateData,
        allTempaltekeyData,
        whereClause,
    } = props;

    const onDragEnd = ({ source, destination }: DropResult) => 
    {
        whereClause.setState(prev => 
        {
            if(destination)
            {
                const newPrev = [...prev];
    
                const [targetItem] = newPrev.splice(source.index, 1);
                if(destination.index === 0)
                {
                    //remove chaining
                    newPrev.splice(destination.index, 0, {...targetItem, chaining: undefined});
                    return newPrev;
                }

                newPrev.splice(destination.index, 0, targetItem);
                return newPrev;
            }

            return prev;
        });
    };

    return (
        <Area>
            <Wrap>
                {
                    Array.isArray(whereClause.state) &&
                        <DragDropContext
                            onDragEnd={onDragEnd}
                        >
                            <DroppableList
                                droppableId='datatemplateFilter'
                                type='all'
                            >
                                <FilterList
                                    spacing={1}
                                >
                                    {
                                        whereClause.state.map((d,i) => 
                                        {
                                            return (
                                                <DraggableItem
                                                    key={i}
                                                    itemId={'filterItem' + i}
                                                    itemIndex={i}
                                                >
                                                    {
                                                        (provided) => 
                                                        {
                                                            return (
                                                                <DataTemplateFilterRow
                                                                    idx={i}
                                                                    currentTemplateData={currentTemplateData}
                                                                    allTempaltekeyData={allTempaltekeyData}
                                                                    whereClause={whereClause}
                                                                    dragHandleProps={provided.dragHandleProps}
                                                                />
                                                            );
                                                        }
                                                    }
                                                </DraggableItem>
                                            );
                                        })
                                    }
                                </FilterList>
                            </DroppableList>
                        </DragDropContext>
                }
                <CreateItem
                    alignItems={'flex-start'}
                >
                    <Button
                        color='info'
                        size='small'
                        startIcon={
                            <AddIcon/>
                        }
                        onClick={() => 
                        {
                            whereClause.setState(prev => 
                            {
                                return [...prev, {}];
                            });
                        }}
                    >
                        필터 추가
                    </Button>
                </CreateItem>
            </Wrap>
            <Bottom>
                <Button
                    color='info'
                    size='small'
                    sx={{
                        fontWeight: 400,
                    }}
                    onClick={() => 
                    {
                        whereClause.setState([]);
                    }}
                >
                    필터 초기화
                </Button>
            </Bottom>
        </Area>
    );
};

const Area = styled(Box)`
    position: relative;
    font-size: 14px;
    min-width: 250px;
`;

const Wrap = styled(Box)`
    padding: 8px 16px;
`;

const CreateItem = styled(Stack)`
    
`;

const FilterList = styled(Stack)`

`;

const Bottom = styled(Box)`
    padding: 8px 16px;
    border-top: 1px solid;
    border-color: ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
`;

export default DataTemplateFilterPopover;