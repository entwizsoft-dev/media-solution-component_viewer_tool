import React from 'react';
import { styled } from '@mui/material/styles';
//type
import {
    IContentBridgeKeyProps,
} from '../../interface/element.interface';
//context
import { useDYLayoutContext } from '../../DYLayoutContext';
//components
import {
    Box,
    List,
    ListItem,
    TextField,
} from '@mui/material';

const convertToArr = (contentBridgeObj?: IContentBridgeKeyProps) =>
{
    // 객체의 키-값 쌍을 배열로 변환
    let result;
    if(contentBridgeObj)
    {
        const arr = Object.keys(contentBridgeObj) as string[];
        result = arr.map(key => 
        {
            return {
                originkey: key,
                label: contentBridgeObj[key]?.label,
                value: contentBridgeObj[key]?.value,
            };
        });
    }

    return result;
};

const DYElementBridgeList: React.FC = () => 
{
    //context
    const {
        focusIndex,
        currentLayoutData,
    } = useDYLayoutContext();
    //index
    const elementIdx = focusIndex.state.element;
    const elementType = focusIndex.state.type;
    //bridge options

    const bridge = (() => 
    {
        let result;
        if(elementType === 'layout')
        {
            if(elementIdx !== null)
            {
                result = layoutData.state[elementIdx]?.contentBridgeKey;
            }
        }
        else if(elementType === 'header')
        {
            if(headerData.state.values.hasOwnProperty(layoutId))
            {
                result = headerData.state.values?.[layoutId]?.contentBridgeKey;
            }
            else if(headerData.state.defaultKeyName && headerData.state.values.hasOwnProperty(headerData.state.defaultKeyName))
            {
                result = headerData.state.values?.[headerData.state.defaultKeyName]?.contentBridgeKey;
            }
        }
        else if(elementType === 'footer')
        {
            if(footerData.state.values.hasOwnProperty(layoutId))
            {
                result = footerData.state.values?.[layoutId]?.contentBridgeKey;
            }
            else if(footerData.state.defaultKeyName && footerData.state.values.hasOwnProperty(footerData.state.defaultKeyName))
            {
                result = footerData.state.values?.[footerData.state.defaultKeyName]?.contentBridgeKey;
            }
        }

        return result;
    })();

    const bridgeArr = convertToArr(bridge);

    return (
        <Area>
            {
                (
                    Array.isArray(bridgeArr) &&
                    bridgeArr.length > 0 && 
                    typeof elementIdx === 'number'
                ) ?
                    <List>
                        {
                            bridgeArr.map((d,i) => 
                            {
                                return (
                                    
                                    <ListItem
                                        key={i}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label={d.label}
                                            value={d.value || ''}
                                            onChange={(e) => 
                                            {
                                                const v = e.currentTarget.value;

                                                if(elementType === 'header')
                                                {
                                                    headerData.setState(prev => 
                                                    {
                                                        const newprev = {...prev};

                                                        let ork;

                                                        if(newprev.values.hasOwnProperty(layoutId))
                                                        {
                                                            ork = newprev.values[layoutId].contentBridgeKey?.[d.originkey];
                                                        }
                                                        else if(newprev.defaultKeyName && newprev.values.hasOwnProperty(newprev.defaultKeyName))
                                                        {
                                                            ork = newprev.values[newprev.defaultKeyName].contentBridgeKey?.[d.originkey];
                                                        }

                                                        if(ork)
                                                        {
                                                            ork.value = v;
                                                        }
                                                        return newprev;
                                                    });
                                                }
                                                else if(elementType === 'footer')
                                                {
                                                    footerData.setState(prev => 
                                                    {
                                                        const newprev = {...prev};
    
                                                        let ork;

                                                        if(newprev.values.hasOwnProperty(layoutId))
                                                        {
                                                            ork = newprev.values[layoutId].contentBridgeKey?.[d.originkey];
                                                        }
                                                        else if(newprev.defaultKeyName && newprev.values.hasOwnProperty(newprev.defaultKeyName))
                                                        {
                                                            ork = newprev.values[newprev.defaultKeyName].contentBridgeKey?.[d.originkey];
                                                        }

                                                        if(ork)
                                                        {
                                                            ork.value = v;
                                                        }
                                                        return newprev;
                                                    });
                                                }
                                                else if(elementType === 'layout')
                                                {
                                                    layoutData.setState(prev => 
                                                    {
                                                        const res = prev.map((ld,li) => 
                                                        {
                                                            if(li === elementIdx)
                                                            {
                                                                const ork = ld.contentBridgeKey?.[d.originkey];
                                                                if(ork)
                                                                {
                                                                    ork.value = v;
                                                                }
                                                            }
                                                            return ld;
                                                        });
                                                        return res;
                                                    });
                                                }
                                            }}
                                        />
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                    :
                    <Empty>
                        Bridge Key Empty
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

export default DYElementBridgeList;