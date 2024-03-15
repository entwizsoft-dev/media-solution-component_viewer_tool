import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface IAdminCommentProps {
    readOnly : boolean
    comment : string
}

const AdminComment:React.FC<IAdminCommentProps> = (props) => 
{
    const {
        readOnly,
        comment,
    } = props;

    const { register }= useFormContext();

    return (
        <ListBox>
            <TextField
                label="관리자 코멘트"
                multiline
                variant="outlined" 
                rows={3}
                fullWidth
                InputProps={{readOnly: readOnly}}
                defaultValue={comment}
                {...register('superAdminComment')}
            />
        </ListBox>
    );
};

const ListBox = styled(Box)`
    margin-top: 20px;
`;

export default AdminComment;