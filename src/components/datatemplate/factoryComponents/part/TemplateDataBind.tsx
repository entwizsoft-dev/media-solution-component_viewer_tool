import React from 'react';
//utils
import { matchkey } from '../../utils/matchkey';
//type
import { IPartComponentsProps } from '../PartMapping';
import { IViewsListProps } from '@/components/transferList/template/DataTemplateTransferList';
import {
    ITemplateDBRowDataProps,
} from '../../interface/element.interface';
//components
import {
    FormControl,
    FormLabel,
} from '@mui/material';
//components
import DataTemplateTransferList from '@/components/transferList/template/DataTemplateTransferList';

export const TemplateDataBind: React.FC<IPartComponentsProps> = (props) => 
{
    const {
        data,
        formSetValue,
        collectionData,
    } = props;

    const {
        key,
        label,
        option,
    } = data;

    const currentValue = collectionData?.[key] as (ITemplateDBRowDataProps & Record<string, unknown>)[] | undefined;

    const getCheckedItems = (views:IViewsListProps[] | undefined) =>
    {
        const newarrr = [] as IViewsListProps[];
        return views?.reduce((arr, item) => 
        {
            if (item?.checked) 
            {
                arr.push(item);
            }
            return arr;
        }, newarrr);
    };

    return (
        <FormControl
            fullWidth
        >
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
            <DataTemplateTransferList
                templateKey={matchkey('selectbox', option)}
                defaultValue={currentValue}
                multiple={matchkey('multiple', option)}
                listViews={getCheckedItems(matchkey('views', option))}
                selectViews={getCheckedItems(matchkey('views', option))}
                detailViews={matchkey('views', option)}
                callbackSelect={(selectValue) => 
                {
                    const arr = selectValue ? selectValue.map(d => 
                    {
                        return d._id;
                    }) : [];

                    formSetValue(key, arr);
                }}
            />
        </FormControl>
    );
};