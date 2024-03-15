import React from 'react';
//type
import { IPartComponentsProps } from '../PartMapping';
//utils
import { matchkey } from '../../utils/matchkey';
//components
import {
    TextField,
} from '@mui/material';

export const TextArea: React.FC<IPartComponentsProps> = (props) => 
{
    const {
        data,
        formRegister,
        collectionData,
    } = props;

    const {
        key,
        label = 'textarea',
        option,
    } = data;

    return (
        <TextField
            multiline
            label={label}
            defaultValue={collectionData?.[key] || matchkey('defaultValue', option) || ''}
            placeholder={matchkey('placeholder', option) || ''}
            helperText={matchkey('helperText', option) || ''}
            fullWidth={matchkey('fullWidth', option) || false}
            minRows={matchkey('minRows', option) || 3}
            maxRows={matchkey('maxRows', option) || undefined}
            inputProps={{
                maxLength: matchkey('maxLength', option) || undefined,
            }}
            {...formRegister(key)}
        />
    );
};