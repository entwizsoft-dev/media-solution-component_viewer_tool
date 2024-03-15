import React from 'react';
//type
import { IPartComponentsProps } from '../PartMapping';
//utils
import { matchkey } from '../../utils/matchkey';
//components
import {
    TextField,
} from '@mui/material';

export const Text: React.FC<IPartComponentsProps> = (props) => 
{
    const {
        data,
        formRegister,
        collectionData,
    } = props;

    const {
        key,
        label = 'text',
        option,
    } = data;

    return (
        <TextField
            label={label}
            defaultValue={collectionData?.[key] || matchkey('defaultValue', option) || ''}
            placeholder={matchkey('placeholder', option) || ''}
            helperText={matchkey('helperText', option) || ''}
            fullWidth={matchkey('fullWidth', option) || false}
            inputProps={{
                maxLength: matchkey('maxLength', option) || undefined,
            }}
            {...formRegister(key)}
        />
    );
};