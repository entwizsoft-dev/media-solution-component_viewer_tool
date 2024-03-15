import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import React from 'react';

interface ICustomIconLogo {
    logo : string
    size?: number;
}

const CustomIconLogo:React.FC<ICustomIconLogo> = (props) => 
{
    const {
        logo,
        size = 30,
    } = props;
    return (
        <CustomIconLogoBlock>
            <CustomAvatar
                variant="rounded"
                src={logo}
                alt={'tableImg'}
                size={size}
            />
        </CustomIconLogoBlock>
    );
};

const CustomIconLogoBlock = styled('div')`
    position: relative;
`;

const CustomAvatar = styled(Avatar)<{size?: number}>`
    width: ${({size}) => 
    {
        return `${size}px`;
    }};
    height: ${({size}) => 
    {
        return `${size}px`;
    }};
    border-radius: 50%;
    background: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.origin;
    }};
`;
export default CustomIconLogo;