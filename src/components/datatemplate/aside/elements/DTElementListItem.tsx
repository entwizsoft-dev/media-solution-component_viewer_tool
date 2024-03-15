import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
//utils
import { elDataConversion } from '../../utils/elDataConversion';
//type
import {
    ITotalElementListProps,
} from '../../interface/element.interface';
//context
import { useDTLayoutContext } from '../../DTLayoutContext';
//components
import {
    Box,
    ListItemAvatar,
    ListItemText,
    ListItemButton,
    Avatar,
    CircularProgress,
} from '@mui/material';
import MappingIcon from '@/components/MappingIcon';

interface IListItemProps {
    data: ITotalElementListProps[] | Promise<ITotalElementListProps[]>;
}

const DTElementListItem: React.FC<IListItemProps> = (props) => 
{
    const {
        data,
    } = props;
    //context
    const {
        template,
        focusItem,
    } = useDTLayoutContext();
    //state
    const [elements, setElements] = useState<ITotalElementListProps[] | null>(null);

    //요소 선택 이벤트
    const elementSelectEvent = (el: ITotalElementListProps) => 
    {
        const json = elDataConversion(el);
        const {
            type,
            name,
            dataType,
            dataTypeList,
            option,
        } = json;
    
        if(focusItem.state)
        {
            const {
                index,
            } = focusItem.state;
    
            template.setState(prev => 
            {
                return prev.map((item, idx) => 
                {
                    if(idx === index)
                    {
                        return {
                            ...json,
                            ...item,
                            type,
                            name,
                            dataType,
                            dataTypeList,
                            option,
                        };
                    }
                    return item;
                });
            });
        }
    };

    useEffect(() => 
    {
        if (data instanceof Promise) 
        {
            data.then(resolvedData => 
            {
                setElements(resolvedData);
            }).catch(error => 
            {
                console.error('Error fetching data:', error);
            });
        }
        else 
        {
            setElements(data);
        }
    }, [data]);

    return (
        <React.Fragment>
            {
                elements ?
                    elements.map((d,i) => 
                    {
                        return (
                            <ListItemButton
                                key={i}
                                onClick={() => 
                                {
                                    elementSelectEvent(d);
                                }}
                            >
                                <ListItemAvatar>
                                    <AvatarStyle>
                                        <MappingIcon
                                            icon={d.icon}
                                        />
                                    </AvatarStyle>
                                </ListItemAvatar>
                                <ListItemText>
                                    {d.label}
                                </ListItemText>
                            </ListItemButton>
                        );
                    })
                    :
                    <LoadingBox>
                        <CircularProgress/>
                    </LoadingBox>
            }
        </React.Fragment>
    );
};

const LoadingBox = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
`;

const AvatarStyle = styled(Avatar)`
    background-color: ${({theme}) => 
    {
        return theme.palette.btnColor.main;
    }};
`;

export default DTElementListItem;