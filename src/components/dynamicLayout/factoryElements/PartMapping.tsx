
/* code start */
import React from 'react';
import { styled } from '@mui/material/styles';
//context
import { useDYLayoutContext } from '../DYLayoutContext';
//type
import {
    ITableBaseDataProps,
} from '@/interfaces/table.interface';
import {
    IContentBridgeKeyProps,
    ILayoutElementListValueProps,
    ILayoutTotalElementListProps,
} from '../interface/element.interface';
import {
    IFocuseIndexPoprs,
    ILayoutCoreDataObjectProps,
} from '../interface/layout.interface';
import {
    ILayoutCommonElementDataProps,
} from '../interface/commonElement.interface';
//components
import {
    Box,
    Typography,
} from '@mui/material';
import MappingIcon from '@/components/MappingIcon';
import ExportFile from '@/export/ExportFile';

interface IStateProrps<T> {
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
}

//element partMapping에서 쓰이는 state 값
interface IPartComponentsStateProps<T> {
    state: T;
    setState: (callback: (prev: T, index: number) => T) => void;
}

//파트에서 쓰이는 고정 props
export interface IPartComponentsProps {
    currentLayoutData: IPartComponentsStateProps<ILayoutCoreDataObjectProps>;
    currentBridgeKey?: IContentBridgeKeyProps;
    bindComponentLayoutUpdate: (templateKey?: string) => void;
    focusIndex: IStateProrps<IFocuseIndexPoprs>;
    focusParent: boolean;
}

//헤더,푸터 요소 파트에서 쓰이는 고정 props
export interface ICommonPartComponentsProps {
    focusIndex: IStateProrps<IFocuseIndexPoprs>;
    currentLayoutData: IPartComponentsStateProps<ILayoutTotalElementListProps | undefined>;
    bindComponentLayoutUpdate: (templateKey?: string, callback?: (prev: Record<string, any>) => ILayoutElementListValueProps) => void;
    currentBridgeKey?: IContentBridgeKeyProps;
    focusParent?: boolean;
}

// //레이아웃 요소 매핑 타입
// type IMappingProps = Record<any, React.FC<IPartComponentsProps>>;
// //공통 레이아웃 요소 매핑 타입
// type ICommonMappingProps = Record<any, React.FC<ICommonPartComponentsProps>>;

interface IPartMappingProps {
    componentType: 'header' | 'footer' | 'layout';
    itemIndex?: number;
}

const PartMapping: React.FC<IPartMappingProps> = (props) => 
{
    const {
        componentType,
        itemIndex = 0,
    } = props;
    //context
    const {
        focusIndex,
        currentLayoutData,
    } = useDYLayoutContext();

    if(componentType === 'layout') //배열 형태의 partMapping일 경우
    {

        //current setState
        const currentLayoutUpdate = (result: ILayoutCoreDataObjectProps) => 
        {
            currentLayoutData.setState(result);
        };
    
        //연동형 컴포넌트용 데이터 업데이트 이벤트
        const bindComponentLayoutUpdate = (templateKey?: string) => 
        {
            if(templateKey)
            {
                const callback = (prev: ILayoutCoreDataObjectProps) => 
                {
                    const convres = currentLayoutData.state?.contents?.reduce((a,c) => 
                    {
                        const json = {
                            options: currentLayoutData.state?.itemOptions,
                            value: c,
                        };
                        a.push(json);

                        return a;
                    }, [] as ILayoutElementListValueProps[]);
                    return {...prev, contents: convres};
                };

                currentLayoutUpdate(callback(currentLayoutData.state));
            }
        };
        
        return (
            <ExportFile
                focusParent
                focusIndex={focusIndex}
                currentLayoutData={{
                    state: currentLayoutData.state,
                    setState: (callback: any) => 
                    {
                        if(typeof callback === 'function')
                        {
                            currentLayoutUpdate(callback(currentLayoutData.state, itemIndex));
                        }
                    },
                }}
                bindComponentLayoutUpdate={bindComponentLayoutUpdate}
                currentBridgeKey={currentLayoutData.state?.contentBridgeKey}
            />
        );
    }
    else //단일 형태의 partMapping 일 경우 * index 값이 없다는건 배열형태가 아니다라고 판단
    {
        // const currentCommonLayout = (() => 
        // {
            
        //     const state = (() => 
        //     {
        //         if(componentType === 'header')
        //         {
        //             return headerData.state;
        //         }
        //         else if(componentType === 'footer')
        //         {
        //             return footerData.state;
        //         }
        //     })();

        //     if(state)
        //     {
        //         //전역 설정 값이 존재할 경우
        //         if(state.values.hasOwnProperty(layoutId))
        //         {
        //             return state.values?.[layoutId];
        //         }
        //         else if(state.defaultKeyName && state.values.hasOwnProperty(state.defaultKeyName))
        //         {
        //             return state.values?.[state.defaultKeyName];
        //         }
        //     }
        // })();
        // //components
        // const Component = componentMapping[type];

        // //current setState
        // const currentLayoutUpdate = (result: ILayoutCoreDataObjectProps) => 
        // {
        //     if(componentType === 'header')
        //     {
        //         headerData.setState(prev => 
        //         {
        //             if(prev.values.hasOwnProperty(layoutId))
        //             {
        //                 const newprev = {...prev, values: {
        //                     ...prev.values,
        //                     [layoutId]: {
        //                         ...prev.values[layoutId],
        //                         ...result,
        //                     },
        //                 }};
        //                 return newprev;
        //             }
        //             return prev;
        //         });
        //     }
        //     else if(componentType === 'footer')
        //     {
        //         footerData.setState(prev => 
        //         {
        //             if(prev.values.hasOwnProperty(layoutId))
        //             {
        //                 const newprev = {...prev, values: {
        //                     ...prev.values,
        //                     [layoutId]: {
        //                         ...prev.values[layoutId],
        //                         ...result,
        //                     },
        //                 }};
        //                 return newprev;
        //             }
        //             return prev;
        //         });
        //     }
        // };

        // //연동형 컴포넌트용 데이터 업데이트 이벤트
        // const bindComponentLayoutUpdate = (templateKey?: string, callbackUpdate?: (prev: Record<string, any>) => ILayoutElementListValueProps) => 
        // {
        //     if(templateKey)
        //     {
        //         axiosGuard.get(`/collection/${templateKey}/list?limit=999`)
        //             .then((res) => 
        //             {
        //                 axiosResponseProcessor<ITableBaseDataProps<Record<string, any>[]>>(res, {
        //                     successCallback(result) 
        //                     {
        //                         const callback = (prev: ILayoutCoreDataObjectProps) => 
        //                         {
        //                             if(typeof focusIndex.state.element === 'number')
        //                             {
        //                                 const idx = focusIndex.state.element;
        //                                 const convres = result.data?.reduce((a,c) => 
        //                                 {
        //                                     const json = {
        //                                         optons: currentCommonLayout?.itemOptions,
        //                                         value: c,
        //                                     };
        //                                     a.push(json);
    
        //                                     return a;
        //                                 }, [] as ILayoutElementListValueProps[]);
                                        
        //                                 if(typeof callbackUpdate === 'function')
        //                                 {
        //                                     const conv = {...result.data[idx], ...callbackUpdate(result.data[0])};
        //                                     convres[idx].value = conv;
        //                                     return {...prev, contents: [...convres]};
        //                                 }
        //                                 else
        //                                 {
        //                                     return {...prev, contents: convres};
        //                                 }
        //                             }
        //                             else
        //                             {
        //                                 return prev;
        //                             }
        //                         };

        //                         if(componentType === 'header')
        //                         {
        //                             currentLayoutUpdate(callback(headerData.state.values?.[layoutId]));
        //                         }
        //                         else if(componentType === 'footer')
        //                         {
        //                             currentLayoutUpdate(callback(footerData.state.values?.[layoutId]));
        //                         }
        //                     },
        //                 });
        //             })
        //             .catch((error) => 
        //             {
        //                 console.error(error);
        //                 const callback = (prev: ILayoutCoreDataObjectProps) => 
        //                 {
        //                     return {...prev, contents: undefined};
        //                 };
        //                 if(componentType === 'header')
        //                 {
        //                     currentLayoutUpdate(callback(headerData.state.values?.[layoutId]));
        //                 }
        //                 else if(componentType === 'footer')
        //                 {
        //                     currentLayoutUpdate(callback(footerData.state.values?.[layoutId]));
        //                 }
        //             });
        //     }
        // };

        // //delete Event
        // const deleteEvent = (prev: ILayoutCommonElementDataProps) => 
        // {
        //     if(prev.values.hasOwnProperty(layoutId))
        //     {
        //         const newValues = { ...prev.values };
        //         delete newValues[layoutId];
        //         return { ...prev, values: newValues };
        //     }
        //     else if(prev.defaultKeyName && prev.values.hasOwnProperty(prev.defaultKeyName))
        //     {
        //         const newValues = { ...prev.values };
        //         delete newValues[prev.defaultKeyName];
        //         return { ...prev, values: newValues };
        //     }

        //     return prev;
        // };

        // if(!Component)
        // {
        //     return (
        //         <ErrorComponent>
        //             <MappingIcon
        //                 icon='ErrorIcon'
        //                 sx={{
        //                     mr: 2,
        //                     color: 'error.main',
        //                     width: '30px',
        //                     fontSize: '30px',
        //                 }}
        //             />
        //             <Box>
        //                 <Typography>
        //                     전역 컴포넌트 에러가 발생하였습니다.
        //                 </Typography>
        //                 <Typography
        //                     variant='caption'
        //                 >
        //                     Common Error Type - {type}
        //                 </Typography>
        //             </Box>
        //         </ErrorComponent>
        //     );
        // }
        return (
            <div>
                123
            </div>
            // <Area
            //     onClick={() => 
            //     {
            //         focusIndex.setState(prev => 
            //         {
            //             return {
            //                 ...prev,
            //                 type: componentType,
            //                 element: 0,
            //                 item: prev.type !== componentType ? null : prev.item,
            //             };
            //         });
            //     }}
            //     sx={{
            //         borderColor: `${
            //             focusIndex.state.type === componentType ?
            //                 'primary.main'
            //                 :
            //                 'borderColor.main'
            //         }`,
            //     }}
            // >
            //     <ElementsController
            //         dragHandleProps={dragHandleProps}
            //         callbackDelete={() => 
            //         {
            //             if(componentType === 'header')
            //             {
            //                 headerData.setState(prev => 
            //                 {
            //                     return deleteEvent(prev);
            //                 });
            //                 focusIndex.setState({type: null, element: null, item: null, itemBridgeKey: null});
            //             }
            //             else if(componentType === 'footer')
            //             {
            //                 footerData.setState(prev => 
            //                 {
            //                     return deleteEvent(prev);
            //                 });
            //                 focusIndex.setState({type: null, element: null, item: null, itemBridgeKey: null});
            //             }
            //         }}
            //         // callbackInfo={() => 
            //         // {
            //         //     alert(componentType + ' 템플릿 정보 개발 중');
            //         // }}
            //     />
            //     {
            //         Component ?
            //             <>
            //                 {
            //                     currentCommonLayout &&
            //                         <Component
            //                             {...restProps}
            //                             focusParent={focusIndex.state.type === componentType}
            //                             focusIndex={focusIndex}
            //                             bindComponentLayoutUpdate={bindComponentLayoutUpdate}
            //                             currentBridgeKey={currentCommonLayout?.contentBridgeKey}
            //                             currentLayoutData={{
            //                                 state: currentCommonLayout,
            //                                 setState: (callback: any) => 
            //                                 {
            //                                     if(typeof callback === 'function')
            //                                     {
            //                                         if(componentType === 'header')
            //                                         {
            //                                             console.log('헤더를 수정했습니다');
            //                                         // currentLayoutUpdate(callback(layoutData.state[itemIndex], itemIndex));
            //                                         }
            //                                         else if(componentType === 'footer')
            //                                         {
            //                                             console.log('푸터를 수정했습니다');
            //                                         // currentLayoutUpdate(callback(layoutData.state[itemIndex], itemIndex));
            //                                         }
            //                                     }
            //                                 },
            //                             }}
            //                         />
            //                 }
            //             </>
            //             :
            //             <ErrorComponent>
            //                 <MappingIcon
            //                     icon='ErrorIcon'
            //                     sx={{
            //                         mr: 2,
            //                         color: 'error.main',
            //                         width: '30px',
            //                         fontSize: '30px',
            //                     }}
            //                 />
            //                 <Box>
            //                     <Typography>
            //                         컴포넌트 에러가 발생하였습니다.
            //                     </Typography>
            //                     <Typography
            //                         variant='caption'
            //                     >
            //                         ErrorType - {type}
            //                     </Typography>
            //                 </Box>
            //             </ErrorComponent>
            //     }
            // </Area>
        );
    }
};

const Area = styled(Box)`
    position: relative;
    min-height: 40px;
    border: 1px solid;
    background-color : ${({theme}) => 
    {
        return theme.palette.backgroundTheme.origin;
    }};
    overflow: hidden;
    transition-duration: 0.3s;
    transition-property: border-color;
    cursor: pointer;
    box-sizing: border-box;
`;

export default PartMapping;