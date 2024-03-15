import React from 'react';
import { styled } from '@mui/material/styles';
//icon
import AddIcon from '@mui/icons-material/Add';
//components
import {
    Box,
    Button,
    Typography,
} from '@mui/material';

interface IItemArrayProps {
    label: string;
    value?: string | number | null;
}

interface IListItemProps {
    views: IItemArrayProps[];
    callbackSelect?: () => void;
}

const ListItem: React.FC<IListItemProps> = (props) => 
{
    const {
        views,
        callbackSelect,
    } = props;

    return (
        <Item>
            <InfoBox>
                {
                    views.map((d,i) => 
                    {
                        return (
                            <InfoText
                                key={i}
                            >
                                <CaptionTitle
                                    variant='caption'
                                >
                                    {
                                        (typeof d.label === 'string' && d.label !== '') ?
                                            d.label : '-'
                                    }
                                </CaptionTitle>
                                <InfoContent
                                    variant='body2'
                                >
                                    {
                                        (typeof d.value === 'string' && d.value !== '') ||
                                        typeof d.value === 'number'
                                            ?
                                            String(d.value) : '-'
                                    }
                                </InfoContent>
                            </InfoText>
                        );
                    })
                }
            </InfoBox>
            <AddBtn
                variant='contained'
                endIcon={<AddIcon />}
                onClick={() => 
                {
                    if(typeof callbackSelect === 'function')
                    {
                        callbackSelect();
                    }
                }}
            >
                선택
            </AddBtn>
        </Item>
    );
};

const Item = styled(Box)`
    position: relative;
    display: flex;
    align-items: center;
    padding: 1rem;
    overflow: hidden;
`;

const InfoBox = styled(Box)`
    flex: 1;
    overflow: hidden;
`;

const InfoText = styled(Box)`
    overflow: hidden;
    &:not(:last-of-type) {
        margin-bottom: 4px;
    }
`;

const CaptionTitle = styled(Typography)`
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.light;
    }};
`;

const InfoContent = styled(Typography)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
`;

const AddBtn = styled(Button)`
    /* padding: 0; */
`;


export default ListItem;