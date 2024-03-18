import React, { useEffect, useState } from 'react';
//utils
// import axiosGuard from '@/utils/axiosGuard';
import { bindAction } from '../../utils/bindAction';
//type
import {
    IPrimalDataTypeProps,
} from '@/components/datatemplate/interface/element.interface';
import { IMappingValueProps } from '../PartMapping';
import {
    ITemplateListRowDataProps,
} from '@/components/datatemplate/interface/element.interface';
//components
import {
    Stack,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';

//모든 템플릿 키 객체 타입의 공통 타입
export interface ITemplateKeyItemProps {
    dataType: Omit<IPrimalDataTypeProps, 'SQL' | 'noSQL'> | 'bind';
    target?: string;
}
export type ITemplateKeyGroupProps = Record<string, ITemplateKeyItemProps>;
//템플릿 데이터의 모든 키 객체 타입
export type ITemplateKeyProps = Record<string, ITemplateKeyGroupProps>;

export const SelectDataTemplate: React.FC<IMappingValueProps<any>> = (props) => 
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
    //state
    const [templateListData, setTemplateListData] = useState<ITemplateListRowDataProps[] | null>(null);

    //update
    useEffect(() => 
    {
        setTemplateListData([
            {
                _id: 'test',
                _templateName: 'test',
                templateType: 'object',
                createdAt: '9999-99-99',
                updatedAt: '9999-99-99',
                templateData: [],
                templateLabel:'테스트용 템플릿 입니다.',
                templateOption: {},
            },
        ]);
    }, []);
    
    return (
        <FormControl
            sx={{
                width: '100%',
            }}
            size='small'
        >
            <InputLabel>{label}</InputLabel>
            <Stack
                spacing={2}
            >
                <Select
                    value={templateListData ? value || '' : ''}
                    label={label}
                    onChange={(e) => 
                    {
                        const v = e.target.value;
                        //선택한 현재 값
                        currentLayout.setState(prev => 
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
                >
                    {
                        templateListData &&
                        templateListData.map((d,i) => 
                        {
                            return (
                                <MenuItem
                                    key={i}
                                    value={d._templateName || ''}
                                >
                                    {d.templateLabel || '-'}
                                </MenuItem>
                            );
                        })
                    }
                </Select>
            </Stack>
        </FormControl>
    );
};