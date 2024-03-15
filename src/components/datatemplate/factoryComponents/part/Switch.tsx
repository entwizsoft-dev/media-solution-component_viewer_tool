import React from 'react';
import { styled } from '@mui/material/styles';
//utils
import { matchkey } from '../../utils/matchkey';
//type
import { IPartComponentsProps } from '../PartMapping';
//components
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Switch as MuiSwitch,
} from '@mui/material';

export const Switch: React.FC<IPartComponentsProps> = (props) => 
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
                <SwitchForm
                    label={matchkey('switchLabel', option) || undefined}
                    control={
                        <SwitchStyle
                            defaultChecked={collectionData?.[key] || matchkey('defaultChecked', option)}
                        />
                    }
                    {...formRegister(key)}
                />
            </FormGroup>
            {
                (matchkey('helperText', option) && String(matchkey('helperText', option)).trim() !== '') &&
                    <FormHelperText>
                        {matchkey('helperText', option)}
                    </FormHelperText>
            }
        </FormControl>
    );
};

const SwitchForm = styled(FormControlLabel)`
    margin: 0;
    & > .MuiTypography-root {
        margin-left: 0.5rem;
    }
`;

const SwitchStyle = styled(MuiSwitch)`
    margin: 0;
`;