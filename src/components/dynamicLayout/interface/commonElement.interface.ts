import {
    ILayoutTotalElementListProps,
} from './element.interface';

//공통 요소의 아이템 데이터 타입
export interface ILayoutCommonElementCurrentDataProps extends ILayoutTotalElementListProps {
    value?: Record<string, any>;
}

//공통 요소의 데이터 타입
export interface ILayoutCommonElementDataProps {
    defaultKeyName: string | null;
    values: {[key: string]: ILayoutCommonElementCurrentDataProps};
}

//데이터에 axios post용 공툥 요소의 데이터 타입
export interface ILayoutCommonElementAxiosJsonDataProps {
    header: ILayoutCommonElementDataProps,
    footer: ILayoutCommonElementDataProps,
}

//Mongo DB에서 추가로 전달해주는 공통 요소의 데이터 타입
export interface ILayoutCommonElementAxiosGetJsonDataProps extends ILayoutCommonElementAxiosJsonDataProps {
    _id: string;
    createdAt: string;
    updatedAt: string;
}