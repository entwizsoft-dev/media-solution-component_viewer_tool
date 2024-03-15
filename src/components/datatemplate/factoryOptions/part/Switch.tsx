import React from 'react';
import { styled } from '@mui/material/styles';
//utils
import { bindAction } from '@/components/datatemplate/utils/bindAction';
//type
import { IPartOptionComponentsProps } from '../OptionPartMapping';
//components
import {
    FormLabel,
    Switch as MuiSwitch,
    Box,
} from '@mui/material';

export const Switch: React.FC<IPartOptionComponentsProps<boolean>> = (props) => 
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
        <SwitchOptionBox>
            <Label>{label}</Label>
            <MuiSwitch
                checked={Boolean(value)}
                onChange={(e,v) => 
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
                                            // option[childIndex].value = v;
                                        }
                                    }
                                    else
                                    {
                                        option.value = v;
                                    }
                                }
                            }
                        }
                        return newarr;
                    });

                    ///바인드 데이터
                    if(bind && typeof bind.action === 'string')
                    {
                        const res = bindAction(bind.action, v);

                        template.setState(prev => 
                        {
                            const newarr = prev.map(item => 
                            {
                                return {
                                    ...item,
                                    option: item.option?.map(opt => 
                                    {
                                        return { ...opt };
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
                                                return el[childIndex].key === bind.key;
                                            }
                                        }
                                        else
                                        {
                                            return el.key === bind.key;
                                        }
                                    });
                    
                                    if(option)
                                    {
                                        if(Array.isArray(option))
                                        {
                                            if(typeof childIndex === 'number')
                                            {
                                                Object.assign(option[childIndex], res);
                                            }
                                        }
                                        else
                                        {
                                            Object.assign(option, res);
                                        }
                                    }
                                }
                            }
                            return newarr;
                        });
                    }
                }}
            />
        </SwitchOptionBox>
    );
};

const SwitchOptionBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    overflow: hidden;
    word-break: break-all;
`;

const Label = styled(FormLabel)`
    flex: 1;
    overflow: hidden;
    margin-right: 16px;
`;