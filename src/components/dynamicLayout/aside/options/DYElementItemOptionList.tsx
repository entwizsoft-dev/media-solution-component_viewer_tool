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

const DYElementItemOptionList: React.FC = () => 
{
    //context
    const {
        focusIndex,
        currentLayoutData,
    } = useDYLayoutContext();
    //index
    const {
        // type: focusType,
        element: elementIdx,
        item: itemIdx,
        // itemBridgeKey: itemBridgeKeyIdx,
    } = focusIndex.state;

    // //options
    const elementItemOptionArray = itemIdx !== null ? currentLayoutData.state?.contents?.[itemIdx]?.options : undefined;

    //현재 선택된 레이아웃 아이템 업데이트
    const currentItemUpdate: ILayoutOptionCallbackProps = (result) => 
    {
        if(typeof itemIdx === 'number')
        {
            currentLayoutData.setState(prev => 
            {
                const newprev = {...prev};
                let currentData = newprev.contents;
                if (
                    Array.isArray(currentData) &&
                    currentData.length > 0
                ) 
                {
                    const resData = currentData.map((dd, ii) => 
                    {
                        if(ii === itemIdx)
                        {
                            return {...dd, options: result};
                        }

                        return dd;
                    });

                    currentData = resData;
                }

                return newprev;
            });
        }
    };

    return (
        <Area>
            {
                (
                    Array.isArray(elementItemOptionArray) &&
                        elementItemOptionArray.length > 0 &&
                        typeof elementIdx === 'number' &&
                        typeof itemIdx === 'number'
                ) ?
                    <List>
                        {
                            elementItemOptionArray.map((d,i) => 
                            {
                                return (
                                    <PartMapping
                                        key={i}
                                        data={d}
                                        currentLayout={{
                                            setState: (callback) => 
                                            {
                                                const currentData = currentLayoutData.state.contents;
                                                if(
                                                    typeof callback === 'function' &&
                                                        Array.isArray(currentData) &&
                                                        currentData.length > 0
                                                )
                                                {
                                                    const currentDataOption = currentData[itemIdx].options;
                                                    if(currentDataOption)
                                                    {
                                                        currentItemUpdate(callback(currentDataOption, i));
                                                    }
                                                }
                                            },
                                        }}
                                    />
                                );
                            })
                        }
                    </List>
                    :
                    <Empty>
                        Item Options Empty
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

export default DYElementItemOptionList;