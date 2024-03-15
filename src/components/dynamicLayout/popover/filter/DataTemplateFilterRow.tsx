import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
//dnd
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
//type
import { IStateProrps } from '@/components/transferList/interface/context.interface';
import {
    ITemplateKeyGroupProps,
    ITemplateKeyProps,
} from '../../factoryOptions/part/SelectDataTemplate';
//icon
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
//components
import {
    FormControl,
    Select,
    MenuItem,
    Stack,
    StackProps,
    TextField,
    Popover,
    List,
    ListItemText,
    ListItemButton,
    IconButton,
    Button,
} from '@mui/material';
import RecursiveFilterPopover from './RecursiveFilterPopover';
//필터 아이템 row
const ItemRow: React.FC<StackProps> = (props) => 
{
    return (
        <Stack
            spacing={4}
            direction={'row'}
            {...props}
        />
    );
};
//필터 아이템 form의 row
const ItemStack: React.FC<StackProps> = (props) => 
{
    return (
        <Stack
            spacing={0.5} 
            direction={'row'}
            {...props}
        />
    );
};

type IOperatorProps = '$eq' | '$gt' | '$gte' | '$lt' | '$lte' | '$ne';
type IChainingProps = '$and' | '$or';

export interface IDataFilterRowProps {
    column?: string;
    value?: string;
    operator?: IOperatorProps;
    chaining?: IChainingProps;
}

interface IDataTemplateFilterRowProps {
    idx: number;
    allTempaltekeyData: ITemplateKeyProps | null;
    currentTemplateData: ITemplateKeyGroupProps | null;
    whereClause: IStateProrps<IDataFilterRowProps[]>;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

const DataTemplateFilterRow: React.FC<IDataTemplateFilterRowProps> = (props) => 
{
    const {
        idx, //해당 아이템의 위치 정보 값
        currentTemplateData,
        allTempaltekeyData,
        whereClause,
        dragHandleProps,
    } = props;
    //el state
    const [moreEl, setMoreEl] = useState<HTMLButtonElement | null>(null);
    const [customSelectEl, setCustomSelectEl] = useState<HTMLButtonElement | null>(null);
    //var
    const currentValue = whereClause.state?.[idx]?.value;
    const currentChaining = whereClause.state?.[idx]?.chaining;
    const currentColumn = whereClause.state?.[idx]?.column;
    //state
    const [isCustom, setIsCustom] = useState((typeof currentValue === 'string' && !/^\$/.test(currentValue))); //value 커스텀 여부


    useEffect(() => 
    {
        setIsCustom((typeof currentValue === 'string' && !/^\$/.test(currentValue)));
    }, [currentValue]);

    return (
        <>
            <FilterItem
                justifyContent={'space-between'}
            >
                <FilterItemForm>
                    <IconButton
                        size='small'
                        {...dragHandleProps}
                    >
                        <DragIndicatorIcon/>
                    </IconButton>
                    {
                        idx > 0 &&
                            <FormControl>
                                <FilterSelect
                                    name='chaining'
                                    value={currentChaining || ''}
                                    onChange={(e) => 
                                    {
                                        const value = e.target.value as IChainingProps;

                                        whereClause.setState(prev => 
                                        {
                                            const newPrev = [...prev];
            
                                            if(!newPrev?.[idx])
                                            {
                                                newPrev[idx] = {};
                                            }
                                            const json = {...newPrev[idx], chaining: value};
                                            newPrev.splice(idx, 1, json);
            
                                            return newPrev;
                                        });
                                    }}
                                >
                                    <MenuItem value="$and">AND</MenuItem>
                                    <MenuItem value="$or">OR</MenuItem>
                                </FilterSelect>
                            </FormControl>
                    }
                    {
                        currentTemplateData &&
                            <FormControl>
                                <CustomSelectBtn
                                    variant='outlined'
                                    size='small'
                                    color='info'
                                    endIcon={<ArrowDropDownIcon/>}
                                    onClick={(e) => 
                                    {
                                        setCustomSelectEl(e.currentTarget);
                                    }}
                                >
                                    {currentColumn?.split('.')?.[currentColumn.split('.').length - 1] || '-'}
                                </CustomSelectBtn>
                                {
                                    customSelectEl &&
                                        <RecursiveFilterPopover
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                            }}
                                            defaultAnchorEl={customSelectEl}
                                            currentTemplateData={currentTemplateData}
                                            allTempaltekeyData={allTempaltekeyData}
                                            onClose={() => 
                                            {
                                                setCustomSelectEl(null);
                                            }}
                                            callbackSelect={(result) => 
                                            {
                                                whereClause.setState(prev => 
                                                {
                                                    const newPrev = [...prev];

                                                    if(!newPrev?.[idx])
                                                    {
                                                        newPrev[idx] = {};
                                                    }
                                                    const json = {...newPrev[idx], column: result};
                                                    newPrev.splice(idx, 1, json);

                                                    return newPrev;
                                                });
                                            }}
                                        />
                                }
                            </FormControl>
                    }
                    <FormControl>
                        <FilterSelect
                            name='operator'
                            defaultValue={'$eq'}
                            value={whereClause.state?.[idx]?.operator || ''}
                            onChange={(e) => 
                            {
                                const value = e.target.value as IOperatorProps;

                                whereClause.setState(prev => 
                                {
                                    const newPrev = [...prev];

                                    if(!newPrev?.[idx])
                                    {
                                        newPrev[idx] = {};
                                    }
                                    const json = {...newPrev[idx], operator: value};
                                    newPrev.splice(idx, 1, json);

                                    return newPrev;
                                });
                            }}
                        >
                            <MenuItem value="$eq">{'='}</MenuItem>
                            <MenuItem value="$gt">{'>'}</MenuItem>
                            <MenuItem value="$gte">{'≧'}</MenuItem>
                            <MenuItem value="$lt">{'<'}</MenuItem>
                            <MenuItem value="$lte">{'≦'}</MenuItem>
                            <MenuItem value="$ne">{'≠'}</MenuItem>
                        </FilterSelect>
                    </FormControl>
                    <FormControl>
                        <FilterSelect
                            value={(typeof currentValue === 'string' && !/^\$/.test(currentValue)) ? 'custom' : ( typeof currentValue === 'string' ? currentValue : '')}
                            onChange={(e) => 
                            {
                                const value = e.target.value as string;
                                setIsCustom(value === 'custom');

                                whereClause.setState(prev => 
                                {
                                    const newPrev = [...prev];
        
                                    if(!newPrev?.[idx])
                                    {
                                        newPrev[idx] = {};
                                    }
                                    const json = {...newPrev[idx], value: value !== 'custom' ? value : ''};
                                    newPrev.splice(idx, 1, json);
        
                                    return newPrev;
                                });
                            }}
                        >
                            <MenuItem value="$myself">이용자</MenuItem>
                            <MenuItem value="custom">직접 입력</MenuItem>
                        </FilterSelect>
                    </FormControl>
                    {
                        isCustom &&
                            <FilterInput
                                hiddenLabel
                                name='value'
                                variant="filled"
                                size='small'
                                value={whereClause.state?.[idx]?.value || ''}
                                onChange={(e) => 
                                {
                                    const value = e.target.value;

                                    whereClause.setState(prev => 
                                    {
                                        const newPrev = [...prev];
        
                                        if(!newPrev?.[idx])
                                        {
                                            newPrev[idx] = {};
                                        }
                                        const json = {...newPrev[idx], value: value};
                                        newPrev.splice(idx, 1, json);
        
                                        return newPrev;
                                    });
                                }}
                            />
                    }
                </FilterItemForm>
                <IconButton
                    size='small'
                    onClick={(e) => 
                    {
                        setMoreEl(e.currentTarget);
                    }}
                >
                    <MoreVertIcon/>
                </IconButton>
            </FilterItem>
            {/* row 설정 popover */}
            <Popover
                open={Boolean(moreEl)}
                anchorEl={moreEl}
                onClose={() => 
                {
                    setMoreEl(null);
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List   
                    dense={true}
                    disablePadding
                >
                    <ListItemButton
                        onClick={() => 
                        {
                            whereClause.setState(prev => 
                            {
                                const newPrev = [...prev];
                                newPrev.splice(idx + 1, 0, new Object);
                                return newPrev;
                            });
                            setMoreEl(null);
                        }}
                    >
                        <ListItemText
                            primary="추가"
                            secondary={'현재 행 아래에 추가됩니다.'}
                        />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => 
                        {
                            whereClause.setState(prev => 
                            {
                                const newPrev = [...prev];
                                newPrev.splice(idx, 1);
                                return newPrev;
                            });
                            setMoreEl(null);
                        }}
                    >
                        <ListItemText
                            primary="삭제"
                        />
                    </ListItemButton>
                </List>
            </Popover>
        </>
    );
};

const FilterItem = styled(ItemRow)`
    
`;

const FilterItemForm = styled(ItemStack)`
    
`;

//item
const FilterSelect = styled(Select)`
    font-size: 12px;
    height: 32px;
    background-color: ${({theme}) => 
    {
        return theme.palette.dataTemplateFilterSelectBg.main;
    }};
`;

const FilterInput = styled(TextField)`
    width: 80px;
    .MuiFilledInput-input {
        font-size: 12px;
        padding-top: 6px;
        padding-bottom: 7px;
    }
`;

const CustomSelectBtn = styled(Button)`
    font-size: 12px;
    font-weight: 400;
    height: 32px;
    border-radius: 4px;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.main;
    }};
    background-color: ${({theme}) => 
    {
        return theme.palette.dataTemplateFilterSelectBg.main;
    }};
`;

export default DataTemplateFilterRow;