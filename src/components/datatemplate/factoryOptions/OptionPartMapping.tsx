import React from 'react';
//type
import {
    IStateProrps,
} from '@/components/transferList/interface/context.interface';
import {
    IElementListOptionComponentsProps,
    IElementListOptionProps,
    IElementListOptionDataProps,
    ITemplateDataProps,
} from '@/components/datatemplate/interface/element.interface';
//components
import {
    Stack,
    ListItem,
} from '@mui/material';
import {
    Text,
    Number,
    Radio,
    DatePicker,
    RangeSlider,
    SelectBox,
    Selection,
    Switch,
    TemplateSelectBox,
} from './part';

interface IPartMappingProps {
    data: IElementListOptionDataProps<any>;
    common?: boolean;
    parentIndex: number;
    siblingIndex?: number;
    template: IStateProrps<ITemplateDataProps[]>;
}

//파트에서 쓰이는 고정 props
export interface IPartOptionComponentsProps<T> extends IPartMappingProps {
    data: IElementListOptionProps<T>;
    childIndex?: number;
}

// //매핑 타입
type IMappingProps = Record<IElementListOptionComponentsProps, React.FC<IPartOptionComponentsProps<any>>>;

//mapping render func
const componentMapping: Partial<IMappingProps> = {
    text: Text,
    datepicker : DatePicker,
    number : Number,
    radio : Radio,
    rangeslider : RangeSlider,
    selectbox : SelectBox,
    selection : Selection,
    switch : Switch,
    templateselectbox : TemplateSelectBox,
};
const OptionPartMapping: React.FC<IPartMappingProps> = (props) => 
{
    const {
        data,
        ...restProps
    } = props;
    
    //배열 구조일 경우 row slice
    if(Array.isArray(data))
    {
        return (
            <Stack
                direction={'row'}
            >
                {
                    data.map((d,i) => 
                    {
                        const ArrComponent = componentMapping[d.components];

                        if(ArrComponent)
                        {
                            return (
                                <ListItem
                                    key={i}
                                >
                                    <ArrComponent
                                        data={d}
                                        childIndex={i}
                                        {...restProps}
                                    />
                                </ListItem>
                            );
                        }
                    })
                }
            </Stack>
        );
    }

    const Component = componentMapping[data.components];

    return (
        <>
            {
                Component &&
                    <ListItem>
                        <Component
                            data={data}
                            {...restProps}
                        />
                    </ListItem>
            }
        </>
    );
};

export default OptionPartMapping;