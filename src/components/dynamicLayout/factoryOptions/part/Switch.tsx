import React from 'react';
import { styled } from '@mui/material/styles';
//utils
import { bindAction } from '../../utils/bindAction';
//type
import { IMappingValueProps } from '../PartMapping';
//components
import {
    FormLabel,
    Switch as MuiSwitch,
    Box,
} from '@mui/material';

export const Switch: React.FC<IMappingValueProps<boolean>> = (props) => 
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
        <SwitchOptionBox>
            <Label>{label}</Label>
            <MuiSwitch
                checked={Boolean(value)}
                onChange={(e, v) => 
                {
                    currentLayout.setState((prev) => 
                    {
                        const newarr = prev.map((d) => 
                        {
                            if (d.key !== undefined && d.key === key) 
                            {
                                return { ...d, value: v };
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
            />
        </SwitchOptionBox>
    );
};

const SwitchOptionBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    overflow: hidden;
    word-break: break-all;
`;

const Label = styled(FormLabel)`
    flex: 1;
    overflow: hidden;
    margin-right: 16px;
`;