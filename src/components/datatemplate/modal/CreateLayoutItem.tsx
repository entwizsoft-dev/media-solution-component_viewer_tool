import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import axiosGuard from '@/utils/axiosGuard';
import axiosResponseProcessor from '@/utils/axiosResponseProcessor';
//redux
import {
    useDispatch,
} from 'react-redux';
import { update } from '@/store/modules/slice/datatemplateSaveTrigger';
//hook-form
import { useForm } from 'react-hook-form';
//type
import {
    ITemplatePageDataProps,
    ITemplateListRowDataProps,
} from '../interface/element.interface';
//components
import {
    Box,
    Stack,
    Button,
    CircularProgress,
    TextField,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';

interface IFormProps extends Partial<ITemplatePageDataProps> {
    _templateName: string;
}


interface ICreateLayoutItemProps {
    close?: () => void;
}

const CreateLayoutItem: React.FC<ICreateLayoutItemProps> = (props) => 
{
    const {
        close,
    } = props;
    //redux
    const dispatch = useDispatch();
    //hook-form
    const {
        setValue,
        watch,
    } = useForm<IFormProps>({
        defaultValues: {
            templateLabel: '제목 없음',
            templateType: 'object',
        },
    });
    //router
    const router = useRouter();
    //state
    const [loading, setLoading] = useState<boolean>(false);
    //form hook
    const watchform = watch();

    const submitEvent = async () => 
    {
        try 
        {
            //laoding
            setLoading(true);

            const regex = /^[a-zA-Z]*$/;

            if(!watchform._templateName || watchform._templateName === '')
            {
                alert('Template DB Name은 필수값입니다.');
                return;
            }

            if(!regex.test(watchform._templateName))
            {
                alert('Template DB Name에 영문 이외의 글자는 유효하지 않습니다.');
                return;
            }

            if(watchform._templateName.length > 20)
            {
                alert('Template DB Name은 20자 이내로만 입력 가능합니다.');
                return;
            }

            const res = await axiosGuard.post('/template', watchform);
            axiosResponseProcessor<ITemplateListRowDataProps>(res, {
                successCallback(result) 
                {
                    dispatch(update());
                    return router.push(`/datatemplate/control/detail/${result._id}`);
                },
                errorCallback(code) 
                {
                    if(code === '7c')
                    {
                        alert('중복된 DB Name 입니다.');
                    }
                    else
                    {
                        alert(`클라이언트 에러가 발생하였습니다.\ncode - ${code}`);
                    }
                },
            });
        }
        catch (error) 
        {
            console.error(error);
            alert('서버 에러가 발생하였습니다.');
        }
        finally
        {
            setLoading(false);
        }
    };

    return (
        <Area>
            <Wrap
                direction={'row'}
                spacing={2}
            >
                <Content
                    spacing={3}
                >
                    <TextField
                        label="Template DB Name"
                        fullWidth
                        helperText={'* 20글자 이하의 영문 단어만 입력 가능합니다.'}
                        onChange={(e) => 
                        {
                            const value = e.target.value;
                            
                            setValue('_templateName', value);
                        }}
                    />
                    <TextField
                        label="Template Label"
                        fullWidth
                        defaultValue={'제목 없음'}
                        onChange={(e) => 
                        {
                            const value = e.target.value;

                            setValue('templateLabel', value);
                        }}
                    />
                    <Box>
                        <FormLabel
                            sx={{
                                display: 'block',
                                mb: 1,
                            }}
                        >
                            Template Type
                        </FormLabel>
                        <RadioGroup
                            row
                            defaultValue={'object'}
                            onChange={(e) => 
                            {
                                const value = e.target.value as 'object' | 'list';

                                setValue('templateType', value);
                            }}
                        >
                            <FormControlLabel
                                label="단일"
                                value={'object'}
                                control={
                                    <Radio
                                        sx={{
                                            py: 0.5,
                                        }}
                                    />
                                }
                            />
                            <FormControlLabel
                                label="리스트"
                                value={'list'}
                                control={
                                    <Radio
                                        sx={{
                                            py: 0.5,
                                        }}
                                    />
                                }
                            />
                        </RadioGroup>
                    </Box>
                </Content>
                <Control
                    spacing={1}
                >
                    <SubmitButton
                        variant='contained'
                        fullWidth
                        disabled={loading}
                        onClick={submitEvent}
                    >
                        {
                            loading ?
                                <LoadingIcon
                                    size={20}
                                />
                                :
                                '생성'
                        }
                    </SubmitButton>
                    <Button
                        variant='contained'
                        fullWidth
                        color='info'
                        onClick={() => 
                        {
                            if(typeof close === 'function')
                            {
                                close();
                            }
                        }}
                    >
                        닫기
                    </Button>
                </Control>
            </Wrap>
        </Area>
    );
};

const Area = styled(Box)`
    padding: 2rem;
`;

const Wrap = styled(Stack)`
    width: 100%;
    /* overflow: hidden; */
`;

const Content = styled(Stack)`
    flex: 1;
`;

const Control = styled(Stack)`
    width: 100px;
`;

const SubmitButton = styled(Button)`
    height: 36.5px;
`;

const LoadingIcon = styled(CircularProgress)`
        color: ${({theme}) => 
    {
        return theme.palette.circularTheme.main;
    }};
`;

export default CreateLayoutItem;