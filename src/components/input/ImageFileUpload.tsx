import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
//utils
import { imageFileUploadHandler } from '@/utils/imageFileUpload';
//icon
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ColorLensIcon from '@mui/icons-material/ColorLens';
//components
import {
    Box,
    Popover,
    Stack,
    Typography,
    CircularProgress,
    IconButton,
    ButtonGroup,
    ImageList,
    ImageListItem,
} from '@mui/material';

//파일 변환기 타입
// type IFileReaderProps = (file: File) => Promise<string | ArrayBuffer | null>;

//파일 업로드 컴포넌트 타입
export interface IImageFileUploadProps {
    width?: number,
    height?: number,
    fullWidth?: boolean,
    multiple?: boolean;
    preview?: boolean;
    dragdrop?: boolean;
    placeholder?: string;
    helperText?: string;
    defaultValue?: string[];
    objectFit?: 'contain' | 'cover';
    maxUploadSize?: number;
    callbackUpload?: (file: string[] | null) => void;
}

const minWidth = 100;
const minHeight = 100;

//배경 컬러 옵션 값
const colorPalette = ['#fff', '#ccc', '#999', '#000'];

const ImageFileUpload: React.FC<IImageFileUploadProps> = (props) => 
{
    const {
        width = 400, //길이
        height = 225, //높이
        fullWidth, //최대 width로 설정
        multiple, //멀티 업로드 여부
        preview, //업로드 시 이미지 미리보기 여부
        dragdrop, //드롭 업로드 여부
        placeholder = '파일을 업로드 해주세요.', //업로드 전 placeholder
        helperText, //placeholder 아래 caption text
        defaultValue, //시작 시 기본 value,
        objectFit = 'contain', //이미지 옵션값
        maxUploadSize = 5, //업로드 최대 사이즈 (단위 - mb)
        callbackUpload,
    } = props;
    //ref
    const fileRef= useRef<HTMLInputElement | null>(null);
    //state
    const [loading, setLoading] = useState<boolean>(false); // 업로드 로딩 상태
    const [dropState, setDropState] = useState<boolean>(false); //드레그 앤 드롭 상태
    const [colorAnchorEl, setColorAnchorEl] = useState<null | HTMLElement>(null); //컬러 파레트 엥커
    const [fieldColor, setFieldColor] = useState<string | null>(null); //업로드 바탕색
    //file state
    const [fileUrls, setFileUrls] = useState<string[] | null>(defaultValue ? defaultValue : null); //s3 url 배열

    const fileProcessor = async (files?: FileList | null) => 
    {
        try 
        {
            if (!files) 
            {
                return;
            }
    
            setLoading(true);
    
            const filesArray = Array.from(files);
            const imageMaxSize = maxUploadSize * 1024 * 1024; // 업로드 용량 제한
            const newFileArr = [];

            for (const file of filesArray) 
            {
                const {
                    size,
                } = file;
            
                if (size > imageMaxSize) 
                {
                    throw new Error('oversize');
                }
            
                try 
                {
                    const imageUrl = await imageFileUploadHandler(file);
                    newFileArr.push(imageUrl);
                }
                catch (error) 
                {
                    // 에러 핸들링 로직
                    throw error; // 혹은 특정 에러 처리 후 반복 중단
                }
            }

            const result = await Promise.all(newFileArr);

            if(multiple)
            {
                setFileUrls(prev => 
                {
                    if(prev)
                    {
                        if(Array.isArray(prev))
                        {
                            return [...prev,...result];
                        }
                        else
                        {
                            return [prev,...result];
                        }
                    }
                    else
                    {
                        return result;
                    }
                });
            }
            else
            {
                setFileUrls(result);
            }
            
        }
        catch (error) 
        {
            throw error;
        }
        finally
        {
            setLoading(false);
        }
    };

    //파일 input 이벤트
    const fileInputEvent = async (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        try 
        {
            const files = e.target.files;

            await fileProcessor(files);

            //reset file value
            e.target.value = '';
        }
        catch (error) 
        {
            console.error(error);
            alert('업로드에 실패했습니다');
        }
    };

    //드레깅
    const dragging = (e: React.DragEvent<HTMLDivElement>) => 
    {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        setDropState(true);
    };

    //드레그 영역 이탈
    const dragFocusOut = () => 
    {
        setDropState(false);
    };

    //드롭 완료 최종 제출 이벤트
    const dropComplete = async (event: React.DragEvent<HTMLDivElement>) => 
    {
        event.preventDefault();

        //drop state end
        setDropState(false);

        const files = event.dataTransfer.files;

        await fileProcessor(files);
    };

    //업로드 리셋
    const resetEvent = () => 
    {
        setFileUrls(null);
        setFieldColor(null);
    };


    //이미지 파일 이름 추출기
    const fileNameExtractor = (file: string ) => 
    {
        const fileName = file.split('__');
        return fileName[fileName.length - 1];
    };

    useEffect(() => 
    {
        if(typeof callbackUpload === 'function')
        {
            callbackUpload(fileUrls);
        }
    }, [fileUrls]);

    return (
        <>
            <FileArea>
                <FileBox
                    mwt={minWidth}
                    mht={minHeight}
                    wt={width}
                    ht={height}
                    {
                        ...(fullWidth && {
                            fw: 'full',
                        })
                    }
                >
                    <DropArea
                        {
                            ...(dragdrop && {
                                onDragOver: dragging,
                                onDragLeave: dragFocusOut,
                                onDrop: dropComplete,
                            })
                        }
                    >
                        <DropWrap>
                            <DropBox
                                {
                                    ...(dropState && {
                                        isdrop: 'over',
                                    })
                                }
                                {
                                    ...((fileUrls && fieldColor) && {
                                        bgcolor: fieldColor,
                                    })
                                }
                            >
                                {
                                    (() => 
                                    {
                                        if(loading)
                                        {
                                            return (
                                                <LoadingBox>
                                                    <LoadingIcon
                                                        size={50}
                                                    />
                                                </LoadingBox>
                                            );
                                        }

                                        if(!multiple && fileUrls && fileUrls.length > 0)
                                        {
                                            if(preview)
                                            {
                                                return (
                                                    <PreviewBox>
                                                        <Image
                                                            src={fileUrls[0]}
                                                            alt={fileNameExtractor(fileUrls[0])}
                                                            fill
                                                            sizes='width: 100vw'
                                                            style={{objectFit: objectFit}}
                                                        />
                                                    </PreviewBox>
                                                );
                                            }
                                            else
                                            {
                                                return (
                                                    <UploadSkeletonBox>
                                                        <UploadText>
                                                            {fileNameExtractor(fileUrls[0])}
                                                        </UploadText>
                                                    </UploadSkeletonBox>
                                                );
                                            }
                                        }
                                        return (
                                            <UploadSkeletonBox>
                                                <UploadIcon/>
                                                <UploadText>
                                                    {placeholder}
                                                </UploadText>
                                                {
                                                    helperText &&
                                                        <UploadText
                                                            variant='caption'
                                                        >
                                                            {helperText}
                                                        </UploadText>
                                                }
                                            </UploadSkeletonBox>
                                        );
                                    })()
                                }
                                <HiddenFileInput
                                    ref={fileRef}
                                    type="file"
                                    multiple={multiple}
                                    onChange={fileInputEvent}
                                    disabled={loading}
                                    accept='image/*'
                                />
                            </DropBox>
                        </DropWrap>
                    </DropArea>
                </FileBox>
                <UploadControlBox>
                    <BtnControlBox
                        orientation="vertical"
                    >
                        <IconButton
                            onClick={(e) => 
                            {
                                setColorAnchorEl(colorAnchorEl ? null : e.currentTarget);
                            }}
                        >
                            <ColorLensIcon
                                sx={{
                                    color: `${fieldColor ? 'typoColor.main' : 'btnColor.main'}`,
                                }}
                            />
                            <Popover
                                open={Boolean(colorAnchorEl)}
                                anchorEl={colorAnchorEl}
                                onClose={() => 
                                {
                                    setColorAnchorEl(null);
                                }}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <ColorBox>
                                    <Stack
                                        spacing={1.5}
                                    >
                                        {
                                            colorPalette.map((color,i) => 
                                            {
                                                return (
                                                    <ColorItem
                                                        key={i}
                                                        onClick={(e) => 
                                                        {
                                                            e.stopPropagation();
                                                            setFieldColor(color);
                                                        }}
                                                        cicolor={color}
                                                        {
                                                            ...((fieldColor && (fieldColor == color)) && {
                                                                activecolor: fieldColor,
                                                            })
                                                        }
                                                    />
                                                );
                                            })
                                        }
                                    </Stack>
                                </ColorBox>
                            </Popover>
                        </IconButton>
                        <IconButton
                            onClick={resetEvent}
                        >
                            <RestartAltIcon/>
                        </IconButton>
                    </BtnControlBox>
                </UploadControlBox>
            </FileArea>
            {
                multiple &&
                    <FileUploadListArea>
                        <Typography
                            variant='caption'
                            sx={{
                                display: 'block',
                                color: 'typoColor.light',
                                mt: 1,
                            }}
                        >
                            업로드 파일 리스트
                        </Typography>
                        {
                            (Array.isArray(fileUrls) && fileUrls.length > 0) &&
                                <ImageList
                                    sx={{
                                        position: 'relative',
                                        width: `${width > 400 ? width : 400}px`,
                                    }}
                                    cols={width > 400 ? 5 : 4}
                                    gap={10}
                                    rowHeight={(((width > 400 ? width : 400) - (10 * ((width > 400 ? 5 : 4) - 1))) / (width > 400 ? 5 : 4))}
                                >
                                    {
                                        fileUrls.map((url, i) => 
                                        {
                                            return (
                                                <ImageListItem
                                                    key={i}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-end',
                                                    }}
                                                >
                                                    <RemoveItemBtn
                                                        size='small'
                                                        onClick={() => 
                                                        {
                                                            setFileUrls(prev => 
                                                            {
                                                                if(prev)
                                                                {
                                                                    const newarr = [...prev];
                                                                    newarr.splice(i, 1);
                                                                    return newarr as string[];
                                                                }
                                                                return prev;
                                                            });
                                                        }}
                                                    >
                                                        <CloseIcon/>
                                                    </RemoveItemBtn>
                                                    <Box
                                                        sx={{
                                                            position: 'relative',
                                                            width: '100%',
                                                            height: '100%',
                                                            backgroundColor: 'backgroundTheme.main',
                                                        }}
                                                    >
                                                        <Image
                                                            src={url}
                                                            alt={(() => 
                                                            {
                                                                const name = url.split('__');
                                                                return name[name.length - 1];
                                                            })()}
                                                            fill
                                                            sizes='width: 100vw'
                                                            style={{objectFit: 'contain'}}
                                                        />
                                                    </Box>
                                                </ImageListItem>
                                            );
                                        })}
                                </ImageList>
                        }
                    </FileUploadListArea>
            }
        </>
    );
};

const FileArea = styled(Box)`
    position: relative;
    display: flex;
    overflow: hidden;
`;

const FileUploadListArea = styled(Box)`
    position: relative;
`;

const FileBox = styled(Box)<{mwt: number, mht: number, wt: number, ht: number, fw?: 'full'}>`
    position: relative;
    display: flex;
    min-width: ${({mwt}) => 
    {
        return mwt + 'px';
    }};
    min-height: ${({mht}) => 
    {
        return mht + 'px';
    }};
    width: ${({wt, fw}) => 
    {
        if(fw === 'full')
        {
            return '100%';
        }
        return wt + 'px';
    }};
    height: ${({ht}) => 
    {
        return ht + 'px';
    }};
    border: 1px solid;
    border-radius: 6px;
    border-color: ${({theme}) => 
    {
        return theme.palette.dividerTheme.dark;
    }};
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.dark;
    }};
    box-sizing: border-box;
    overflow: hidden;
`;

const UploadControlBox = styled(Box)`
    position: relative;
`;

const BtnControlBox = styled(ButtonGroup)`
    border: 1px solid;
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-color: ${({theme}) => 
    {
        return theme.palette.dividerTheme.dark;
    }};
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.dark;
    }};
`;

const DropArea = styled(Box)`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1rem;
    cursor: pointer;
`;

const DropWrap = styled(Box)`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${({theme}) => 
    {
        return theme.palette.backgroundTheme.light;
    }};
`;

const DropBox = styled(Box)<{isdrop?: 'over', bgcolor?: string}>`
    position: relative;
    height: 100%;
    border-radius: 6px;
    background-color: ${({theme, isdrop, bgcolor}) => 
    {
        if(isdrop === 'over')
        {
            return theme.palette.primary.main + '10';
        }
        else
        {
            return typeof bgcolor === 'string' ? bgcolor : theme.palette.backgroundTheme.light;
        }
    }};
    color: ${({theme, isdrop}) => 
    {
        if(isdrop === 'over')
        {
            return theme.palette.primary.main;
        }
        else
        {
            return theme.palette.typoColor.light;
        }
    }};
    border-width: 1px;
    border-style: ${({isdrop}) => 
    {
        return isdrop === 'over' ? 'dashed' : 'solid';
    }};
    border-color: ${({theme, isdrop}) => 
    {
        if(isdrop === 'over')
        {
            return theme.palette.primary.main;
        }
        else
        {
            return 'transparent';
        }
    }};
    transition-duration: 0.3s;
    transition-property: color, border, background-color;
    overflow: hidden;
`;

const UploadSkeletonBox = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem;
    overflow: hidden;
`;

const UploadIcon = styled(CloudUploadIcon)`
    font-size: 70px;
`;

const UploadText = styled(Typography)`
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: inherit;
`;

const HiddenFileInput = styled('input')`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

const LoadingBox = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.light;
    }};
`;

const LoadingIcon = styled(CircularProgress)`
    color: inherit;
`;

const RemoveItemBtn = styled(IconButton)`
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    background-color: ${({theme})=>
    {
        return theme.palette.error.main;
    }};
    &:hover {
        background-color: ${({theme})=>
    {
        return theme.palette.error.main;
    }};
    }
`;

const ColorBox = styled(Box)`
    padding: 0.5rem;
`;

const ColorItem = styled(Box)<{cicolor:string, activecolor?: string}>`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid;
    border-color: ${({theme, activecolor})=>
    {
        return activecolor ? theme.palette.primary.main : 'transparent';
    }};
    background-color: ${({cicolor})=>
    {
        return cicolor;
    }};
    overflow: hidden;
    box-sizing: border-box;
    transition: 0.3s;
    transition-property: border;
`;

const PreviewBox = styled(Box)`
    position: relative;
    width: 100%;
    height: 100%;
`;

export default ImageFileUpload;