import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
//icon
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
//components
import {
    Container,
    Box,
    Stack,
    Typography,
    Breadcrumbs,
    Button,
} from '@mui/material';

interface ITitleBtn {
    starticon?: React.ReactNode;
    name: React.ReactNode | string;
    event: () => void;
    color?:  
	'inherit' | 
	'primary' | 
	'secondary' | 
	'success' | 
	'error' | 
	'info' | 
	'warning'
}

interface IBreadcrumbsData {
    link?: string;
    name: string;
}

interface IDashboard {
    type?: 'wide' | 'narrow'
    children?: React.ReactNode;
    title?: string;
    titleButton?: ITitleBtn | ITitleBtn[];
    breadcrumbsData?: IBreadcrumbsData[];
    gap?: number;
}

const DashboardLayout: React.FC<IDashboard> = (props) => 
{
    const {
        gap = 6,
        type = 'narrow',
        children,
        title,
        titleButton,
        breadcrumbsData,
    } = props;
    //router
    const router = useRouter();

    return (
        <Box
            sx={{
                p: gap,
                height: '100%',
                boxSizing: 'border-box',
            }}
        >
            <Area
                disableGutters={type === 'wide' ? true : false}
                maxWidth={type === 'wide' ? false : 'lg'}
            >
                <Title
                    sx={{
                        mb: 5,
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >
                        {
                            (typeof title === 'string' && title !== '') &&
                                <Typography
                                    variant='h5'
                                    component='h2'
                                    color={'typoColor.dark'}
                                    sx={{
                                        mb: 1,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {title}
                                </Typography>
                        }
                        {
                            breadcrumbsData && 
                                <Stack>
                                    <Breadcrumbs
                                        separator={<FiberManualRecordIcon sx={{mx: 1, fontSize: '6px'}}/>}
                                    >
                                        {
                                            breadcrumbsData.map((d,i) => 
                                            {
                                                return (
                                                    <BreadcrumbsItem
                                                        key={i}
                                                        curr={d.link && typeof d.link === 'string' ? 'before' : 'current'}
                                                        {...((d.link && typeof d.link === 'string') && { onClick: async() => 
                                                        {
                                                            d.link && await router.push(d.link);
                                                        }} )}
                                                    >
                                                        <Typography
                                                            variant='inherit'
                                                            sx={{fontSize: '14px'}}
                                                        >
                                                            {d.name}
                                                        </Typography>
                                                    </BreadcrumbsItem>
                                                );
                                            })
                                        }
                                    </Breadcrumbs>
                                </Stack>
                        }
                    </Box>
                    {
                        titleButton ?
                            Array.isArray(titleButton) ?
                                <Stack
                                    direction={'row'}
                                    spacing={1}
                                >
                                    {
                                        titleButton.map((d,i) => 
                                        {
                                            return (
                                                <Box
                                                    key={i}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        onClick={d.event}
                                                        color={d.color ? d.color : 'inherit'}
                                                    >
                                                        {d.name}
                                                    </Button>
                                                </Box>
                                            );
                                        })
                                    }
                                </Stack>
                                :
                                <Box>
                                    <Button
                                        variant="contained"
                                        onClick={titleButton.event}
                                        {...(titleButton.starticon && { startIcon: titleButton.starticon })}
                                    >
                                        {titleButton.name}
                                    </Button>
                                </Box>
                            : null
                    }
                </Title>
                <Content>
                    {children}
                </Content>
            </Area>
            
        </Box>
    );
};

const BreadcrumbsItem = styled(Box)<{curr: 'before' | 'current'}>`
    cursor: ${({curr}) => 
    {
        return curr === 'before' ? 'pointer' : 'auto';
    }};
    color: ${({curr,theme}) => 
    {
        return curr === 'before' ? theme.palette.typoColor.light : theme.palette.typoColor.main;
    }};
    &:hover {
        ${({curr}) => 
    {
        return curr === 'before' && 'text-decoration: underline';
    }}
    }
`;

const Area = styled(Container)`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Title = styled(Box)`
    display: flex;
    align-items: center;
`;

const Content = styled(Box)`
    flex: 1;
    height: 100%;
`;

export default DashboardLayout;