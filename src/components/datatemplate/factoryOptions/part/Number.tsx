import React from 'react';
//type
import { IPartOptionComponentsProps } from '../OptionPartMapping';
//components
import {
    TextField,
} from '@mui/material';

export const Number: React.FC<IPartOptionComponentsProps<string>> = (props) => 
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
        key,
        label,
        value,
        // bind,
    } = data;
    
    return (
        <TextField
            type={'number'}
            fullWidth
            size='small'
            label={label || ''}
            value={
                common ?
                    template.state[parentIndex][key as 'key' | 'label']
                    :
                    value || ''
            }
            onChange={(e) => 
            {
                const v = e.currentTarget.value;
    
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
                        newarr[parentIndex][key as 'key' | 'label'] = v;
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
                                        option[childIndex].value = v;
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
            }}
        />
    );
};