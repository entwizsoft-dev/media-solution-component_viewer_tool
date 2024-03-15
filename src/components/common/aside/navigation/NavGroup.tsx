import React from 'react';
import { styled } from '@mui/material/styles';
//type
import {
    IAsideDataRowsProps,
} from '@/interfaces/aside.interface';
import { IDistributorAccountProps } from '@/interfaces/distributor.interface';
//components
import { List, ListSubheader } from '@mui/material';
import NavItem from './NavItem';

interface INavGroupProps extends IAsideDataRowsProps {
    asideDrawerState?: boolean;
    adminInfo: IDistributorAccountProps | null;
}

const NavGroup: React.FC<INavGroupProps> = (props) => 
{
    const {
        label,
        list,
        asideDrawerState,
        adminInfo,
    } = props;
    const authLevel = adminInfo ? adminInfo.authority : 2;
    //전체 list 배열에서 가장 레벨이 낮은 ACL 값
    const maxACL = (Array.isArray(list) && list.length > 0) ? list.reduce((max, obj) => 
    {
        return max.ACL > obj.ACL ? max : obj;
    }).ACL : 0;

    return (
        <List
            component="nav"
            aria-labelledby={label}
            subheader={
                label ? 
                    asideDrawerState ?
                        (authLevel <= maxACL) ? 
                            <SubTitle
                                component={'div'}
                                id={label}
                                {
                                    ...(asideDrawerState && {
                                        asideopen: 'open',
                                    })
                                }
                            >
                                {label}
                            </SubTitle>
                            :
                            ''
                        :
                        ''
                    : null
            }
        >
            {
                (Array.isArray(list) && list.length > 0) &&
                list.map((d,i) => 
                {
                    return (
                        <NavItem
                            key={i}
                            asideDrawerState={asideDrawerState}
                            adminInfo={adminInfo}
                            {...d}
                        />
                    );
                })
            }
        </List>
    );
};

const SubTitle = styled(ListSubheader)<{component?: React.ElementType, asideopen?: 'open'}>`
    font-size: 10px;
    font-weight: 400;
    line-height: 1.5;
    padding: 24px 16px 8px;
    color: ${({theme})=>
    {
        return theme.palette.typoColor.dark;
    }};
    background-color: transparent;
    ${({asideopen}) =>
    {
        return asideopen === 'open' ? 'display: block;' : 'display: flex; justify-content: center';
    }};
`;

export default NavGroup;

