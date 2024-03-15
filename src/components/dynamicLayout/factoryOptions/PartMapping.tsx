import React from 'react';
//type
import {
    ILayoutElementOptionProps,
} from '../interface/element.interface';
import {
    ILayoutElementOptionComponentsProps,
} from '../interface/option.interface';
//components
import {
    ListItem,
} from '@mui/material';
import {
    Text,
    Number,
    Switch,
    Radio,
    SelectDataTemplate,
    SelectLayoutTemplate,
    DataTemplateFilter,
} from './part';

//
export interface IOptionPartComponentsStateProps<T> {
    state?: T[];
    setState: (callback: (prev: T[], index: number) => ILayoutElementOptionProps[]) => void;
}

export type ILayoutOptionCallbackProps<U = string> = (result: ILayoutElementOptionProps<any, U>[]) => void;


//PartMapping React.FC Type
export interface ILayoutOptionPartMappingProps<T> {
    data: T;
    currentLayout: IOptionPartComponentsStateProps<T>;
}

//파트에서 쓰이는 컴포넌트 props
export interface ILayoutOptionPartOptionComponentsProps<T = any> extends ILayoutOptionPartMappingProps<T> {};

//각 아이템에서 쓰이는 매핑 타입
export interface IMappingValueProps<T = any> extends ILayoutOptionPartOptionComponentsProps<ILayoutElementOptionProps<T>> {};

//매핑 객체 타입
type IMappingProps = Record<ILayoutElementOptionComponentsProps, React.FC<IMappingValueProps>>;


const PartMapping = <T extends ILayoutElementOptionProps>(props: ILayoutOptionPartMappingProps<T>) => 
{
    const {
        data,
        currentLayout,
        ...restProps
    } = props;
    //mapping render func
    const componentMapping: Partial<IMappingProps> = {
        text: Text,
        number: Number,
        switch: Switch,
        radio: Radio,
        selectDataTemplate: SelectDataTemplate,
        selectLayoutTemplate: SelectLayoutTemplate,
        dataTemplateFilter: DataTemplateFilter,
    };

    const Component = data.component ? componentMapping[data.component] : null;

    return (
        <>
            {
                (!data?.hide && Component) &&
                    <ListItem>
                        <Component
                            data={data}
                            currentLayout={currentLayout}
                            {...restProps}
                        />
                    </ListItem>
            }
        </>
    );
};

export default PartMapping;