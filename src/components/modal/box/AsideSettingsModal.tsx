import React from 'react';
import { styled } from '@mui/material/styles';
//hooks
import { useForm, Controller } from 'react-hook-form';
//type
//icon
//components
import {
    Stack,
    Box,
    Button,
    TextField,
    FormControlLabel ,
    Divider,
    Typography,
    RadioGroup,
    Radio,
    // IconButton,
} from '@mui/material';
import IconSelector from '@/components/input/IconSelector';

interface IAsideSettingsModalProps {
    close?: () => void;
    title?: string;
    option?: any;
    callbackSubmit?: (form: {[key: string]: any}) => void;
}

const AsideSettingsModal: React.FC<IAsideSettingsModalProps> = (props) => 
{
    const {
        close,
        option,
        callbackSubmit,
    } = props;
    //hooks
    const {
        register,
        handleSubmit,
        control,
        setValue,
    } = useForm();

    const submitEvent = (form: {[key: string]: any}) => 
    {
        try 
        {
            if(typeof form.link !== 'string' || form.link === '')
            {
                throw 'link empty';
            }

            if(typeof callbackSubmit === 'function')
            {
                callbackSubmit(form);
            }
        }
        catch (error) 
        {
            if(error === 'link empty')
            {
                alert('URL 주소를 입력해주세요');
            }
            console.error(error);
        }
    };

    return (
        <Area>
            <Head>
                아이템 세팅
            </Head>
            <Wrap
                component={'form'}
                onSubmit={handleSubmit(submitEvent)}
            >
                <Left>
                    <Stack>
                        <TextField
                            label="URL 주소"
                            fullWidth
                            defaultValue={option.link ? option.link : ''}
                            {...register('link')}
                        />
                    </Stack>
                    <DividerBox
                        textAlign="left"
                        sx={{
                            margin: '15px auto',
                            fontSize: '12px',
                        }}
                    >
                        option
                    </DividerBox>
                    <Stack
                        spacing={2}
                    >
                        <Box>
                            <IconSelector
                                fullWidth
                                callbackSelect={(icon) => 
                                {
                                    setValue('icon', icon);
                                }}
                            />
                        </Box>
                        <Box>
                            <Title>
                                <OptionLabel variant='subtitle2'>접근 등급</OptionLabel>
                            </Title>
                            <Controller
                                name='ACL'
                                control={control}
                                defaultValue={typeof (option?.ACL) === 'number' ? String(option.ACL) : '1'}
                                render={({field}) => 
                                {
                                    return (
                                        <RadioGroup
                                            row
                                            aria-labelledby="aclLabel"
                                            {...field}
                                        >
                                            <FormControlLabel
                                                label="개발자"
                                                value={'0'}
                                                control={<Radio />}
                                            />
                                            <FormControlLabel
                                                label="최고 관리자"
                                                value={'1'}
                                                control={<Radio />}
                                            />
                                            <FormControlLabel
                                                label="관리자"
                                                value={'2'}
                                                control={<Radio />}
                                            />
                                        </RadioGroup>
                                    );
                                }}
                            />
                        </Box>
                        <Box>
                            <Title>
                                <OptionLabel variant='subtitle2'>
                                    접근 페이지 창 여부
                                </OptionLabel>
                            </Title>
                            <Controller
                                name='newTab'
                                control={control}
                                defaultValue={option?.newTab ? '1' : '0'}
                                render={({field}) => 
                                {
                                    return (
                                        <RadioGroup
                                            row
                                            aria-labelledby="footerLabel"
                                            {...field}
                                        >
                                            <FormControlLabel
                                                label="현재 창"
                                                value={'0'}
                                                control={<Radio />}
                                            />
                                            <FormControlLabel
                                                label="새 창"
                                                value={'1'}
                                                control={<Radio />}
                                            />
                                        </RadioGroup>
                                    );
                                }}
                            />
                        </Box>
                    </Stack>
                </Left>
                <Right>
                    <TopBtnGroup>
                        <Btn
                            type='submit'
                            fullWidth
                            variant="contained"
                        >
                            저장
                        </Btn>
                        <Btn
                            fullWidth
                            variant="outlined"
                            onClick={() => 
                            {
                                if(typeof close === 'function')
                                {
                                    close();
                                }
                            }}
                        >
                            취소
                        </Btn>
                    </TopBtnGroup>
                </Right>
            </Wrap>
        </Area>
    );
};

const Area = styled(Box)`
    
`;

const Head = styled(Box)`
    padding: 16px 24px 12px;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.dark;
    }};
    background-color : ${({theme}) => 
    {
        return theme.palette.backgroundTheme.main;
    }};
`;

const Wrap = styled(Box)`
    display: flex;
    min-height: 400px;
    gap: 20px;
    padding: 24px 24px;
`;

const Left = styled(Box)`
    flex: 1;
    border: 1px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
    padding: 24px 16px;
`;

const Right = styled(Box)`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 140px;
    width: 100%;
    overflow: hidden;
`;

const TopBtnGroup = styled(Box)`
    flex: 1;
`;

const Btn = styled(Button)`
    height: 46px;
    border-radius: 23px;
    &:not(:last-of-type) {
        margin-bottom: 10px;
    }
`;

const Title = styled(Box)`
    display: flex;
    align-items: center;
`;

const OptionLabel = styled(Typography)`
    font-weight: bold;
`;
const DividerBox = styled(Divider)`
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.dark;
    }};
`;

export default AsideSettingsModal;