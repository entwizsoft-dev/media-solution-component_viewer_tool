import React from 'react';
import { styled } from '@mui/material/styles';
import downloadFile from '@/utils/downloadFile';
import { imageFileUploadHandler } from '@/utils/imageFileUpload';
//components
import {
    Box,
    AppBar,
    Typography,
    ButtonGroup,
    Button,
    IconButton,
    Popover,
} from '@mui/material';
import FileUploader from '@/components/input/FileUploader';
import MappingIcon from '@/components/MappingIcon';

const DYHeader: React.FC = () => 
{
    const [imageUploadEl, setImageUploadEl] = React.useState<HTMLButtonElement | null>(null);
    const [viewUrl, setViewUrl] = React.useState<string | null>(null);
    const [uploadUrl, setUploadUrl] = React.useState<string | null>(null);

    return (
        <>
            <Head
                position='absolute'
            >
                <LeftControlBox>
                    <LeftControlGtoup
                        disableElevation
                        variant="text"
                        color='info'
                    >
                        <ControlIcon
                            onClick={async () => 
                            {
                                try 
                                {
                                    if(confirm('파일을 저장하시겠습니까?'))
                                    {
                                        await downloadFile('/api/exportFileDownload');
                                    }
                                }
                                catch (error) 
                                {
                                    console.error(error);
                                    alert('파일 저장에 실패하였습니다.');
                                }
                            }}
                        >
                            <Typography variant='button'>파일 저장</Typography>
                        </ControlIcon>
                        <ControlIcon
                            onClick={(e) => 
                            {
                                setImageUploadEl(e.currentTarget);
                            }}
                        >
                            <Typography variant='button'>이미지 업로드</Typography>
                        </ControlIcon>
                    </LeftControlGtoup>
                </LeftControlBox>
                <TitleWrap>
                    <TitleBox>
                        <Title
                            variant='button'
                        >
                            컴포넌트 테스트 영역
                        </Title>
                    </TitleBox>
                </TitleWrap>
                <RightControlBox/>
            </Head>
            <Popover
                open={Boolean(imageUploadEl)}
                anchorEl={imageUploadEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Box
                    sx={{
                        pt: 1,
                        pb: 3,
                        px: 2,
                        width: '400px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mb: 2,
                        }}
                    >
                        <IconButton
                            onClick={() => 
                            {
                                setImageUploadEl(null);
                                setUploadUrl(null);
                                setViewUrl(null);
                            }}
                        >
                            <MappingIcon
                                icon='CloseIcon'
                            />
                        </IconButton>
                    </Box>
                    <FileUploader
                        fullWidth
                        label='Image Upload'
                        placeholder='이미지를 업로드 해주세요.'
                        callbackFile={async (files) => 
                        {
                            try 
                            {
                                const url = await imageFileUploadHandler(files[0]);
                                setUploadUrl(url);
                                setViewUrl(url.split('https://d21ageesh0dquz.cloudfront.net/images/')?.[1] || '알 수 없는 이미지.jpg');
                            }
                            catch (error) 
                            {
                                console.error(error);
                                setUploadUrl(null);
                                setViewUrl(null);
                                alert('이미지 업로드에 실패하였습니다.');
                            }
                        }}
                    />
                    {
                        uploadUrl &&
                            <Box 
                                sx={{
                                    mt: 2,
                                    gap: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {viewUrl}
                                </Typography>
                                <IconButton
                                    onClick={async () => 
                                    {
                                        try 
                                        {
                                            await navigator.clipboard.writeText(uploadUrl);
                                            alert('이미지 주소가 클립보드에 복사되었습니다.');
                                        }
                                        catch (error) 
                                        {
                                            console.error('클립보드 복사에 실패했습니다.', error);
                                        }
                                    }}
                                >
                                    <MappingIcon
                                        icon='ContentCopyIcon'
                                    />
                                </IconButton>
                            </Box>
                    }
                </Box>
            </Popover>
        </>
    );
};

const Head = styled(AppBar)`
    flex-direction: row;
    height: 36px;
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.origin;
    }};
`;

const LeftControlBox = styled(Box)`
    flex-basis: 30%;
`;

const LeftControlGtoup = styled(ButtonGroup)`
    height: 100%;

    & > .MuiButtonGroup-grouped {
        border-color: transparent;
    }
`;

const ControlIcon = styled(Button)`
    padding: 0 0.875rem;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.main;
    }};
`;

const TitleWrap = styled(Box)`
    flex-basis: 40%;
`;

const TitleBox = styled(Box)`
    flex-grow: 1;
    height: 100%;
`;

const Title = styled(Typography)`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const RightControlBox = styled(Box)`
    flex-basis: 30%;
`;

export default DYHeader;