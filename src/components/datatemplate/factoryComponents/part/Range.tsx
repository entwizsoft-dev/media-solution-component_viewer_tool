import React from 'react';
//utils
import { matchkey } from '../../utils/matchkey';
//type
import { IPartComponentsProps } from '../PartMapping';
//components
import {
    Box,
    Slider,
    FormControl,
    FormGroup,
    FormLabel,
} from '@mui/material';

export const Range: React.FC<IPartComponentsProps> = (props) => 
{
    const {
        data,
        formRegister,
        collectionData,
    } = props;

    const {
        key,
        label,
        option,
    } = data;

    return (
        <FormControl>
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
            <FormGroup>
                <Box
                    sx={{
                        width: '340px',
                    }}
                >
                    <Slider
                        valueLabelDisplay="auto"
                        defaultValue={Number(collectionData?.[key]) || Number(matchkey('defaultValue', option)) || undefined}
                        {...formRegister(key)}
                        min={Number(matchkey('min', option)) || undefined}
                        max={
                            (
                                !Number.isNaN(Number(matchkey('max', option))) &&
                                (Number.isNaN(Number(matchkey('min', option))) || ( !Number.isNaN(Number(matchkey('min', option))) && (Number(matchkey('max', option)) > Number(matchkey('min', option))))) ?
                                    Number(matchkey('max', option))
                                    :
                                    undefined
                            )
                        }
                        step={Number(matchkey('step', option)) || undefined}
                        marks={
                            (
                                !Number.isNaN(Number(matchkey('max', option))) &&
                                (Number.isNaN(Number(matchkey('min', option))) || (!Number.isNaN(Number(matchkey('min', option))) && Number(matchkey('max', option)) > Number(matchkey('min', option)))) ?
                                    true
                                    :
                                    false
                            )
                        }
                    />
                </Box>
            </FormGroup>
        </FormControl>
    );
};