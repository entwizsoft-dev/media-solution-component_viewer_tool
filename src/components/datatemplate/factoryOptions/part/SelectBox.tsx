import React from 'react';
//type
import { ITemplateDataProps } from '@/components/datatemplate/interface/element.interface';
import { IPartOptionComponentsProps } from '../OptionPartMapping';
import { ISelectionItemDataProps } from '@/components/datatemplate/interface/element.interface';
//utils
import { dedupe } from '@/components/datatemplate/utils/dedupe';
import { bindAction } from '@/components/datatemplate/utils/bindAction';
//components
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';

export const SelectBox: React.FC<IPartOptionComponentsProps<ISelectionItemDataProps[]>> = (props) => 
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
        bind,
    } = data;
    
    return (
        <FormControl
            sx={{
                width: '100%',
            }}
        >
            <InputLabel>{label}</InputLabel>
            <Select
                value={dedupe('checked', 'value', value) || ''}
                label={label}
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




                    const updatebind = (prev: ITemplateDataProps[], result: any) => 
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
                                const option = newarr[parentIndex]?.option?.find(el => 
                                {
                                    if(Array.isArray(el))
                                    {
                                        if(typeof childIndex === 'number')
                                        {
                                            return el[childIndex].key === bind?.key;
                                        }
                                    }
                                    else
                                    {
                                        return el.key === bind?.key;
                                    }
                                });
                    
                                if(option)
                                {
                                    if(Array.isArray(option))
                                    {
                                        if(typeof childIndex === 'number')
                                        {
                                            Object.assign(option[childIndex], result);
                                        }
                                    }
                                    else
                                    {
                                        Object.assign(option, result);
                                    }
                                }
                            }
                        }
                        return newarr;
                    };


                    if(bind && typeof bind.action === 'string')
                    {
                        const res = bindAction(bind.action, v);

                        if(res instanceof Promise)
                        {
                            res.then((resolve) => 
                            {
                                template.setState(prev => 
                                {
                                    return updatebind(prev, resolve);
                                });
                            })
                                .catch((error) => 
                                {
                                    console.log(error);
                                });
                        }
                        else
                        {
                            template.setState(prev => 
                            {
                                return updatebind(prev, res);
                            });
                        }
                    }
                }}
            >
                {
                    Array.isArray(value) &&
                    value.map((d,i) => 
                    {
                        return (
                            <MenuItem
                                key={i}
                                value={d.value || ''}
                            >
                                {d.label || '-'}
                            </MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    );
};