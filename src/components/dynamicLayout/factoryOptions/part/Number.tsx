import React from 'react';
//utils
import { bindAction } from '../../utils/bindAction';
//type
import { IMappingValueProps } from '../PartMapping';
//components
import {
    FormControl,
    OutlinedInput,
    InputAdornment,
    InputLabel,
} from '@mui/material';

export const Number: React.FC<IMappingValueProps<number>> = (props) => 
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
        <FormControl
            variant="outlined"
            fullWidth
            size='small'
        >
            <InputLabel>{label || ''}</InputLabel>
            <OutlinedInput
                type='number'
                autoComplete='off'
                label={label || ''}
                value={value || undefined}
                endAdornment={
                    <InputAdornment position="end">밀리초</InputAdornment>
                }
                onChange={(e) => 
                {
                    const v = e.currentTarget.value;

                    currentLayout.setState(prev => 
                    {
                        const newarr = prev.map((d) => 
                        {
                            if (d.key !== undefined && d.key === key) 
                            {
                                return { ...d, value: parseInt(v) };
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
        </FormControl>
    );
};