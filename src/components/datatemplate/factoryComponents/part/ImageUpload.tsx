import React from 'react';
//utils
import { matchkey } from '../../utils/matchkey';
import { dedupe } from '../../utils/dedupe';
//type
import { IPartComponentsProps } from '../PartMapping';
//components
import {
    FormControl,
    FormLabel,
} from '@mui/material';
import ImageFileUpload from '@/components/input/ImageFileUpload';

export const ImageUpload: React.FC<IPartComponentsProps> = (props) => 
{
    const {
        data,
        formSetValue,
        collectionData,
    } = props;

    const {
        key,
        label,
        option,
    } = data;

    return (
        <FormControl
            fullWidth
        >
            {
                (label && label.trim() !== '') &&
                    <FormLabel
                        sx={{
                            mb: 1.5,
                        }}
                    >
                        {label || ''}
                    </FormLabel>
            }
            <ImageFileUpload
                width={matchkey('width', option) || 400}
                height={matchkey('height', option) || 225}
                fullWidth={matchkey('fullWidth', option) || false}
                multiple={matchkey('multiple', option) || false}
                preview={matchkey('preview', option) || true}
                dragdrop={matchkey('dragdrop', option) || true}
                placeholder={matchkey('placeholder', option) || undefined}
                helperText={matchkey('helperText', option) || undefined}
                maxUploadSize={matchkey('maxUploadSize', option) || 5}
                objectFit={dedupe('checked', 'value', matchkey('objectFit', option)) || 'contain'}
                defaultValue={collectionData?.[key] || matchkey('defaultValue', option)}
                callbackUpload={(file) => 
                {
                    formSetValue(key, file);
                }}
            />
        </FormControl>
    );
};