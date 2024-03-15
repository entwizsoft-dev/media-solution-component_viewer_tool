import React from 'react';
//type
import { IPartOptionComponentsProps } from '../OptionPartMapping';
import { ISelectionItemDataProps } from '@/components/datatemplate/interface/element.interface';
//components
import {
    Box,
    FormLabel, styled,
} from '@mui/material';
import CheckList from '@/components/input/CheckList';

export const Selection: React.FC<IPartOptionComponentsProps<ISelectionItemDataProps[]>> = (props) => 
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
        defaultProps,
        // bind,
    } = data;
    
    return (
        <SelectionBox>
            <FormLabel>{label}</FormLabel>
            <CheckList
                data={value}
                disabled={defaultProps?.disabled || false}
                useCreate={defaultProps?.useCreate || false}
                useRemove={defaultProps?.useRemove || false}
                useValues={defaultProps?.useValues || false}
                multiple={defaultProps?.multiple || false}
                callbackCheckbox={(v) => 
                {
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
                                            option[childIndex].value = {...option[childIndex].value, checked: v.value };
                                        }
                                    }
                                    else
                                    {
                                        option.value[v.index] = {...option.value[v.index], checked: v.value };
                                    }
                                }
                            }
                        }
                        return newarr;
                    });
                }}
                callbackRadiobox={(v) => 
                {
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
                                            const res = option[childIndex].value.map((d: ISelectionItemDataProps, i: number) => 
                                            {
                                                const json = {
                                                    ...d,
                                                    checked: i == v.index,
                                                };
                                                return json;
                                            });
                                            option[childIndex].value = res;
                                        }
                                    }
                                    else
                                    {
                                        const res = option.value.map((d: ISelectionItemDataProps,i: number) => 
                                        {
                                            const json = {
                                                ...d,
                                                checked: i == v.index,
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
                callbackLabel={(v) => 
                {
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
                                            option[childIndex].value[v.index].label = v.value;
                                        }
                                    }
                                    else
                                    {
                                        option.value[v.index].label = v.value;
                                    }
                                }
                            }
                        }
                        return newarr;
                    });
                }}
                callbackValue={(v) => 
                {
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
                                            option[childIndex].value[v.index].value = v.value;
                                        }
                                    }
                                    else
                                    {
                                        option.value[v.index].value = v.value;
                                    }
                                }
                            }
                        }
                        return newarr;
                    });
                }}
                callbackRemove={(v) => 
                {
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
                                            option[childIndex].value.splice(v.index,1);
                                        }
                                    }
                                    else
                                    {
                                        option.value.splice(v.index,1);
                                    }
                                }
                            }
                        }
                        return newarr;
                    });
                }}
                callbackCreate={() => 
                {
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
                                            option[childIndex].value = [...option[childIndex].value, {label: 'item' + (option[childIndex].value.length + 1)}];
                                        }
                                    }
                                    else
                                    {
                                        option.value = [...option.value, {label: 'item' + (option.value.length + 1)}];
                                    }
                                }
                            }
                        }
                        return newarr;
                    });
                }}
            />
        </SelectionBox>
    );
};

const SelectionBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
`;