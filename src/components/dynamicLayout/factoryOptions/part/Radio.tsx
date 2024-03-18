import React from 'react';
import { styled } from '@mui/material/styles';
//type
import { IMappingValueProps } from '../PartMapping';
// import { ISelectionItemDataProps } from '@/components/datatemplate/interface/element.interface';
//utils
import { dedupe } from '@/components/dynamicLayout/utils/dedupe';
import { bindAction } from '../../utils/bindAction';
//components
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio as MuiRadio,
    RadioGroup,
} from '@mui/material';

export const Radio: React.FC<IMappingValueProps<any[]>> = (props) => 
{
    const {
        data,
        currentLayout,
    } = props;

    const {
        key,
        label,
        value,
        dependencies,
    } = data;

    return (
        <Area>
            <Label>{label}</Label>
            <RadioGroup
                value={dedupe('checked', 'value', value)}
                onChange={(e) => 
                {
                    const v = e.target.value;

                    currentLayout.setState((prev) => 
                    {
                        const newarr = prev.map((d) => 
                        {
                            if (d.key !== undefined && d.key === key) 
                            {
                                const res = d.value?.map((dd: any) => 
                                {
                                    const json = {
                                        ...dd,
                                        checked: dd.value == v,
                                    };
                                    return json;
                                });
                                return { ...d, value: res };
                            }
                            else 
                            {
                                if (Array.isArray(dependencies)) 
                                {
                                    dependencies.forEach(dependency => 
                                    {
                                        if (d.key && dependency.targetKey.includes(d.key)) 
                                        {
                                            const bindValue = bindAction(dependency.action, v);
                                            d = { ...d, ...bindValue };
                                        }
                                    });
                                }
                                return d;
                            }
                        });
                        return newarr;
                    });
                }}
            >
                {
                    Array.isArray(value) &&
                    value.map((d,i) => 
                    {
                        return (
                            <FormControlLabel
                                key={i}
                                label={d.label || ''}
                                value={d.value || ''}
                                control={
                                    <MuiRadio
                                        sx={{
                                            py: 0.5,
                                        }}
                                    />
                                }
                            />
                        );
                    })
                }
            </RadioGroup>
        </Area>
    );
};

const Area = styled(FormControl)`

`;

const Label = styled(FormLabel)`
    margin-bottom: 4px;
`;