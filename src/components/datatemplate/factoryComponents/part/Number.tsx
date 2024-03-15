import React from 'react';
//utils
import { matchkey } from '../../utils/matchkey';
//type
import { IPartComponentsProps } from '../PartMapping';
//components
import {
    TextField,
    InputAdornment,
} from '@mui/material';

export const Number: React.FC<IPartComponentsProps> = (props) => 
{
    const {
        data,
        formRegister,
        collectionData,
    } = props;

    const {
        key,
        label = 'number',
        option,
    } = data;

    const numberValue = (num?: number) => 
    {
        if(num && !isNaN(num))
        {
            return parseFloat(String(num));
        }

        return undefined;
    };

    return (
        <TextField
            type='number'
            label={label}
            defaultValue={collectionData?.[key] || matchkey('defaultValue', option) || ''}
            placeholder={matchkey('placeholder', option) || ''}
            helperText={matchkey('helperText', option) || ''}
            fullWidth={matchkey('fullWidth', option) || false}
            required={matchkey('required', option) || false}
            inputProps={{
                min: numberValue(matchkey('min', option)),
                max: numberValue(matchkey('max', option)),
            }}
            InputProps={{
                startAdornment: (
                    matchkey('startAdornment', option) &&
                        <InputAdornment
                            position="start"
                        >
                            {matchkey('startAdornment', option)}
                        </InputAdornment>
                ),
                endAdornment: (
                    matchkey('endAdornment', option) &&
                        <InputAdornment
                            position="end"
                        >
                            {matchkey('endAdornment', option)}
                        </InputAdornment>
                ),
            }}
            {...formRegister(key)}
        />
    );
};