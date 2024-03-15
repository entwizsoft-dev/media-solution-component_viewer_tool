import React from 'react';
import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';
//components
import {
    Box,
    Typography,
    Modal,
} from '@mui/material';

interface IModal {
    modalActive: boolean;
    close?: () => void;
    title?: string;
    desc?: string;
    bgcolor?: string;
    children?: React.ReactNode;
    wd?: string;
    ht?: string;
    sx?: SxProps
}
// css변경?
const CommonModal: React.FC<IModal> = (props) => 
{
    const {
        modalActive,
        close,
        title = '타이틀',
        desc,
        bgcolor = 'backgroundTheme.origin',
        children,
        wd ='400px',
        ht,
        sx,
    } = props;

    return (
        <Modal
            open={modalActive}
            onClose={() => 
            {
                if(typeof close === 'function')
                {
                    close();
                }
            }}
        >
            <CommonModalBox>
                <ModalArea
                    bgcolor={bgcolor}
                    wd={wd}
                    ht={ht}
                    sx={sx}
                >
                    {
                        children ? 
                            children
                            :
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                }}
                            >
                                <Typography
                                    id="modal-modal-title"
                                    variant="h6"
                                    component="h2"
                                    sx={{ textAlign: 'center' }}
                                >
                                    {title}
                                </Typography>
                                {
                                    desc &&
                                        <Typography
                                            id="modal-modal-description"
                                            sx={{ mt: 2, textAlign: 'center' }}
                                        >
                                            {desc}
                                        </Typography>
                                }
                            </Box>
                    }
                </ModalArea>
            </CommonModalBox>
        </Modal>
    );
};

const CommonModalBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

const ModalArea = styled(Box)<{bgcolor?: string, wd?: string, ht?: string}>`
    position: relative;
    max-height: calc(100vh - 60px);
    border-radius: 10px;
    overflow: auto;

    width: ${({wd}) => 
    {
        return wd;
    }};
    height: ${({ht}) => 
    {
        return ht;
    }};
    background-color: ${({bgcolor}) => 
    {
        return bgcolor;
    }};
`;

export default CommonModal;