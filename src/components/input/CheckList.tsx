import React from 'react';
import { styled } from '@mui/material/styles';
//type
import {
    ISelectionItemDataProps,
    ISelectionPropsDataProps,
} from '@/components/datatemplate/interface/element.interface';
//icon
import DeleteIcon from '@mui/icons-material/Delete';
//components
import {
    Box,
    List,
    ListItem,
    Checkbox,
    TextField,
    Stack,
    IconButton,
    Button,
    Radio,
} from '@mui/material';

type IGetLastValueProps = (arr: (ISelectionItemDataProps | undefined)[], idx: number) => boolean;

interface IParameterProps<T> {
    index: number;
    value: T;
}

interface ICheckListPorps extends ISelectionPropsDataProps {
    callbackCheckbox?: (data: IParameterProps<boolean>) => void;
    callbackRadiobox?: (data: IParameterProps<boolean>) => void;
    callbackLabel?: (data: IParameterProps<string>) => void;
    callbackValue?: (data: IParameterProps<string>) => void;
    callbackRemove?: (data: Omit<IParameterProps<string>, 'value'>) => void;
    callbackCreate?: () => void;
};

const CheckList: React.FC<ICheckListPorps> = (props) => 
{
    const {
        data, //기본 render value 값
        disabled, //label, value 수정 여부
        multiple, //단일,다중 선택 여부
        useCreate, //아이템 생성 타입
        useRemove, //아이템 삭제 가능 여부
        useValues, //벨류 지정 여부
        callbackCheckbox,
        callbackRadiobox,
        callbackLabel,
        callbackValue,
        callbackRemove,
        callbackCreate,
    } = props;

    //radio 일때 여러개의 checked 값이 있다면 마지막 값만 true로 설정
    const getLastValue: IGetLastValueProps = (arr, idx) =>
    {
        const lastIndex = arr?.findLastIndex(item => 
        {
            return item?.checked || false;
        });
        return lastIndex === idx;
    };

    return (
        <Area
        >
            {
                (Array.isArray(data) && data.length > 0) ?
                    data.map((d,i) => 
                    {
                        if(d)
                        {
                            return (
                                <ListItem
                                    key={i}
                                >
                                    <ItemRow
                                        direction={'row'}
                                        spacing={1}
                                    >
                                        {
                                            multiple ?
                                                <CheckboxItem
                                                    checked={d.checked || false}
                                                    onChange={(_,value) => 
                                                    {
                                                        if(typeof callbackCheckbox === 'function')
                                                        {
                                                            const json = {
                                                                index: i,
                                                                value: value,
                                                            };
                                                            callbackCheckbox(json);
                                                        }
                                                    }}
                                                />
                                                :
                                                <RadioItem
                                                    checked={getLastValue(data, i)}
                                                    value={d.value}
                                                    onChange={(_,value) => 
                                                    {
                                                        if(typeof callbackRadiobox === 'function')
                                                        {
                                                            const json = {
                                                                index: i,
                                                                value: value,
                                                            };
                                                            callbackRadiobox(json);
                                                        }
                                                    }}
                                                />
                                        }
                                        <Input
                                            size='small'
                                            label='label'
                                            fullWidth
                                            value={d.label || ''}
                                            disabled={disabled}
                                            onChange={(e) => 
                                            {
                                                const value = e.currentTarget.value;
                                                if(typeof callbackLabel === 'function')
                                                {
                                                    const json = {
                                                        index: i,
                                                        value: value,
                                                    };
                                                    callbackLabel(json);
                                                }
                                            }}
                                        />
                                        {
                                            useValues &&
                                                <Input
                                                    size='small'
                                                    label='value'
                                                    fullWidth
                                                    disabled={disabled}
                                                    value={d.value || ''}
                                                    onChange={(e) => 
                                                    {
                                                        const value = e.currentTarget.value;
                                                        if(typeof callbackValue === 'function')
                                                        {
                                                            const json = {
                                                                index: i,
                                                                value: value,
                                                            };
                                                            callbackValue(json);
                                                        }
                                                    }}
                                                />
                                        }
                                        {
                                            useRemove &&
                                                <IconButtonBox
                                                    area-aria-label='delete item'
                                                    size="small"
                                                    onClick={(e) => 
                                                    {
                                                        e.stopPropagation();
    
                                                        if(typeof callbackRemove === 'function')
                                                        {
                                                            const json = {
                                                                index: i,
                                                            };
                                                            callbackRemove(json);
                                                        }
                                                    }}
                                                >
                                                    <DeleteRedIcon />
                                                </IconButtonBox>
                                        }
                                    </ItemRow>
                                </ListItem>
                            );
                        }
                    })
                    :
                    <EmptyBox>아이템이 없습니다.</EmptyBox>
            }
            {
                useCreate &&
                    <ListItem>
                        <Button
                            fullWidth
                            variant='contained'
                            onClick={() => 
                            {
                                if(typeof callbackCreate === 'function')
                                {
                                    callbackCreate();
                                }
                            }}
                        >
                            add item +
                        </Button>
                    </ListItem>
            }
        </Area>
    );
};

const Area = styled(List)`
    width: 100%;
    min-height: 210px;
    max-height: 310px;
    border: 1px solid;
    border-color: ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0.75rem;
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
        border: 2px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
        border-radius: 0.75rem;;
    }
    &::-webkit-scrollbar-button {
        display:none;
    }
`;

const ItemRow = styled(Stack)`
    width: 100%;
`;

const Input = styled(TextField)`
    min-width: 85px;
    flex: 1;
`;

const RadioItem = styled(Radio)`
    padding: 0;
`;

const CheckboxItem = styled(Checkbox)`
    padding: 0;
`;

const IconButtonBox = styled(IconButton)`
    color: ${({theme}) => 
    {
        return theme.palette.primary.main;
    }};
`;

const DeleteRedIcon = styled(DeleteIcon)`
    color: ${({theme}) => 
    {
        return theme.palette.error.main;
    }};
`;

const EmptyBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default CheckList;