import React from 'react';
//utils
import { matchkey } from '../../utils/matchkey';
//type
import { IPartComponentsProps } from '../PartMapping';
import { IViewsListProps } from '@/components/transferList/interface/template.interface';
import { IWecandeoTableDataProps } from '@/interfaces/wecandeo.interface';
//components
import {
    FormControl,
    FormLabel,
} from '@mui/material';
//components
import VideoTransferList from '@/components/transferList/template/VideoTransferList';

export const VideoDataBind: React.FC<IPartComponentsProps> = (props) => 
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
    const currentValue = collectionData?.[key] as IWecandeoTableDataProps[] | undefined;

    const getCheckedItems = (views:IViewsListProps<IWecandeoTableDataProps>[] | undefined) =>
    {
        const newarrr = [] as IViewsListProps<IWecandeoTableDataProps>[];
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
            <VideoTransferList
                multiple={matchkey('multiple', option)}
                defaultValue={currentValue}
                listViews={getCheckedItems(matchkey('views', option))}
                selectViews={getCheckedItems(matchkey('views', option))}
                detailViews={matchkey('views', option)}
                callbackSelect={(selectValue) => 
                {
                    const arr = selectValue ? selectValue.map(d => 
                    {
                        return d.uid;
                    }) : [];
                    
                    formSetValue(key, arr);
                }}
            />
        </FormControl>
    );
};