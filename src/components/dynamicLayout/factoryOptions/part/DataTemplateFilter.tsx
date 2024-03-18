import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
//utils
// import axiosGuard from '@/utils/axiosGuard';
// import axiosResponseProcessor from '@/utils/axiosResponseProcessor';
//type
import {
    IMappingValueProps,
} from '../PartMapping';
import {
    IDataFilterRowProps,
} from '../../popover/filter/DataTemplateFilterRow';
// import {
//     IPrimalDataTypeProps,
// } from '@/components/datatemplate/interface/element.interface';
//
import {
    Button,
    Popover,
} from '@mui/material';
import DataTemplateFilterPopover from '../../popover/filter/DataTemplateFilterPopover';

//모든 템플릿 키 객체 타입의 공통 타입
export interface ITemplateKeyItemProps {
    dataType: Omit<IPrimalDataTypeProps, 'SQL' | 'noSQL'> | 'bind';
    target?: string;
}
//
export type ITemplateKeyGroupProps = Record<string, ITemplateKeyItemProps>;
//템플릿 데이터의 모든 키 객체 타입
export type ITemplateKeyProps = Record<string, ITemplateKeyGroupProps>;

export const DataTemplateFilter: React.FC<IMappingValueProps<any>> = (props) => 
{
    const {
        data,
        currentLayout,
    } = props;

    const {
        key,
        label,
        value,
        // dependencies,
    } = data;
    //ref
    const filterBtnRef = useRef<HTMLButtonElement | null>(null); //버튼 REF
    //state
    const [filterEl, setFilterEl] = useState<HTMLButtonElement | null>(null); //필터 popover 요소
    const [allTempaltekeyData, setAllTempaltekeyData] = useState<ITemplateKeyProps | null>(null); //전체 키 리스트
    const [currentTemplateData, setCurrentTemplateData] = useState<ITemplateKeyGroupProps | null>(null); //선택된 키 리스트
    //filter state
    const [whereClause, setWhereClause] = useState<IDataFilterRowProps[]>(value || []);
    //var
    const selectValue = currentLayout.state?.find((d) => 
    {
        return d.key === 'dataTemplateBind';
    })?.value; //데이터 템플릿 연동 키

    //current template update
    useEffect(() => 
    {
        if(selectValue)
        {
            // axiosGuard.get('/template/keyList')
            //     .then((res) => 
            //     {
            //         axiosResponseProcessor<ITemplateKeyProps>(res, {
            //             successCallback: (result) => 
            //             {
            //                 setAllTempaltekeyData(result);
            //                 setCurrentTemplateData(result?.[selectValue]);
            //             },
            //         });
            //     })
            //     .catch((error) => 
            //     {
            //         console.error(error);
            //     });
        }
    }, [selectValue]);

    // filter pos Update
    useEffect(() => 
    {
        if(whereClause.length > 0)
        {
            //선택한 현재 값
            currentLayout.setState(prev => 
            {
                const newarr = prev.map((d) => 
                {
                    if (d.key !== undefined && d.key === key) 
                    {
                        return { ...d, value: whereClause };
                    }

                    return d;
                });
                return newarr;
            });
        }
    }, [whereClause]);

    return (
        <>
            <Btn
                ref={filterBtnRef}
                fullWidth
                variant='outlined'
                color={whereClause.length > 0 ? 'primary' : 'info'}
                onClick={(e) => 
                {
                    setFilterEl(e.currentTarget);
                }}
            >
                {label} {whereClause.length > 0 && `(${whereClause.length})`}
            </Btn>
            <Popover
                open={Boolean(filterEl)}
                anchorEl={filterEl}
                onClose={() => 
                {
                    setFilterEl(null);
                }}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <DataTemplateFilterPopover
                    currentTemplateData={currentTemplateData}
                    allTempaltekeyData={allTempaltekeyData}
                    whereClause={{
                        state: whereClause,
                        setState: setWhereClause,
                    }}
                />
            </Popover>
        </>
    );
};

const Btn = styled(Button)`
    position: relative;
`;