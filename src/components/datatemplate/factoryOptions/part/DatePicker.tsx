import React from 'react';
//type
import { IPartOptionComponentsProps } from '../OptionPartMapping';
import { IStartDate } from '@/components/input/DateRangePicker';
//components
import DateRangePicker from '@/components/input/DateRangePicker';

export const DatePicker: React.FC<IPartOptionComponentsProps<Date>> = (props) => 
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
        <DateRangePicker
            title={label}
            range={false}
            defaultDate={value}
            callbackDate={(start) => 
            {
                const v = start as IStartDate;
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