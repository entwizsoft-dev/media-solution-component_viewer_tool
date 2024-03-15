import React, {DragEvent, useState, useRef} from 'react';
import { styled } from '@mui/material/styles';
//components
import {
    Box,
    Typography,
} from '@mui/material';
import MappingIcon from '../MappingIcon';

export interface IFileUploadProps {
    label?: string;
    size?: number,
    placeholder?: string;
    helpText?: string;
    fullWidth?: boolean,
    fileAccept?: string;
    multiple?: boolean;
    maxFileSize?: number;
    callbackFile?: (files: FileList) => void;
    callbackError?: (error: unknown) => void;
}

type IFiles = FileList | null | undefined;

const FileUploader: React.FC<IFileUploadProps> = (props) => 
{
    const {
        label = 'File Upload',
        size = 500,
        placeholder = '파일을 업로드해주세요.',
        helpText,
        fullWidth,
        fileAccept,
        multiple,
        maxFileSize = 5, //단일 파일 메가바이트 기준
        callbackFile,
        callbackError,
    } = props;
    //ref
    const dropRef = useRef<HTMLDivElement | null>(null);
    const fileRef= useRef<HTMLInputElement | null>(null);
    //state
    const [dndState, setDndState] = useState<boolean>(false); //드레그 앤 드롭 상태 값

    //파일 변환 함수
    const validateFile = (files: IFiles) => 
    {
        if(files)
        {
            const maxSize = maxFileSize * 1048576; //메가바이트
    
            for (const file of files) 
            {
                if (file.size > maxSize)
                {
                    throw {
                        state: 'sizeError',
                        message: `업로드 용량(최대 ${maxFileSize}MB)이 초과되었습니다.`,
                    };
                }
            }
            return files;
        }
        else
        {
            throw {
                state: 'fileEmpty',
                message: 'file 데이터가 없습니다.',
            };
        }
    };
    
    //드롭 대기 상태
    const handleDragStart = (event: DragEvent<HTMLDivElement>) => 
    {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        setDndState(true);
    };
    //드롭 포커스 아웃
    const handleDragLeave = () => 
    {
        setDndState(false);
    };

    //callback event
    const callbackParseFiles = (files: IFiles) => 
    {
        try 
        {
            const parseFiles = validateFile(files);

            if(typeof callbackFile === 'function')
            {
                callbackFile(parseFiles);
            }
        }
        catch (error) 
        {
            if(typeof callbackError === 'function')
            {
                callbackError(error);
            }
        }
        finally
        {
            setDndState(false);
        }
    };

    return (
        <Area
            sx={{
                width: fullWidth ? '100%' : size + 'px',
                maxHeight: !fullWidth ? size + 'px' : 'auto',
            }}
        >
            <Wrap>
                {
                    <DragBox
                        ref={dropRef}
                        onDrop={async (e) => 
                        {
                            e.preventDefault();
                            callbackParseFiles(e.dataTransfer.files);
                        }}
                        onDragOver={handleDragStart}
                        onDragLeave={handleDragLeave}
                        dndbg={dndState ? 't' : 'f'}
                        sx={{
                            borderColor: dndState ? 'primary.main' : 'borderColor.main',
                        }}
                    >
                        <PlaceHoldBox>
                            <IconContent
                                sx={{
                                    color: dndState ? 'primary.main' : 'typoColor.main',
                                }}
                            >
                                <MappingIcon
                                    icon='FileUploadIcon'
                                />
                            </IconContent>
                            <Typography
                                variant='body2'
                                sx={{
                                    color: dndState ? 'primary.main' : 'typoColor.main',
                                }}
                            >
                                {placeholder}
                            </Typography>
                            {
                                helpText &&
                                    <Typography
                                        variant='caption'
                                        sx={{
                                            color: dndState ? 'primary.main' : 'typoColor.light',
                                        }}
                                    >
                                        {helpText}
                                    </Typography>
                            }
                        </PlaceHoldBox>
                        <InputHidden
                            ref={fileRef}
                            type="file"
                            accept={fileAccept ? fileAccept : '/*'}
                            multiple={multiple}
                            onChange={(e) => 
                            {
                                callbackParseFiles(e.target.files);
                            }}
                        />
                    </DragBox>
                }
                <LabelBox>
                    <legend>
                        <span>{label}</span>
                    </legend>
                </LabelBox>
            </Wrap>
        </Area>
    );
};

const Area = styled(Box)`
    position: relative;
`;

const Wrap = styled(Box)`
    position: relative;
    flex: 1;
    display: flex;
    aspect-ratio: 21/9;
    border-radius: 4px;
    padding: 18px;
    box-sizing: border-box;
`;

const LabelBox = styled('fieldset')`
    position: absolute;
    inset: -5px 0 0;
    z-index: 1;
    pointer-events: none;
    overflow: hidden;
    border-radius: inherit;
    border: 1px solid;
    border-color: ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};

    & > legend {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        font-size: 14px;
        padding: 0 8px;
        color: ${({theme}) => 
    {
        return theme.palette.typoColor.light;
    }};
    }
`;

const DragBox = styled(Box)<{dndbg: 't' | 'f'}>`
    position: relative;
    inset: 5px 0 0;
    width: 100%;
    border: 2px dashed;
    background-color: ${({theme, dndbg}) => 
    {
        return dndbg === 't' ? theme.palette.primary.main + 40 : 'transparent';
    }};
    transition-duration: 0.35s;
    transition-property: background-color border-color;
`;

const InputHidden = styled('input')`
    position: absolute;
    inset: 0;
    z-index: 2;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    overflow: hidden;
`;

const PlaceHoldBox = styled(Box)`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const IconContent = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    aspect-ratio: 1/1;
    margin-bottom: 6px;
    font-size: 50px;
    & > svg {
        font-size: inherit;
    }
`;

export default FileUploader;