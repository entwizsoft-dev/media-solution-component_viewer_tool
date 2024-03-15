//type
import {
    ILayoutElementOptionComponentsProps,
    ILayoutElementOptionDependencyProps,
} from './option.interface';

/***********************************************
 * Layout Data type 모음             *
 ***********************************************/

//layout element list option 타입
export interface ILayoutElementOptionProps<T= any, K = string> {
    component?: ILayoutElementOptionComponentsProps;
    key?: K;
    label?: string;
    hide?: boolean;
    dependencies?: ILayoutElementOptionDependencyProps[];
    value?: T;
}

export interface ILayoutElementListCoreOptionProps<T = any, K = string> {
    options?: ILayoutElementOptionProps<T, K>[];
}

export interface ILayoutElementListValueProps extends ILayoutElementListCoreOptionProps {
    value?: Record<string, any>;
}

//브릿지 키 구조 타입
export type IContentBridgeKeyProps = Partial<Record<string, {label: string, value: string}>>;

//통합 layout element list 핵심
export interface ILayoutElementListCoreProps extends ILayoutElementListCoreOptionProps {
    type: string;
    contents?: ILayoutElementListValueProps[];
    contentBridgeKey?: IContentBridgeKeyProps;
    itemOptions?: ILayoutElementOptionProps[];
}

//
export interface ILayoutElementListProps extends ILayoutElementListCoreProps {
    label: string;
    icon?: string;
}

//기본 layout element list type
export type ILayoutRenderElementListProps = ILayoutElementListProps;

//총합 element list type
export type ILayoutTotalElementListProps = ILayoutElementListProps;

//요소 아이템 list type
export type ILayoutElementItemOptionListProps = ILayoutElementOptionProps;