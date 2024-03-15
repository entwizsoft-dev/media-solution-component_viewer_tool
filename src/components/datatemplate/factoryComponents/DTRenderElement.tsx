import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
//hook-form
import { useForm } from 'react-hook-form';
//type
import {
    ITemplateDataProps,
    ITemplateDBRowDataProps,
} from '../interface/element.interface';
//components
import {
    Box,
    Stack,
    Button,
    Divider,
} from '@mui/material';
import PartMapping from '@/components/datatemplate/factoryComponents/PartMapping';

interface IDTRenderElementProps {
    mode?: 'create' | 'modify' | 'preview' | 'update';
    renderFormData: ITemplateDataProps[];
    collectionData?: ITemplateDBRowDataProps & Record<string, unknown>;
    callbackSubmit?: (form: Record<string, unknown>) => void;
    callbackDelete?: () => void;
}

const DTRenderElement: React.FC<IDTRenderElementProps> = (props) => 
{
    const {
        mode = 'create',
        renderFormData,
        collectionData,
        callbackSubmit,
        callbackDelete,
    } = props;
    //router
    const router = useRouter();
    //hook-form
    const {
        handleSubmit,
        register,
        setValue,
    } = useForm();


    const submitEvent = (form: Record<string, unknown>) => 
    {
        //submit mode가 아닐경우 제출하지 않음.
        if(mode === 'preview')
        {
            return;
        }

        if(typeof callbackSubmit === 'function')
        {
            callbackSubmit(form);
        }
    };

    //delete event
    const deleteEvent = () => 
    {
        if(mode === 'preview')
        {
            return;
        }

        if(typeof callbackDelete === 'function')
        {
            callbackDelete();
        }
    };
        
    return (
        <Box
            component={'form'}
            onKeyPress={(e) => 
            {
                if (e.key === 'Enter' && (e.target as HTMLInputElement).type !== 'textarea')
                {
                    e.preventDefault();
                }
            }}
            onSubmit={handleSubmit(submitEvent)}
        >
            <Stack
                spacing={4}
            >
                {
                    renderFormData.map((d,i) => 
                    {
                        return (
                            <ItemBox
                                key={i}
                            >
                                <PartMapping
                                    type={d.type}
                                    data={d}
                                    formRegister={register}
                                    formSetValue={setValue}
                                    collectionData={collectionData}
                                />
                            </ItemBox>
                        );
                    })
                }
            </Stack>
            {
                mode !== 'preview' &&
                    <>
                        <Divider
                            sx={{
                                mt: 5,
                                mb: 3,
                            }}
                        />
                        <Stack
                            spacing={2}
                            direction={'row'}
                            justifyContent={'space-between'}
                        >
                            <Stack
                                spacing={1}
                                direction={'row'}
                            >
                                <Button
                                    type='submit'
                                    variant='contained'
                                >
                                    {
                                        mode === 'modify' ?
                                            '수정'
                                            :
                                            mode === 'update' ?
                                                '업데이트'
                                                :
                                                '생성'
                                    }
                                </Button>
                                <Button
                                    variant='contained'
                                    color='info'
                                    onClick={() => 
                                    {
                                        router.back();
                                    }}
                                >
                                    취소
                                </Button>
                            </Stack>
                            {
                                mode === 'modify' &&
                                    <Stack
                                        spacing={1}
                                        direction={'row'}
                                    >
                                        <Button
                                            variant='contained'
                                            color='error'
                                            onClick={deleteEvent}
                                        >
                                            삭제
                                        </Button>
                                    </Stack>
                            }
                        </Stack>
                    </>
            }
        </Box>
    );
};

const ItemBox = styled(Box)`
    position: relative;
`;

export default DTRenderElement;