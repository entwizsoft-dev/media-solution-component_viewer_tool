import React from 'react';
import { styled } from '@mui/material/styles';
//components
import {
    Box,
    List,
    ListItemButton,
    ListItemText,
    Divider,
} from '@mui/material';

interface IListItemDataProps {
    label: string;
    shortcutLabel?: string;
    event?: () => void;
}

interface IListDataProps {
    list: IListItemDataProps[];
}

interface IDTHeaderPopoverProps {
    close?: () => void;
    listData: IListDataProps[];
}

const DTHeaderPopover: React.FC<IDTHeaderPopoverProps> = (props) => 
{
    const {
        close,
        listData,
    } = props;

    const itemCehckEvent = (event?: () => void) => 
    {
        if(typeof event === 'function')
        {
            event();
        }
        if(typeof close === 'function')
        {
            close();
        }
    };

    return (
        <Box>
            {
                (Array.isArray(listData) && listData.length > 0) ?
                    <List
                        dense={true}
                        sx={{
                            minWidth: 180,
                            py: 0.5,
                        }}
                    >
                        {
                            listData.map((d,i) => 
                            {
                                const line = <Line key={'line' + i}/>;
                                const items = d.list.map((dd,ii) => 
                                {
                                    return (
                                        <Item
                                            key={'item' + ii}
                                            {
                                                ...(typeof dd.event === 'function' && {
                                                    onClick: () => 
                                                    {
                                                        return itemCehckEvent(dd.event);
                                                    },
                                                })
                                            }
                                        >
                                            <ListText
                                                sx={{
                                                    marginRight: `${dd.shortcutLabel ? '40px' : '0'}`,
                                                }}
                                            >
                                                {dd.label}
                                            </ListText>
                                            {
                                                dd.shortcutLabel &&
                                                    <ListText
                                                        sx={{
                                                            textAlign: 'right',
                                                        }}
                                                    >
                                                        {dd?.shortcutLabel}
                                                    </ListText>
                                            }
                                        </Item>
                                    );
                                });

                                if(listData.length - 1 === i)
                                {
                                    return items;
                                }
                                else
                                {
                                    return[...items, line];
                                }
                            })
                        }
                    </List>
                    :
                    <Box
                        sx={{
                            p: 1,
                        }}
                    >
                        비어있음
                    </Box>
            }
        </Box>
    );
};

const Item = styled(ListItemButton)`
    
`;

const ListText = styled(ListItemText)`
    margin: 0;
`;

const Line = styled(Divider)`
    margin: 0.25rem 0;
`;

export default DTHeaderPopover;