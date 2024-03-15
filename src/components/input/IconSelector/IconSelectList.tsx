import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
//icon
import {
    SvgIcons,
    ISvgIconsProps,
} from '@/icons/index';
//components
import {
    Box,
    Grid,
    SvgIconProps,
    Button,
    TextField,
    Typography,
    InputAdornment,
    CircularProgress,
} from '@mui/material';
import MappingIcon from '@/components/MappingIcon';

interface IIconSelectListProps {
    grid?: number;
    callbackSelect?: (iconName: keyof ISvgIconsProps) => void;
    defaultSelectIcon?: keyof ISvgIconsProps;
}
type ISvgIconArrayProps = [keyof ISvgIconsProps, SvgIconProps][];

//전체 아이콘 배열
const allicons = Object.entries(SvgIcons).sort() as ISvgIconArrayProps;

const IconSelectList = (props: IIconSelectListProps) => 
{
    const {
        grid = 8, //1열당 표시할 수
        callbackSelect,
    } = props;
    //state
    const [icons, setIcons] = useState<ISvgIconArrayProps | null>(null);

    //아이콘 업데이트
    useEffect(() =>
    {
        setIcons(allicons);
    }, []);

    return (
        <Area>
            <TextField
                placeholder='아이콘을 검색해주세요.'
                fullWidth
                size='small'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <MappingIcon
                                icon='SearchIcon'
                            />
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => 
                {
                    const value = e.target.value.toLowerCase();
                    if(value !== '')
                    {
                        const filterIcons = allicons?.filter((d) => 
                        {
                            return d[0].toLowerCase().indexOf(value) > -1;
                        });
                        setIcons(filterIcons);
                    }
                    else
                    {
                        setIcons(allicons);
                    }
                }}
            />
            <Typography
                variant='caption'
                sx={{
                    display: 'block',
                    mt: 1,
                }}
            >
                총 {icons?.length || 0}개 검색 결과
            </Typography>
            <IconWrap>
                {
                    icons ?
                        <IconListBox
                            container
                            spacing={1}
                        >
                            {
                                (Array.isArray(icons) && icons.length > 0) ?
                                    icons.map((d,i) => 
                                    {
                                        return (
                                            <Grid
                                                key={i}
                                                item
                                                xs={12/grid}
                                            >
                                                <Item
                                                    fullWidth
                                                    color='inherit'
                                                    onClick={() => 
                                                    {
                                                        if(typeof callbackSelect === 'function')
                                                        {
                                                            callbackSelect(d[0]);
                                                        }
                                                    }}
                                                >
                                                    <MappingIcon
                                                        icon={d[0]}
                                                    />
                                                    <ItemText
                                                        variant='caption'
                                                    >
                                                        {d[0]}
                                                    </ItemText>
                                                </Item>
                                            </Grid>
                                        );
                                    })
                                    :
                                    <Empty>검색결과가 없습니다.</Empty>
                            }
                        </IconListBox>
                        :
                        <LoadingBox>
                            <CircularProgress
                                color='inherit'
                            />
                        </LoadingBox>
                }
            </IconWrap>
        </Area>
    );
};

const Area = styled(Box)`
    padding: 24px;
    width: 640px;
`;

const IconWrap = styled(Box)`
    margin-top: 16px;
    max-height: 365px;
    overflow: auto;
    padding: 8px;
`;

const IconListBox = styled(Grid)`

`;

const Item = styled(Button)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    overflow: hidden;
    padding: 8px;
    box-sizing: border-box;
`;

const ItemText = styled(Typography)`
    display: block;
    width: 100%;
    margin-top: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
    text-align: center;
`;

const LoadingBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    padding: 8px 0;
    color: ${({theme}) => 
    {
        return theme.palette.loadingCircularColor.main;
    }};
`;

const Empty = styled(Box)`
    color: ${({theme}) => 
    {
        return theme.palette.loadingCircularColor.main;
    }};
`;

export default IconSelectList;