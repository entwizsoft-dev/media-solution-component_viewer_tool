import React from 'react';
import { styled } from '@mui/material/styles';
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

interface ITableSingleResultProps {
    callbackRemove: () => void;
    views: IItemArrayProps[];
    buttonRender?: React.ReactNode;
}

const SingleResultItem: React.FC<ITableSingleResultProps> = (props) => 
{
    const {
        callbackRemove,
        views,
        buttonRender,
    } = props;

    return (
        <ResultBox>
            <DataArea>
                <DataContent>
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
                </DataContent>
                <DataBottom>
                    <ButtonRenderBox>
                        {
                            buttonRender &&
                                buttonRender
                        }
                    </ButtonRenderBox>
                    <Button
                        variant='outlined'
                        color='error'
                        onClick={callbackRemove}
                    >
                        제외
                    </Button>
                </DataBottom>
            </DataArea>
        </ResultBox>
    );
};

const ResultBox = styled(Box)`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
`;

const DataArea = styled(Box)`
    flex: 1;
    box-sizing: border-box;
    overflow: auto;
`;

const DataContent = styled(Box)`
    
`;

const DataBottom = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;
`;

const InfoText = styled(Box)`
    overflow: hidden;
    padding: 6px 0;
    border-bottom: 1px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
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

const ButtonRenderBox = styled(Box)`
    flex: 1;
`;


export default SingleResultItem;