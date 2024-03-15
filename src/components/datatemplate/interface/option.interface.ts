import { ITotalElementProps } from './element.interface';

export interface ICommonElementOptionProps {
    key: string;
    label?: string;
}
//option list type
export interface IElementOptionObjectProps {
    components: string;
    label: string;
    matchkey: string;
}

//공통 타입
export type IElementOptionObjectCommonListProps = IElementOptionObjectProps[];

//유니크 타입
export type IElementOptionObjectUniqueListProps = {
    [key in ITotalElementProps]?: IElementOptionObjectProps[];
};

//element option type
export interface IElementOptionProps {
    type: 'common' | 'uncommon';
    label: string;
    options: any[];
}