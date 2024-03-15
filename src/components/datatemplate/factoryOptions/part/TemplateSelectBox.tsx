import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
//utils
import axiosGuard from '@/utils/axiosGuard';
import { bindAction } from '@/components/datatemplate/utils/bindAction';
//type
import {
    ITemplateDataProps,
    ITemplateListRowDataProps,
} from '@/components/datatemplate/interface/element.interface';
import { IPartOptionComponentsProps } from '../OptionPartMapping';
//components
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Chip,
} from '@mui/material';

export const TemplateSelectBox: React.FC<IPartOptionComponentsProps<ITemplateListRowDataProps>> = (props) => 
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
        bind,
    } = data;
    //state
    const [templateListData, setTemplateListData] = useState<ITemplateListRowDataProps[] | null>(null);
    //option
    const multiple = defaultProps?.multiple;

    //update
    useEffect(() => 
    {
        axiosGuard.get('template/list')
            .then((res) => 
            {
                const {
                    code,
                    data: tdata,
                } = res.data;

                if(code === 1)
                {
                    setTemplateListData(tdata.data);
                }
            })
            .catch((error) => 
            {
                console.error(error);
            });
    }, []);
    
    return (
        <FormControl
            sx={{
                width: '100%',
            }}
        >
            <InputLabel>{label}</InputLabel>
            <Select<any>
                multiple={multiple}
                value={
                    templateListData ?
                        (multiple ?
                            (value ?
                                value
                                :
                                []
                            )
                            :
                            (value || ''))
                        :
                        (multiple ? [] : '')
                }
                label={label}
                onChange={(e) => 
                {
                    const v = e.target.value;
                    
                    if(multiple)
                    {
                        //선택한 현재 값
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
                                            option.value =  v;
                                        }
                                    }
                                }
                            }

                            return newarr;
                        });
                    }
                    else
                    {
                        //선택한 현재 값
                        const currentData = templateListData?.filter((d) => 
                        {
                            return d._templateName === v;
                        });
    
                        if(currentData)
                        {
                            const curentValue = currentData[0];
                            //vlaue update
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
                                                    option[childIndex].value = curentValue._templateName;
                                                }
                                            }
                                            else
                                            {
                                                option.value = curentValue._templateName;
                                            }
                                        }
                                    }
                                }
                                return newarr;
                            });
    
                            //bind upldate event
                            const updatebind = (prev: ITemplateDataProps[], result: any) => 
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
                            
                            //bind update
                            if(bind && typeof bind.action === 'string')
                            {
                                const res = bindAction(bind.action, curentValue);
        
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
                        }
                    }
                }}
                {
                    ...(multiple && {
                        renderValue: (selected: string[]) => 
                        {
                            return (
                                <ChipBox>
                                    {
                                        selected.map((vl,vi) => 
                                        {
                                            const currentData = templateListData?.find((d) => 
                                            {
                                                return d._templateName === vl;
                                            });
                                            return (
                                                <Chip
                                                    key={vi}
                                                    label={currentData?.templateLabel || '-'}
                                                />
                                            );
                                        })
                                    }
                                </ChipBox>
                            );
                        },
                    })
                }
            >
                {
                    templateListData &&
                    templateListData.map((d,i) => 
                    {
                        return (
                            <MenuItem
                                key={i}
                                value={d._templateName || ''}
                            >
                                {d.templateLabel || '-'}
                            </MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    );
};

const ChipBox = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;