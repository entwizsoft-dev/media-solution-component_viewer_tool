//type
import {
    ISearchOptionsProps,
} from '@/interfaces/table.interface';
import {
    ITableBaseDataProps,
} from '@/interfaces/table.interface';
import {
    ISearchTypeOptionProps,
} from '@/utils/table/tableSearchHandler';

//리스트 확정 기본 타입
export interface IListGlobalProps {
    type: ISearchTypeOptionProps;
    defaultCurrentPage: number;
    prePage?: number;
    defaultSearchOption?: ISearchOptionsProps;
}

//리스트 제네릭 타입
export interface IListProps<T> extends IListGlobalProps {
    defaultData: T[];
    itemRender?: (data: T) => React.ReactNode;
}

//리스트 페이지네이션 데이터 타입
export interface IGenericTableBaseProps<T> extends Omit<ITableBaseDataProps, 'data'> {
    data: T[];
}

export type IPageListProps<T> = IGenericTableBaseProps<T>;