import React from 'react';
//type
import { IPartOptionComponentsProps } from '../OptionPartMapping';
//components
import {
    Box,
    FormLabel,
    Slider,
    styled,
} from '@mui/material';

export const RangeSlider: React.FC<IPartOptionComponentsProps<string>> = (props) => 
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
        defaultProps,
        label,
        value,
        // bind,
    } = data;

    return (
        <RangeSliderBox>
            <FormLabel>{label}</FormLabel>
            <SliderBox>
                <Slider
                    valueLabelDisplay="auto"
                    min={defaultProps?.min}
                    max={defaultProps?.max}
                    step={defaultProps?.step}
                    marks={defaultProps?.marks || false}
                    value={Number(value) || 0}
                    valueLabelFormat={(v) => 
                    {
                        if(typeof defaultProps?.valueLabelFormat === 'string')
                        {
                            return v + ` ${defaultProps.valueLabelFormat}`;
                        }
                        else
                        {
                            return v;
                        }
                    }}
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
            </SliderBox>
        </RangeSliderBox>
    );
};

const RangeSliderBox = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
`;

const SliderBox = styled(Box)`
    padding: 0 8px;
    box-sizing: border-box;
`;