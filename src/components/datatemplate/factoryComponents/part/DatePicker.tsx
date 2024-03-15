import React from 'react';
import moment from 'moment';
//utils
import { matchkey } from '../../utils/matchkey';
//type
import { IPartComponentsProps } from '../PartMapping';
import {
    IDateProps,
    IDatesProps,
} from '@/components/input/DatePicker';
//components
import DatePickerComponent from '@/components/input/DatePicker';

export const DatePicker: React.FC<IPartComponentsProps> = (props) => 
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
    //state
    const startDate = matchkey('startdate', option) as Date | undefined;
    const collectionDate = collectionData?.[key] as IDatesProps | undefined;

    return (
        <DatePickerComponent
            title={label || undefined}
            range={matchkey('range', option) || false}
            allowBeforeDay={matchkey('allowBeforeDay', option) || false}
            defaultStartDate={collectionDate?.start || startDate}
            {
                ...((collectionDate && collectionDate.end) && {
                    defaultEndDate: collectionDate.end,
                })
            }
            callbackDate={(date) => 
            {
                const format = matchkey('dateformat', option);
                if(date)
                {
                    if(Object.prototype.toString.call(date) === '[object Object]')
                    {
                        const cd = date as IDatesProps;
                        const json = {
                            start: cd.start ? moment(cd.start).format(format) : null,
                            end: cd.end ? moment(cd.end).format(format) : null,
                        };
    
                        formSetValue(key, json);
                    }
                    else
                    {
                        const cd = date as IDateProps;
                        const json = {
                            start: moment(cd).format(format),
                        };

                        formSetValue(key, json);
                    }
                }
            }}
        />
    );
};