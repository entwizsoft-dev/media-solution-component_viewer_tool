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
        focusIndex,
        currentLayoutData,
    } = useDYLayoutContext();
    //index
    const elementIdx = focusIndex.state.element;
    const cuurentOption = currentLayoutData.state?.options;

    // option update
    const currentItemUpdate: ILayoutOptionCallbackProps = (result) => 
    {
        currentLayoutData.setState(prev => 
        {
            const newprev = {...prev};
            newprev.options = result;

            return newprev;
        });
    };

    return (
        <Area>
            {
                (
                    Array.isArray(cuurentOption) &&
                    cuurentOption.length > 0 &&
                    typeof elementIdx === 'number'
                ) ?
                    <List>
                        {
                            cuurentOption.map((d,i) => 
                            {
                                return (
                                    <PartMapping
                                        key={i}
                                        data={d}
                                        currentLayout={{
                                            state: cuurentOption,
                                            setState: (callback) => 
                                            {
                                                if(typeof callback === 'function')
                                                {
                                                    if(cuurentOption)
                                                    {
                                                        currentItemUpdate(callback(cuurentOption, i));
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