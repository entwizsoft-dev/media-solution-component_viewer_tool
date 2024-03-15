import React from 'react';
import { styled } from '@mui/material/styles';
//json
import commonOption from '@/components/datatemplate/json/commonOption';
//context
import { useDTLayoutContext } from '../../DTLayoutContext';
//components
import {
    Box,
    List,
} from '@mui/material';
import DTOptionListTab from './DTOptionListTab';
import DTElementList from '../elements/DTElementList';
import OptionPartMapping from '@/components/datatemplate/factoryOptions/OptionPartMapping';

const DTOptionList = () => 
{
    //context
    const {
        template,
        focusItem,
    } = useDTLayoutContext();
    //current data
    const currentIndex = focusItem.state?.index;
    const currentTemplateData = (typeof currentIndex === 'number') ? template.state[currentIndex] : null;
    
    return (
        <React.Fragment>
            {
                typeof currentIndex === 'number' &&
                    <OptionListArea
                        key={currentIndex}
                    >
                        <List>
                            <DTOptionListTab
                                title='요소 설정'
                                defaultOpen={true}
                            >
                                <DTElementList/>
                            </DTOptionListTab>
                            <DTOptionListTab
                                title='공통 속성'
                                defaultOpen={true}
                            >
                                {
                                    commonOption.map((d,i) => 
                                    {
                                        return (
                                            <OptionPartMapping
                                                key={i}
                                                data={d}
                                                common
                                                parentIndex={currentIndex}
                                                template={template}
                                            />
                                        );
                                    })
                                }
                            </DTOptionListTab>
                            <DTOptionListTab
                                title='고유 옵션'
                                defaultOpen={true}
                            >
                                {
                                    (currentTemplateData && Array.isArray(currentTemplateData.option)) &&
                                    currentTemplateData.option.map((d,i) => 
                                    {
                                        return (
                                            <OptionPartMapping
                                                key={i}
                                                data={d}
                                                parentIndex={currentIndex}
                                                siblingIndex={i}
                                                template={template}
                                            />
                                        );
                                    })
                                }
                            </DTOptionListTab>
                        </List>
                    </OptionListArea>
            }
        </React.Fragment>
    );
};

const OptionListArea = styled(Box)`
    position: relative;
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 0.75rem;
    }
    &::-webkit-scrollbar-track {
        background-color: ${({theme}) => 
    {
        return theme.palette.dividerTheme.main;
    }};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
        border: 2px solid ${({theme}) => 
    {
        return theme.palette.borderColor.main;
    }};
        border-radius: 0.75rem;;
    }
    &::-webkit-scrollbar-button {
        display:none;
    }
`;

export default DTOptionList;