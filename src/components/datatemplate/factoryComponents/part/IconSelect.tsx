import React from 'react';
//type
import { IPartComponentsProps } from '../PartMapping';
import { ISvgIconsProps } from '@/icons';
//
import IconSelector from '@/components/input/IconSelector';

export const IconSelect : React.FC<IPartComponentsProps> = (props) => 
{
    const {
        data,
        formSetValue,
        collectionData,
    } = props;

    const {
        key,
        // label,
    } = data;

    const collectionDate = collectionData?.[key] as keyof ISvgIconsProps | undefined;

    return (
        <div>
            <IconSelector
                defaultValue={collectionDate}
                callbackSelect={(eachIcon) => 
                {
                    console.log('아이콘이름', eachIcon);
                    formSetValue(key, eachIcon);
                }}
            />
        </div>
    );
};


