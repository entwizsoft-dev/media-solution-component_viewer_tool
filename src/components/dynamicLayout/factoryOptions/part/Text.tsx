import React from 'react';
//utils
import { bindAction } from '../../utils/bindAction';
//type
import { IMappingValueProps } from '../PartMapping';
//components
import {
    TextField,
} from '@mui/material';

export const Text: React.FC<IMappingValueProps<string>> = (props) => 
{
    const {
        data,
        currentLayout,
    } = props;

    const {
        key,
        label,
        value,
        dependencies,
    } = data;
    
    return (
        <TextField
            type={'text'}
            fullWidth
            autoComplete='off'
            size='small'
            label={label || ''}
            value={value || ''}
            onChange={(e) => 
            {
                const v = e.currentTarget.value;

                currentLayout.setState(prev => 
                {
                    const newarr = prev.map((d) => 
                    {
                        if (d.key !== undefined && d.key === key) 
                        {
                            return { ...d, value: v };
                        }
                        else 
                        {
                            if (Array.isArray(dependencies)) 
                            {
                                dependencies.forEach(dependency => 
                                {
                                    if (d.key && dependency.targetKey.includes(d.key)) 
                                    {
                                        const bindValue = bindAction(dependency.action, v);
                                        d = { ...d, ...bindValue };
                                    }
                                });
                            }
                            return d;
                        }
                    });
                    return newarr;
                });
            }}
        />
    );
};