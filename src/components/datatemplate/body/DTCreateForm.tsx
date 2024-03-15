import React from 'react';
import { styled } from '@mui/material/styles';
//dnd
import {
    Draggable,
} from 'react-beautiful-dnd';
import { useDraggableInPortal } from '@/hooks/useDraggableInPortal';
//type
import {
    IPrimalDataTypeProps,
} from '../interface/element.interface';
//json
import basicElements from '../json/basicElements';
//utils
import { elDataConversion } from '../utils/elDataConversion';
//context
import { useDTLayoutContext } from '../DTLayoutContext';
//icon
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
//components
import {
    Box,
    Stack,
    TextField,
    Button,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

interface IDTCreateFormProps {
    dropPlaceHolader?: React.ReactNode;
}

const DTCreateForm: React.FC<IDTCreateFormProps> = (props) => 
{
    const {
        dropPlaceHolader,
    } = props;
    //context
    const {
        optionAside,
        template,
        focusItem,
    } = useDTLayoutContext();
    //hooks
    const renderDraggable = useDraggableInPortal();

    return (
        <Box>
            <StackArea
                spacing={1}
            >
                {
                    template.state.map((d,i) => 
                    {
                        return (
                            <Draggable
                                draggableId={'drag' + i}
                                index={i}
                                key={i}
                            >
                                {
                                    renderDraggable((provided) => 
                                    {
                                        return (
                                            <ItemBox
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                direction="row"
                                                spacing={2}
                                                sx={{
                                                    borderColor: `${
                                                        focusItem.state?.index === i ? 'primary.main' : 'transparent'
                                                    }`,
                                                }}
                                                onClick={(e) => 
                                                {
                                                    e.stopPropagation();
                                                    focusItem.setState({
                                                        index: i,
                                                    });
                                                    optionAside.setState(true);
                                                }}
                                            >
                                                <DragBtn
                                                    onClick={(e) => 
                                                    {
                                                        e.stopPropagation();
                                                    }}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <DragIndicatorIcon
                                                        color='inherit'
                                                    />
                                                </DragBtn>
                                                <TextField
                                                    fullWidth
                                                    label="key"
                                                    value={d.key || ''}
                                                    onChange={(e) => 
                                                    {
                                                        const value = e.currentTarget.value;
                                                        template.setState(prev => 
                                                        {
                                                            const newArr = [...prev];
                                                            newArr[i].key = value;
                                                            return newArr;
                                                        });
                                                    }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="label"
                                                    value={d.label || ''}
                                                    onChange={(e) => 
                                                    {
                                                        const value = e.currentTarget.value;
                                                        template.setState(prev => 
                                                        {
                                                            const newArr = [...prev];
                                                            newArr[i].label = value;
                                                            return newArr;
                                                        });
                                                    }}
                                                />
                                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                                    <InputLabel>Data Type</InputLabel>
                                                    <Select
                                                        label="Data Type"
                                                        value={d.dataType || 'string'}
                                                        onChange={(e) => 
                                                        {
                                                            const value = e.target.value as IPrimalDataTypeProps;
                                                            template.setState(prev => 
                                                            {
                                                                const newArr = [...prev];
                                                                newArr[i].dataType = value;
                                                                return newArr;
                                                            });
                                                        }}
                                                    >
                                                        {
                                                            d.dataTypeList ?
                                                                d.dataTypeList.map((dtld,dtli) => 
                                                                {
                                                                    return (
                                                                        <MenuItem
                                                                            key={dtli}
                                                                            value={dtld}
                                                                        >
                                                                            {dtld}
                                                                        </MenuItem>
                                                                    );
                                                                })
                                                                :
                                                                [
                                                                    'string',
                                                                    'integer',
                                                                    'boolean',
                                                                    'array',
                                                                    'object',
                                                                    'date',
                                                                ].map((dtld,dtli) => 
                                                                {
                                                                    return (
                                                                        <MenuItem
                                                                            key={dtli}
                                                                            value={dtld}
                                                                        >
                                                                            {dtld}
                                                                        </MenuItem>
                                                                    );
                                                                })
                                                        }
                                                    </Select>
                                                </FormControl>
                                                <Button
                                                    fullWidth
                                                    variant='outlined'
                                                    onClick={() => 
                                                    {
                                                        optionAside.setState(true);
                                                    }}
                                                >
                                                    타입 : {d.name}
                                                </Button>
                                                <IconButton
                                                    onClick={(e) => 
                                                    {
                                                        e.stopPropagation();
                                                        focusItem.setState({
                                                            index: i,
                                                        });
                                                        optionAside.setState(true);
                                                    }}
                                                >
                                                    <SettingsIcon/>
                                                </IconButton>
                                                <IconButton
                                                    onClick={(e) => 
                                                    {
                                                        e.stopPropagation();
                                                        template.setState(prev => 
                                                        {
                                                            return prev.filter(item => 
                                                            {
                                                                return item.key !== d.key;
                                                            });
                                                        });
                                                        focusItem.setState(null);
                                                        optionAside.setState(false);
                                                    }}
                                                >
                                                    <DeleteIcon
                                                        color='error'
                                                    />
                                                </IconButton>
                                            </ItemBox>
                                        );
                                    })
                                }
                            </Draggable>
                        );
                    })
                }
                {dropPlaceHolader}
            </StackArea>
            <CreateBtn
                fullWidth
                variant='contained'
                startIcon={<AddIcon/>}
                onClick={() => 
                {
                    const json = elDataConversion(basicElements[0]);

                    template.setState(prev => 
                    {
                        return [...prev, json];
                    });
                    //생성 한 컴포넌트로 focus
                    focusItem.setState({
                        index: template.state.length,
                    });
                    optionAside.setState(true);
                }}
            >
                Add Object Form Data
            </CreateBtn>
        </Box>
    );
};

const StackArea = styled(Stack)`
    transition: none;
    & > * {
        transition: none !important;
    }
`;

const ItemBox = styled(Stack)`
    position: relative;
    border: 1px solid;
    padding: 0.875rem 1rem;
    transition: 0.3s;
    cursor: pointer;
`;

const DragBtn = styled(IconButton)`
    padding: 0;
    color: ${({theme}) => 
    {
        return theme.palette.btnColor.main;
    }};
`;

const CreateBtn = styled(Button)`
    height: 3rem;
    margin-top: 1rem;
`;

export default DTCreateForm;