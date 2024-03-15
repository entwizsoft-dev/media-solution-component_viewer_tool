import React from 'react';
//utils
import { dedupe } from '../../utils/dedupe';
import { matchkey } from '../../utils/matchkey';
//type
import { IPartComponentsProps } from '../PartMapping';
import { ISelectionItemDataProps } from '../../interface/element.interface';
//components
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Radio as MuiRadio,
} from '@mui/material';

export const Radio: React.FC<IPartComponentsProps> = (props) => 
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
            <RadioGroup
                row={matchkey('row', option) || false}
                defaultValue={collectionData?.[key] || dedupe('checked', 'value', matchkey('selection', option))}
                {...formRegister(key)}
            >
                {
                    Array.isArray(matchkey('selection', option)) &&
                    matchkey('selection', option).map((d: ISelectionItemDataProps, i: number) => 
                    {
                        return (
                            <FormControlLabel
                                key={i}
                                label={d.label}
                                value={d.value}
                                control={
                                    <MuiRadio
                                        {...formRegister(key)}
                                    />
                                }/>
                        );
                    })
                }
            </RadioGroup>
        </FormControl>
    );
};