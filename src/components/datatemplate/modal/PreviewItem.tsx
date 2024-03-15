import React from 'react';
import { styled } from '@mui/material/styles';
//type
import {
    ITemplateDataProps,
    ITemplateDBRowDataProps,
} from '../interface/element.interface';
//components
import {
    Box,
} from '@mui/material';
import DTRenderElement from '@/components/datatemplate/factoryComponents/DTRenderElement';
import DTElementSkeleton from '@/components/datatemplate/skeleton/DTElementSkeleton';

interface PreviewItemProps {
    templateData: ITemplateDataProps[];
    collectionData?: ITemplateDBRowDataProps & Record<string, unknown>;
}

const PreviewItem: React.FC<PreviewItemProps> = (props) => 
{
    const {
        templateData,
        collectionData,
    } = props;

    return (
        <PreviewBox>
            {
                (Array.isArray(templateData) && templateData.length > 0) ?
                    <DTRenderElement
                        mode='preview'
                        renderFormData={templateData}
                        collectionData={collectionData}
                    />
                    :
                    <DTElementSkeleton/>
            }
        </PreviewBox>
    );
};

const PreviewBox = styled(Box)`
    height: 700px;
    padding: 1.5rem;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0.875rem;
    }
    &::-webkit-scrollbar-track {
        background-color: ${({theme}) => 
    {
        return theme.palette.dividerTheme.main;
    }};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
        border: 3px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
        border-radius: 0.875rem;;
    }
    &::-webkit-scrollbar-button {
        display:none;
    }
`;

export default PreviewItem;