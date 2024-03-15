import React from 'react';
import { styled } from '@mui/material/styles';
//context
import { useDTLayoutContext } from '../DTLayoutContext';
//components
import {
    Box,
    Stack,
    TextField,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';

const DBControl: React.FC = () => 
{
    //context
    const {
        templatePage,
        // template,
    } = useDTLayoutContext();

    return (
        <Area>
            <Stack
                spacing={3}
            >
                <TextField
                    label="Template DB Name"
                    fullWidth
                    value={templatePage.state._templateName || ''}
                    disabled
                />
                <TextField
                    label="Template Label"
                    fullWidth
                    value={templatePage.state.templateLabel || ''}
                    onChange={(e) => 
                    {
                        const value = e.target.value;
                        templatePage.setState(prev => 
                        {
                            return {...prev, templateLabel: value};
                        });
                    }}
                />
                <Box>
                    <FormLabel
                        sx={{
                            display: 'block',
                            mb: 1,
                        }}
                    >
                        Template Type
                    </FormLabel>
                    <RadioGroup
                        row
                        value={templatePage.state.templateType || 'object'}
                        onChange={(e) => 
                        {
                            const value = e.target.value as 'object' | 'list';

                            templatePage.setState(prev => 
                            {
                                return {...prev, templateType: value};
                            });
                        }}
                    >
                        <FormControlLabel
                            label="단일"
                            value={'object'}
                            control={
                                <Radio
                                    sx={{
                                        py: 0.5,
                                    }}
                                />
                            }
                        />
                        <FormControlLabel
                            label="리스트"
                            value={'list'}
                            control={
                                <Radio
                                    sx={{
                                        py: 0.5,
                                    }}
                                />
                            }
                        />
                    </RadioGroup>
                </Box>
            </Stack>
        </Area>
    );
};

const Area = styled(Box)`
    position: relative;
`;

export default DBControl;