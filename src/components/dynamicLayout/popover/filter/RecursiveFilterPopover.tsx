import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
//type
import {
    ITemplateKeyGroupProps,
    ITemplateKeyProps,
} from '../../factoryOptions/part/SelectDataTemplate';
//icon
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
//components
import {
    Box,
    Popover,
    List,
    ListItemButton,
    ListItemText,
    PopoverOrigin,
} from '@mui/material';

interface IRecursiveFilterPopoverProps {
    defaultAnchorEl:  HTMLButtonElement | HTMLDivElement | null;
    defaultAddKey?: string;
    anchorOrigin: PopoverOrigin;
    transformOrigin: PopoverOrigin;
    allTempaltekeyData: ITemplateKeyProps | null;
    currentTemplateData: ITemplateKeyGroupProps | null;
    onClose?: () => void;
    callbackSelect?: (result: string) => void;
}

const RecursiveFilterPopover: React.FC<IRecursiveFilterPopoverProps> = (props) =>
{
    const {
        defaultAnchorEl,
        defaultAddKey,
        anchorOrigin,
        transformOrigin,
        allTempaltekeyData,
        currentTemplateData,
        onClose,
        callbackSelect,
    } = props;
    //state
    const [childAnchorEl, setChildAnchorEl] = useState<HTMLDivElement | null>(null); //팝오버 위치값
    const [focusTargetKey, setFocusTargetKey] = useState<string | null>(null);
    const [addkey, setAddkey] = useState<string | undefined>(defaultAddKey);

    return (
        <Popover
            open={Boolean(defaultAnchorEl)}
            anchorEl={defaultAnchorEl}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
        >
            {
                currentTemplateData &&
                    <List>
                        {
                            Object.entries(currentTemplateData).map(([key, value], i) => 
                            {
                                return (
                                    <ListItemButton
                                        key={i}
                                        dense
                                        onClick={(e) => 
                                        {
                                            setFocusTargetKey(value?.target || null);
                                            setAddkey(prev => 
                                            {
                                                return prev ? prev + `.${key}` : key;
                                            });

                                            if(value?.dataType === 'bind')
                                            {
                                                setChildAnchorEl(e.currentTarget);
                                            }
                                            else
                                            {
                                                if(typeof callbackSelect === 'function')
                                                {
                                                    const callbackValue = addkey ? `${addkey}.${key}` : key;
                                                    callbackSelect(callbackValue);
                                                }

                                                if(typeof onClose === 'function')
                                                {
                                                    onClose();
                                                }
                                            }
                                        }}
                                    >
                                        <ListItemText
                                            primary={key}
                                        />
                                        {
                                            value?.dataType === 'bind' &&
                                                <IconBox>
                                                    <ArrowRightIcon/>
                                                </IconBox>
                                        }
                                    </ListItemButton>
                                );
                            })
                        }
                    </List>
            }
            {
                (childAnchorEl && focusTargetKey) &&
                    <RecursiveFilterPopover
                        {...props}
                        defaultAnchorEl={childAnchorEl}
                        defaultAddKey={addkey}
                        currentTemplateData={allTempaltekeyData?.[focusTargetKey] || null}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                    />
            }
        </Popover>
    );
};

const IconBox = styled(Box)`
    margin-left: 16px;
`;


export default RecursiveFilterPopover;
