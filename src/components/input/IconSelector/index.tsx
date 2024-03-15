import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';
//icon
import {
    ISvgIconsProps,
} from '@/icons/index';
//components
import MappingIcon from '@/components/MappingIcon';
import {
    Box,
    Button,
    Popover,
    Typography,
    Stack,
    Divider,
} from '@mui/material';
//lazy loading
const IconSelectList = dynamic(() => 
{
    return import('./IconSelectList');
}, { ssr: false});


interface IIconSelectProps {
    fullWidth?: boolean;
    placeholder?: string;
    iconSize?: number;
    defaultValue?: keyof ISvgIconsProps;
    callbackSelect?: (icon: keyof ISvgIconsProps) => void,
}

const IconSelector = (props: IIconSelectProps) => 
{
    const {
        fullWidth,
        iconSize = 40,
        placeholder = '아이콘을 선택해주세요.',
        defaultValue,
        callbackSelect,
    } = props;

    //state
    const [btnEl, setBtnEl] = useState<HTMLElement | null>(null);
    const [selectIcon, setSelectIcon] = useState<keyof ISvgIconsProps | null>(defaultValue ? defaultValue : null);

    return (
        <Area
            sx={{
                width: fullWidth ? '100%' : 'auto',
            }}
        >
            <Wrap
                fullWidth={fullWidth}
                onClick={(e) => 
                {
                    setBtnEl(e.currentTarget);
                }}
                color='inherit'
                variant='outlined'
            >
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    spacing={1.5}
                    sx={{
                        flex: fullWidth ? '1' : '0 1 auto',
                    }}
                >
                    <IconContent
                        sx={{
                            width: iconSize + 'px',
                            fontSize: iconSize + 'px',
                        }}
                    >
                        <MappingIcon
                            icon={selectIcon ? selectIcon : 'QuestionMarkIcon'}
                            sx={{
                                color: selectIcon ? 'typoColor.main' : 'typoColor.light',
                            }}
                        />
                    </IconContent>
                    <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                    />
                    <IconNameContent
                        variant='body1'
                        sx={{
                            color: selectIcon ? 'typoColor.main' : 'typoColor.light',
                        }}
                    >
                        {
                            selectIcon ? selectIcon : placeholder
                        }
                    </IconNameContent>
                </Stack>
                <MoreBtn>
                    <MappingIcon
                        icon={Boolean(btnEl) ? 'ArrowDropUpIcon' : 'ArrowDropDownIcon'}
                    />
                </MoreBtn>
            </Wrap>
            <Popover
                anchorEl={btnEl}
                open={Boolean(btnEl)}
                onClose={() => 
                {
                    setBtnEl(null);
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <IconSelectList
                    callbackSelect={(icon) => 
                    {
                        setSelectIcon(icon);
                        if(typeof callbackSelect === 'function')
                        {
                            callbackSelect(icon);
                        }
                    }}
                />
            </Popover>
        </Area>
    );
};

const Area = styled(Box)`
    position: relative;
    display: inline-flex;
    align-items: center;
`;

const Wrap = styled(Button)`
    padding: 12px 16px;
    border-color: ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
`;

const IconContent = styled(Box)`
    aspect-ratio: 1/1;
    display: flex;
    align-items: center;
    justify-content: center;
    & > svg {
        font-size: inherit;
    }
`;

const MoreBtn = styled(Box)`
    display: flex;
    align-items: center;
    padding-left: 24px;
`;

const IconNameContent = styled(Typography)`
    
`;

export default IconSelector;