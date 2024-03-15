import React from 'react';
//utils
import { matchkey } from '../../utils/matchkey';
//type
import { IPartComponentsProps } from '../PartMapping';
import { ISelectionItemDataProps } from '../../interface/element.interface';
//components
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    FormLabel,
    Checkbox as MuiCheckbox,
} from '@mui/material';

export const Checkbox: React.FC<IPartComponentsProps> = (props) => 
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
    //var
    const optionCheckboxValue = matchkey('selection', option) as ISelectionItemDataProps[] | undefined;
    //DB값과 데이터 융합 업데이트
    const fusionValue = () => 
    {
        if (!optionCheckboxValue) 
        {
            return [];
        }
    
        return optionCheckboxValue.map(item => 
        {
            const col = collectionData?.[key] as ISelectionItemDataProps[] | undefined;
            const isChecked = col?.includes(item.value);
            return { ...item, checked: isChecked};
        });
    };

    return (
        <FormControl>
            {
                label?.trim() !== '' &&
                    <FormLabel
                        sx={{
                            mb: 1.5,
                        }}
                    >
                        {label || ''}
                    </FormLabel>
            }
            <FormGroup
                row={matchkey('row', option) || false}
            >
                {
                    Array.isArray(fusionValue()) &&
                    fusionValue().map((d,i) => 
                    {
                        return (
                            <FormControlLabel
                                key={i}
                                label={d.label}
                                control={
                                    <MuiCheckbox
                                        {...formRegister(key)}
                                        defaultChecked={d.checked || false}
                                        value={d.value}
                                    />
                                }/>
                        );
                    })
                }
            </FormGroup>
        </FormControl>
    );
};