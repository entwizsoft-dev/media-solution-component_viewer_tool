import React from 'react';
//utils
import { matchkey } from '../../utils/matchkey';
import { dedupe } from '../../utils/dedupe';
import { convarr } from '../../utils/convarr';
//type
import { IPartComponentsProps } from '../PartMapping';
import { ISelectionItemDataProps } from '../../interface/element.interface';
//components
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';

export const SelectList: React.FC<IPartComponentsProps> = (props) => 
{
    const {
        data,
        formRegister,
        collectionData,
    } = props;

    const {
        key,
        label = 'select',
        option,
    } = data;
    //state
    const multiple = matchkey('multiple', option) as boolean | undefined;
    const placeholder = matchkey('placeholder', option) as string | undefined;
    const helpertext = matchkey('helperText', option) as string | undefined;
    const value = matchkey('selection', option) as ISelectionItemDataProps[] | undefined;


    //DB값과 데이터 융합 업데이트
    const fusionValue = () => 
    {
        const col = collectionData?.[key] as string | undefined;
        if (multiple) 
        {
            const colarr = col?.split(',');
            return colarr || convarr('checked', 'value', value);
        }
        else
        {
            return col || dedupe('checked', 'value', value);
        }
    };

    return (
        <FormControl>
            <InputLabel>
                {label}
            </InputLabel>
            <Select
                label={label}
                multiple={multiple}
                defaultValue={fusionValue()}
                {...formRegister(key)}
            >
                {
                    (placeholder && placeholder.trim() !== '') &&
                        <MenuItem
                            disabled
                            value=""
                        >
                            {placeholder}
                        </MenuItem>
                }
                {
                    Array.isArray(value) &&
                    value.map((d,i) => 
                    {
                        return (
                            <MenuItem
                                key={i}
                                value={d.value || ''}
                            >
                                {d.label}
                            </MenuItem>
                        );
                    })
                }
            </Select>
            {
                (helpertext && String(helpertext).trim()) !== '' &&
                    <FormHelperText>
                        {helpertext}
                    </FormHelperText>
            }
        </FormControl>
    );
};