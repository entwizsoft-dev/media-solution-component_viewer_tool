//type
import {
    ILayoutElementListCoreProps,
} from './element.interface';
import {
    ILayoutCommonElementDataProps,
} from './commonElement.interface';

export interface ITableBaseDataProps<T extends Record<string, any> = Record<string, any>> {
    currentPage: number;
    data: T[];
    totalCount: number;
    totalPages: number;
}

export interface IFocuseIndexPoprs {
    type: 'header' | 'layout' | 'footer' | null;
    element: number | null;
    item: number | null;
    itemBridgeKey: string | null;
}

//레이아웃 옵션 타입
export interface ILayoutOptionProps {
    layoutName?: string;
    useHeader?: boolean;
    useFooter?: boolean;
    useLoginGuard?: boolean;
    isMain?: boolean;
}

//레이아웃 옵션 데이터 타입
export interface ILayoutOptionObjectProps {
    layoutOption: ILayoutOptionProps;
}

//레이아웃 핵심 데이터 타입
export interface ILayoutCoreDataObjectProps extends ILayoutElementListCoreProps {};

//레이아웃 Root 데이터 타입
export interface ILayoutProps extends ILayoutOptionObjectProps {
    layoutThumbnail?: string;
    layoutData: ILayoutCoreDataObjectProps[];
}

//레이아웃 DB에서 전달해주는 데이터 타입
export interface ILayoutDBProps extends ILayoutProps {
    _id: string;
    _templateName: string;
    createdAt: string;
    updatedAt: string;
}

//레이아웃 리스트 페이지네이션 데이터 타입
export type ILayoutListDataProps = ITableBaseDataProps<ILayoutDBProps>;

//레이아웃 저장 상태 변경 시점 체크 용 타입
export interface ILayoutBeforeSaveProps {
    headerData: ILayoutCommonElementDataProps;
    layoutOption: ILayoutOptionProps;
    layoutData: ILayoutCoreDataObjectProps[];
    footerData: ILayoutCommonElementDataProps;
}