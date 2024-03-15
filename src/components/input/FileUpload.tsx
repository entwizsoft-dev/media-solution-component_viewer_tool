import React, {DragEvent,useState,useRef, useEffect} from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
//icons
import UploadFileIcon from '@mui/icons-material/UploadFile';
//components
import {
    Box,
    Typography,
} from '@mui/material';

interface IFileUpload {
    fileAccept: 'video' | 'image';
    desc?: string;
    previewImg?: React.ReactNode | string;
    objectFit?: 'contain' | 'cover';
    filesCallback?: (file: File) => void;
    resetTrigger?: boolean;
    bgcolor?: string;
    onReset?: () => void;
    imgURL? : string;
    useSelectColor?: boolean;
}

//배경 컬러 옵션 값
const colorOption = [
    {
        color: '#fff',
    },
    {
        color: '#ccc',
    },
    {
        color: '#999',
    },
    {
        color: '#000',
    },
];

const FileUpload: React.FC<IFileUpload> = (props) => 
{
    const {
        fileAccept,
        desc,
        previewImg,
        objectFit = 'contain',
        filesCallback,
        resetTrigger,
        bgcolor = 'default',
        onReset,
        useSelectColor,
        imgURL = null,
    } = props;
    //ref
    const dropRef = useRef<HTMLDivElement | null>(null);
    const fileRef= useRef<HTMLInputElement | null>(null);
    //state
    const [dropState, setDropState] = useState<boolean>(false); //드레그 앤 드롭 여부
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [fileName,setFileName] = useState('');
    const [bg, setBg] = useState<string>(bgcolor); //배경 색

    //드롭 진행 중
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => 
    {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        setDropState(true);
    };
    //드롭 포커스 아웃
    const handleDragLeave = () => 
    {
        setDropState(false);
    };

    //드롭 완료 이벤트
    const handleDrop = async (event: DragEvent<HTMLDivElement>) => 
    {
        event.preventDefault();

        //drop state end
        setDropState(false);

        const files: any = event.dataTransfer.files;
        const previewUrlArray: string[] = [];
        for (const file of files) 
        {
            if(file.type.includes(fileAccept) || (fileAccept === 'video' && file.name.includes('m3u8')))
            {
                const previewUrl = await readFile(file);
                previewUrlArray.push(previewUrl as string);
            }
            else
            {
                return alert(`${fileAccept === 'image' ? '이미지': '비디오'}파일만 업로드 가능합니다.`);
            }
        }

        setPreviewUrls(previewUrlArray);
        setFileName(files[0].name);

        if (dropRef.current) 
        {
            dropRef.current.style.backgroundColor = '';
            dropRef.current.style.border = '';
        }

    };

    //파일 input 이벤트
    const handleFileSelect = async (files: FileList | null) => 
    {
        if (!files) 
        {
            return;
        }
        const filesArray = Array.from(files);
        if(filesArray.length !== 1) 
        {
            return;
        } // 멀티 옵션 때 수정 예정.

        const previewUrlArray: string[] = [];

        for (const file of filesArray) 
        {
            if(fileAccept === 'video')
            {
                if(typeof filesCallback === 'function')
                {
                    filesCallback(file);
                }
            }
            else if(file.type.includes(fileAccept))
            {
                const previewUrl = await readFile(file);
                previewUrlArray.push(previewUrl as string);
            }
            else
            {
                return alert(`${fileAccept === 'image' ? '이미지': '비디오'}파일만 업로드 가능합니다.`);
            }
        }
        setPreviewUrls(previewUrlArray);
        setFileName(files[0].name);
    };

    //
    const readFile = (file: File) => 
    {
        return new Promise<string | ArrayBuffer | null>((resolve) => 
        {
            try 
            {
                const {
                    type,
                    size,
                } = file;
                const imageMaxSize = 5 * 1024 * 1024; // 이미지 업로드 용량 5메가 제한
                if(type.includes('image') && size > imageMaxSize)
                {
                    throw 'size error';
                }

                const reader = new FileReader();
                reader.onload = () => 
                {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
                if(typeof filesCallback === 'function')
                {
                    filesCallback(file);
                }
            }
            catch (error) 
            {
                console.error(error);
                if(error === 'size error')
                {
                    alert('이미지 용량(최대 5MB)이 초과되었습니다.');
                }
            }

        });
    };

    //reset onTrigger
    useEffect(() => 
    {
        if(typeof resetTrigger === 'boolean' && resetTrigger)
        {
            setPreviewUrls([]);
            setFileName('');
            if(fileRef.current)
            {
                fileRef.current.value = '';
            }
            if(typeof onReset === 'function')
            {
                onReset();
            }
        }
    }, [resetTrigger,onReset]);

    return (
        <FileBox>
            <DragBox
                ref={dropRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                dropstate={dropState ? 'drop' : 'noneDrop'}
                bgc={bg}
                useselect={useSelectColor ? 'use' : 'notuse'}
            >
                <Box
                    sx={{
                        height: '100%',
                    }}
                >
                    {/* drag and drop 영역 */}
                    {
                        previewUrls.length === 0 && imgURL ? 
                            <ImageWrap>
                                <Image
                                    src={imgURL}
                                    alt='previewImage'
                                    fill
                                    style={{ objectFit: objectFit }}
                                    priority
                                />
                            </ImageWrap>
                            :
                            previewUrls.length > 0 ?
                                previewUrls[0].includes('data:image') ?
                                    (
                                        previewUrls.map((previewUrl, index) => 
                                        {
                                            return (
                                                <LabelWrap
                                                    htmlFor="fileUpload"
                                                    key={index}
                                                >
                                                    <ImageWrap>
                                                        <Image
                                                            src={previewUrl}
                                                            alt='previewImage'
                                                            fill
                                                            style={{ objectFit: objectFit }}
                                                            priority
                                                        />
                                                    </ImageWrap>
                                                </LabelWrap>
                                            );
                                        })
                                    )
                                    :
                                /*eslint-disable-next-line react/jsx-indent */
                                    <VideoWrap>
                                        <p className='videoName'>{fileName}</p>
                                    </VideoWrap>
                                :
                            /*eslint-disable-next-line react/jsx-indent */
                                <InputTextBox>
                                    {
                                        previewImg ?
                                            typeof previewImg !== 'string' ?
                                                previewImg
                                                :
                                                <ImageWrap>
                                                    <Image
                                                        src={previewImg}
                                                        alt='previewImage'
                                                        fill
                                                        style={{ objectFit: objectFit }}
                                                        priority
                                                    />
                                                </ImageWrap>
                                            :
                                        /*eslint-disable-next-line react/jsx-indent */
                                            <Box>
                                                <UploadFileIcon />
                                                <Typography className='desc'>
                                                    {desc}
                                                </Typography>
                                            </Box>
                                    }
                                </InputTextBox>
                    }
                </Box>
                <InputHidden
                    ref={fileRef}
                    type="file"
                    onChange={(e) => 
                    {
                        return handleFileSelect(e.target.files);
                    }}
                    multiple
                    id="fileUpload"
                    accept={fileAccept === 'video' ?  'video/*,.m3u8': `${fileAccept}/*`}
                />
            </DragBox>
            {
                useSelectColor &&
                    <ColorBox>
                        {
                            colorOption.map((d,i) => 
                            {
                                return (
                                    <ColorItem
                                        key={i}
                                        onClick={() => 
                                        {
                                            setBg(d.color);
                                        }}
                                        cicolor={d.color}
                                    />
                                );
                            })
                        }
                    </ColorBox>
            }
        </FileBox>
    );
};

const FileBox = styled(Box)`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
`;

const ColorBox = styled(Box)`
    width: 35px;
    margin-left: 10px;
`;

const ColorItem = styled(Box)<{cicolor:string}>`
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background-color: ${({cicolor})=>
    {
        return cicolor;
    }};
    &:not(:last-of-type) {
        margin-bottom: 8px;
    }
`;

const DragBox = styled(Box)<{dropstate: 'drop' | 'noneDrop', bgc: string, useselect: 'use' | 'notuse'}>`
    position: relative;
    width: 100%;
    height: ${({useselect}) => 
    {
        return useselect === 'use' ? 'calc(100% - 45px)' : '100%';
    }};
    background-color: ${({bgc}) => 
    {
        return bgc;
    }};
    box-sizing: border-box;
    transition-duration: 0.35s;
    transition-property: background-color;

    border: ${({dropstate}) => 
    {
        return dropstate === 'drop' ? '1px dashed #aaa' : '1px solid #d2d2d2';
    }};
    border-radius: inherit;
    cursor: pointer;
`;
const LabelWrap = styled('label')`
    position: relative;
    width: 100%;
`;
const ImageWrap = styled('div')`
    position: relative;
    width: 100%;
    height: 100%;
`;
const VideoWrap = styled('div')`
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    justify-content: center;
    align-items: center;

    .videoName {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-all;
    }
`;
const InputHidden = styled('input')`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;
const InputTextBox = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
    text-align: center;
    cursor: pointer;

    .desc {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-all;
    }
`;

FileUpload.defaultProps = {
    desc: '파일을 첨부해주세요',
};

export default FileUpload;