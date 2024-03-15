import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
//context
import { useDYLayoutContext } from '../DYLayoutContext';
//components
import {
    Box,
    Stack,
} from '@mui/material';
import PartMapping from '../factoryElements/PartMapping';


const DYBoard: React.FC = () => 
{
    //context
    const {
        asideState,
        asideWidth,
    } = useDYLayoutContext();

    return (
        <Area
            sx={{
                width: asideState ? `calc(100% - ${asideWidth}px)` : '100%',
            }}
        >
            {
                <Wrap>
                    <Contents>
                        {/* <HeaderWrap>
                                {
                                    headerData.state.values.hasOwnProperty(layoutId) ?
                                        <PartMapping
                                            componentType={'header'}
                                            type={headerData.state.values?.[layoutId].type}
                                        />
                                        :
                                        headerData.state.defaultKeyName && headerData.state.values.hasOwnProperty(headerData.state.defaultKeyName) ? 
                                            <PartMapping
                                                componentType={'header'}
                                                type={headerData.state.values?.[headerData.state.defaultKeyName || '']?.type}
                                            />
                                            :
                                            <CommonDropEmpty
                                                placeHolder='Header 아이템을 추가 해주세요.'
                                                helperText={'우측 영역 \"HEADER\" 탭에서 Header를 골라주세요.'}
                                                ygap={32}
                                            />
                                }
                            </HeaderWrap> */}
                        <PartMapping
                            componentType='layout'
                        />
                        {
                            // (Array.isArray(layoutData.state) && layoutData.state.length > 0) ?
                            //     <Stack
                            //         spacing={3}
                            //     >
                            //         {
                            //             layoutData.state.map((d,i) => 
                            //             {
                            //                 return (
                            //                     <PartMapping
                            //                         key={i}
                            //                         componentType={'layout'}
                            //                         type={d.type}
                            //                         itemIndex={i}
                            //                     />
                            //                 );
                            //             })
                            //         }
                            //     </Stack>
                        }
                        {/* <FooterWrap>
                                {
                                    footerData.state.values.hasOwnProperty(layoutId) ?
                                        <PartMapping
                                            componentType={'footer'}
                                            type={footerData.state.values?.[layoutId].type}
                                        />
                                        :
                                        footerData.state.defaultKeyName && footerData.state.values.hasOwnProperty(footerData.state.defaultKeyName) ? 
                                            <PartMapping
                                                componentType={'footer'}
                                                type={footerData.state.values?.[footerData.state.defaultKeyName || '']?.type}
                                            />
                                            :
                                            <CommonDropEmpty
                                                placeHolder='Footer 아이템을 추가 해주세요.'
                                                helperText={'우측 영역 \"FOOTER\" 탭에서 Footer 골라주세요.'}
                                                ygap={32}
                                            />
                                }
                            </FooterWrap> */}
                    </Contents>
                </Wrap>
            }
        </Area>
    );
};

const Area = styled(Box)`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    box-sizing: border-box;
    transition-duration: 0.3s;
    transition-property: width;
    overflow: hidden;
`;

const Wrap = styled(Box)`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 36px 24px;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0.875rem;
    }
    &::-webkit-scrollbar-track {
        background-color: ${({theme}) => 
    {
        return theme.palette.scrollbarTrack.main;
    }};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => 
    {
        return theme.palette.scrollbarThumb.main;
    }};
        border: 3px solid ${({theme}) => 
    {
        return theme.palette.scrollbarThumb.main;
    }};
        border-radius: 0.875rem;;
    }
    &::-webkit-scrollbar-button {
        display:none;
    }
`;

const Contents = styled(Box)`
    position: relative;
`;

const HeaderWrap = styled(Box)`
    margin-bottom: 16px;
`;

const FooterWrap = styled(Box)`
    margin-top: 16px;
`;

export default DYBoard;