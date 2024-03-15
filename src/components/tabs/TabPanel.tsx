import React from 'react';

import {
    Box,
} from '@mui/material';

interface ITabPanel {
    itemid: string;
    index: number;
    currentIndex: number;
    children?: React.ReactNode;
}

const TabPanel: React.FC<ITabPanel> = (props) => 
{
    const {
        itemid,
        index,
        currentIndex,
        children,
    } = props;

    return (
        <Box
            role="tabpanel"
            hidden={currentIndex !== index}
            id={`${itemid}-tabpanel-${index}`}
            aria-labelledby={`${itemid}-ids-${index}`}
        >
            {children}
        </Box>
    );
};

export default TabPanel;