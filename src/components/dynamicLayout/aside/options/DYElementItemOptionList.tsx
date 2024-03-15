import React from 'react';
import { styled } from '@mui/material/styles';
//type
import {
    ILayoutElementOptionProps,
} from '../../interface/element.interface';
import {
    IStateProrps,
} from '@/components/transferList/interface/context.interface';
import {
    ILayoutOptionCallbackProps,
} from '../../factoryOptions/PartMapping';
import {
    ILayoutCommonElementDataProps,
} from '../../interface/commonElement.interface';
//context
import { useDYLayoutContext } from '../../DYLayoutContext';
//components
import {
    Box,
    List,
} from '@mui/material';
import PartMapping from '../../factoryOptions/PartMapping';

const DYElementItemOptionList: React.FC = () => 
{
    //context
    const {
        focusIndex,
        layoutId,
        layoutData,
        footerData,
        headerData,
    } = useDYLayoutContext();
    //index
    const {
        type: focusType,
        element: elementIdx,
        item: itemIdx,
        itemBridgeKey: itemBridgeKeyIdx,
    } = focusIndex.state;

    if(focusType === 'layout')
    {
        // //options
        // const elementItemOptionArray = (elementIdx !== null && itemIdx !== null) ? layoutData.state[elementIdx]?.contents?.[itemIdx]?.options : undefined;

        // //현재 선택된 레이아웃 아이템 업데이트
        // const currentItemUpdate: ILayoutOptionCallbackProps = (result) => 
        // {
        //     if(
        //         typeof elementIdx === 'number' &&
        //     typeof itemIdx === 'number'
        //     )
        //     {
        //         layoutData.setState(prev => 
        //         {
        //             const newarr = prev.map((d,i) => 
        //             {
                            
        //                 if(i === elementIdx)
        //                 {
        //                     const currentData = d.contents;
        //                     if (
        //                         Array.isArray(currentData) &&
        //                     currentData.length > 0
        //                     ) 
        //                     {
        //                         const resData = currentData.map((dd, ii) => 
        //                         {
        //                             if(ii === itemIdx)
        //                             {
        //                                 return {...dd, options: result};
        //                             }

        //                             return dd;
        //                         });

        //                         return {...d, contents: resData};
        //                     }
        //                 }

        //                 return d;
        //             });
            
        //             return newarr;
        //         });
        //     }
        // };

        return (
            <Area>
                {
                    // (
                    //     Array.isArray(elementItemOptionArray) &&
                    //     elementItemOptionArray.length > 0 &&
                    //     typeof elementIdx === 'number' &&
                    //     typeof itemIdx === 'number'
                    // ) ?
                    //     <List>
                    //         {
                    //             elementItemOptionArray.map((d,i) => 
                    //             {
                    //                 return (
                    //                     <PartMapping
                    //                         key={i}
                    //                         data={d}
                    //                         currentLayout={{
                    //                             setState: (callback) => 
                    //                             {
                    //                                 const currentData = layoutData.state[elementIdx].contents;
                    //                                 if(
                    //                                     typeof callback === 'function' &&
                    //                                     Array.isArray(currentData) &&
                    //                                     currentData.length > 0
                    //                                 )
                    //                                 {
                    //                                     const currentDataOption = currentData[itemIdx].options;
                    //                                     if(currentDataOption)
                    //                                     {
                    //                                         currentItemUpdate(callback(currentDataOption, i));
                    //                                     }
                    //                                 }
                    //                             },
                    //                         }}
                    //                     />
                    //                 );
                    //             })
                    //         }
                    //     </List>
                    //     :
                    <Empty>
                        Item Options Empty
                    </Empty>
                }
            </Area>
        );
    }
    else
    {
        // //현재 포커스된 옵션값
        // const getCurrentOptions = (datas: ILayoutCommonElementDataProps) => 
        // {
        //     let co;
        //     if(datas)
        //     {
        //         if (layoutId !== null && elementIdx !== null)
        //         {
        //             if (itemBridgeKeyIdx !== null)
        //             {
        //                 if (itemIdx !== null)
        //                 {
        //                     co = datas.values?.[layoutId]?.contents?.[elementIdx]?.value?.[itemBridgeKeyIdx]?.[itemIdx]?.options;
        //                 }
        //             }
        //             else
        //             {
        //                 co = datas.values?.[layoutId]?.contents?.[elementIdx]?.options;
        //             }
        //         }
        //     }
        //     return co;
        // };
        // //state
        // const currentOptions = getCurrentOptions(focusType === 'header' ? headerData.state : footerData.state);

        // //
        // const currentItemUpdate = (datas: IStateProrps<ILayoutCommonElementDataProps>, result: ILayoutElementOptionProps[]) => 
        // {
        //     if(
        //         layoutId &&
        //         typeof elementIdx === 'number' &&
        //         typeof itemIdx === 'number' &&
        //         itemBridgeKeyIdx 
        //     )
        //     {
        //         datas.setState(prev => 
        //         {
        //             const newState = { ...prev };

        //             if (newState.values && newState.values[layoutId]) 
        //             {
        //                 const layout = newState.values[layoutId];
        //                 const contentsCopy = layout.contents ? [...layout.contents] : [];

        //                 if (contentsCopy[elementIdx]) 
        //                 {
        //                     const elementCopy = { ...contentsCopy[elementIdx] };
        //                     elementCopy.value = elementCopy.value || {};
        //                     elementCopy.value[itemBridgeKeyIdx] = elementCopy.value[itemBridgeKeyIdx] ? [...elementCopy.value[itemBridgeKeyIdx]] : [];
        //                     if (elementCopy.value[itemBridgeKeyIdx][itemIdx]) 
        //                     {
        //                         elementCopy.value[itemBridgeKeyIdx][itemIdx] = elementCopy.value[itemBridgeKeyIdx][itemIdx] || {};
        //                         elementCopy.value[itemBridgeKeyIdx][itemIdx].options = elementCopy.value[itemBridgeKeyIdx][itemIdx].options || {};
        //                         elementCopy.value[itemBridgeKeyIdx][itemIdx].options = result;
        //                     }

        //                     contentsCopy[elementIdx] = elementCopy;
        //                 }

        //                 newState.values[layoutId] = { ...layout, contents: contentsCopy };
        //             }

        //             return newState;
        //         });
        //     }
        // };

        return (
            <Area>
                {
                    // (
                    //     Array.isArray(currentOptions) &&
                    //     currentOptions.length > 0
                    // ) ?
                    //     <List>
                    //         {
                    //             currentOptions.map((d,i) => 
                    //             {
                    //                 return (
                    //                     <PartMapping
                    //                         key={i}
                    //                         data={d}
                    //                         currentLayout={{
                    //                             setState: (callback) => 
                    //                             {
                    //                                 if(focusType === 'header')
                    //                                 {
                    //                                     currentItemUpdate(headerData, callback(currentOptions, i));
                    //                                 }
                    //                                 else if(focusType === 'footer')
                    //                                 {
                    //                                     currentItemUpdate(footerData, callback(currentOptions, i));
                    //                                 }
                    //                             },
                    //                         }}
                    //                     />
                    //                 );
                    //             })
                    //         }
                    //     </List>
                    //     :
                    <Empty>
                        Item Options Empty
                    </Empty>
                }
            </Area>
        );
    }
};

const Area = styled(Box)`
    position: relative;
    height: 100%;
    box-sizing: border-box;
`;

const Empty = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
    font-family: 'SF-Pro-Display';
    font-size: 0.875rem;
    color: ${({theme}) => 
    {
        return theme.palette.typoColor.light;
    }};
`;

export default DYElementItemOptionList;