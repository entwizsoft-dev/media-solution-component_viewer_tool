import React from 'react';
import { IPartComponentsProps } from './PartMapping';
import ExportComponent from '@/export';

const ExportFile: React.FC<IPartComponentsProps> = (props) => 
{

    const ConvComp = ExportComponent as React.FC<IPartComponentsProps>;
    return (<ConvComp {...props}/>);
};

export default ExportFile;