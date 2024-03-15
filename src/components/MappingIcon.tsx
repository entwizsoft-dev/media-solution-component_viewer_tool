import React from 'react';
import { SxProps } from '@mui/material';
//icon
import {
    SvgIcons,
    ISvgIconsProps,
} from '@/icons/index';
//components

const iconMapping = SvgIcons;

interface IMappingIconProps {
    icon?: keyof ISvgIconsProps;
    sx?: SxProps;
}

const MappingIcon: React.FC<IMappingIconProps> = (props) => 
{
    const {
        icon,
    } = props;

    const IconComponet = icon ? iconMapping[icon] : null;

    if(!IconComponet)
    {
        const QuestionMarkComponent = iconMapping['QuestionMarkIcon'];
        return <QuestionMarkComponent/>;
    }

    return (
        <IconComponet
            {...props}
        />
    );
};

export default MappingIcon;