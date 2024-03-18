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
    //bridge options

    const bridgeArr = convertToArr(currentLayoutData.state?.contentBridgeKey);

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

                                                currentLayoutData.setState(prev => 
                                                {
                                                    const newprev = {...prev};

                                                    const ork = newprev.contentBridgeKey?.[d.originkey];

                                                    if(ork)
                                                    {
                                                        ork.value = v;
                                                    }

                                                    return newprev;
                                                });
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