import React from 'react';
import { styled } from '@mui/material/styles';
//type
import {
    ILayoutOptionCallbackProps,
} from '../../factoryOptions/PartMapping';
//context
import { useDYLayoutContext } from '../../DYLayoutContext';
//components
import {
    Box,
    List,
} from '@mui/material';
import PartMapping from '../../factoryOptions/PartMapping';

const DYElementOptionList: React.FC = () => 
{
    //context
    const {
        layoutData,
        headerData,
        footerData,
        focusIndex,
    } = useDYLayoutContext();
    //index
    const elementIdx = focusIndex.state.element;
    const elementType = focusIndex.state.type;
    //options
    const elementsOptionArray = (() => 
    {
        let result;
        if(elementType === 'layout')
        {
            if(elementIdx !== null)
            {
                result = layoutData.state[elementIdx]?.options;
            }
        }
        else if(elementType === 'header')
        {
            if(headerData.state.values.hasOwnProperty(layoutId))
            {
                result = headerData.state.values?.[layoutId]?.options;
            }
            else if(headerData.state.defaultKeyName && headerData.state.values.hasOwnProperty(headerData.state.defaultKeyName))
            {
                result = headerData.state.values?.[headerData.state.defaultKeyName]?.options;
            }
        }
        else if(elementType === 'footer')
        {
            if(footerData.state.values.hasOwnProperty(layoutId))
            {
                result = footerData.state.values?.[layoutId]?.options;
            }
            else if(footerData.state.defaultKeyName && footerData.state.values.hasOwnProperty(footerData.state.defaultKeyName))
            {
                result = footerData.state.values?.[footerData.state.defaultKeyName]?.options;
            }
        }

        return result;
    })();

    //option update
    const currentItemUpdate: ILayoutOptionCallbackProps = (result) => 
    {
        if(elementType === 'header')
        {
            headerData.setState(prev => 
            {
                const newprev = {...prev};
                if(newprev.values.hasOwnProperty(layoutId))
                {
                    newprev.values[layoutId].options = result;
                }
                else if(newprev.defaultKeyName && newprev.values.hasOwnProperty(newprev.defaultKeyName))
                {
                    newprev.values[newprev.defaultKeyName].options = result;
                }
                return newprev;
            });
        }
        else if(elementType === 'footer')
        {
            footerData.setState(prev => 
            {
                const newprev = {...prev};
                if(newprev.values.hasOwnProperty(layoutId))
                {
                    newprev.values[layoutId].options = result;
                }
                else if(newprev.defaultKeyName && newprev.values.hasOwnProperty(newprev.defaultKeyName))
                {
                    newprev.values[newprev.defaultKeyName].options = result;
                }
                return newprev;
            });
        }
        else if(elementType === 'layout')
        {
            if (typeof elementIdx === 'number') 
            {
                layoutData.setState(prev => 
                {
                    const newarr = [...prev];
        
                    if (newarr[elementIdx] && newarr[elementIdx].options) 
                    {
                        newarr[elementIdx] = {
                            ...newarr[elementIdx],
                            options: result,
                        };
                    }
    
                    return newarr;
                });
            }
        }
    };

    return (
        <Area>
            {
                // (
                //     Array.isArray(elementsOptionArray) &&
                //     elementsOptionArray.length > 0 &&
                //     typeof elementIdx === 'number'
                // ) ?
                //     <List>
                //         {
                //             elementsOptionArray.map((d,i) => 
                //             {
                //                 return (
                //                     <PartMapping
                //                         key={i}
                //                         data={d}
                //                         currentLayout={{
                //                             state: elementsOptionArray,
                //                             setState: (callback) => 
                //                             {
                //                                 if(typeof callback === 'function')
                //                                 {
                //                                     if(elementsOptionArray)
                //                                     {
                //                                         currentItemUpdate(callback(elementsOptionArray, i));
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
                    Options Empty
                </Empty>
            }
        </Area>
    );
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

export default DYElementOptionList;