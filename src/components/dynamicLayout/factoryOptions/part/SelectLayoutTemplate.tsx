import React, { useEffect, useState } from 'react';
//utils
import axiosGuard from '@/utils/axiosGuard';
import axiosResponseProcessor from '@/utils/axiosResponseProcessor';
//type
import { IMappingValueProps } from '../PartMapping';
import {
    ILayoutDBProps,
    ILayoutListDataProps,
} from '../../interface/layout.interface';
//components
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';

export const SelectLayoutTemplate: React.FC<IMappingValueProps<any>> = (props) => 
{
    const {
        data,
        currentLayout,
    } = props;

    const {
        key,
        label,
        value,
        // dependencies,
    } = data;
    //state
    const [templateListData, setTemplateListData] = useState<ILayoutDBProps[] | null>(null);

    //update
    useEffect(() => 
    {
        axiosGuard.get('/admin/layout/list')
            .then((res) => 
            {
                axiosResponseProcessor<ILayoutListDataProps>(res, {
                    successCallback: (result) => 
                    {
                        setTemplateListData(result.data);
                    },
                });
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
            size='small'
        >
            <InputLabel>{label}</InputLabel>
            <Select
                value={templateListData ? value || '' : ''}
                label={label}
                onChange={(e) => 
                {
                    const v = e.target.value;
                    //선택한 현재 값
                    currentLayout.setState(prev => 
                    {
                        const newarr = prev.map((d) => 
                        {
                            if (d.key !== undefined && d.key === key) 
                            {
                                return { ...d, value: v };
                            }
                            return d;
                        });
                        return newarr;
                    });
                }}
            >
                {
                    templateListData &&
                    templateListData.map((d,i) => 
                    {
                        return (
                            <MenuItem
                                key={i}
                                value={d._id || ''}
                            >
                                {d.layoutOption.layoutName || '-'}
                            </MenuItem>
                        );
                    })
                }
            </Select>
        </FormControl>
    );
};