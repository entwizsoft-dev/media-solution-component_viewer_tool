import React from 'react';
import { styled } from '@mui/material/styles';
//type
import { IPartOptionComponentsProps } from '../OptionPartMapping';
import { ISelectionItemDataProps } from '@/components/datatemplate/interface/element.interface';
//utils
import { dedupe } from '@/components/datatemplate/utils/dedupe';
//components
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio as MuiRadio,
    RadioGroup,
} from '@mui/material';

export const Radio: React.FC<IPartOptionComponentsProps<ISelectionItemDataProps[]>> = (props) => 
{
    const {
        data,
        common,
        parentIndex,
        siblingIndex,
        childIndex,
        template,
    } = props;

    const {
        // key,
        label,
        value,
        // bind,
    } = data;

    return (
        <Area>
            <Label>{label}</Label>
            <RadioGroup
                value={dedupe('checked', 'value', value)}
                onChange={(e) => 
                {
                    const v = e.target.value;

                    template.setState(prev => 
                    {
                        const newarr = prev.map(item => 
                        {
                            return {
                                ...item,
                                option: item.option?.map(opt => 
                                {
                                    if(Array.isArray(opt))
                                    {
                                        return [...opt];
                                    }
                                    else
                                    {
                                        return {...opt};
                                    }
                                }),
                            };
                        });
        
                        if(common) //common
                        {
                            // newarr[parentIndex][key as 'key' | 'label'] = v;
                        }
                        else
                        {
                            if(typeof siblingIndex === 'number')
                            {
                                const option = newarr[parentIndex]?.option?.[siblingIndex];
        
                                if(option)
                                {
                                    if(Array.isArray(option))
                                    {
                                        if(typeof childIndex === 'number')
                                        {

                                            const res = option[childIndex].value.map((d: ISelectionItemDataProps) => 
                                            {
                                                const json = {
                                                    ...d,
                                                    checked: d.value == v,
                                                };
                                                return json;
                                            });
                                            option[childIndex].value = res;
                                        }
                                    }
                                    else
                                    {
                                        const res = option.value.map((d: ISelectionItemDataProps) => 
                                        {
                                            const json = {
                                                ...d,
                                                checked: d.value == v,
                                            };
                                            return json;
                                        });
                                        option.value = res;
                                    }
                                }
                            }
                        }
                        return newarr;
                    });
                }}
            >
                {
                    Array.isArray(value) &&
                    value.map((d,i) => 
                    {
                        return (
                            <FormControlLabel
                                key={i}
                                label={d.label || ''}
                                value={d.value || ''}
                                control={
                                    <MuiRadio
                                        sx={{
                                            py: 0.5,
                                        }}
                                    />
                                }
                            />
                        );
                    })
                }
            </RadioGroup>
        </Area>
    );
};

const Area = styled(FormControl)`

`;

const Label = styled(FormLabel)`
    margin-bottom: 4px;
`;