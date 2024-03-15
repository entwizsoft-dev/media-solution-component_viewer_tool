export type textalign = 'left' | 'center' | 'right';
export type celltype = 'text' | 'image' | 'chip';

interface ICallbackBaseProps {
    page: number;
    perPage: number;
    searchvalue: string;
}

export type ICallbackEventParamaterProps<T extends Record<string, unknown> = Record<string, unknown>> = ICallbackBaseProps & T;

export interface IBodyProps {
	key: string;
	value: any;
}

export interface ITableHeadProps {
	key: string;
	title: string;
	textalign?: textalign;
	celltype?: celltype;
    // color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    color?: (data: any) => 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
	clickevent?: (e?: any) => void;
}

export interface ITableData {
	head: ITableHeadProps[];
    body: IBodyProps[][];
}

/* 네비게이션 옵션 인터페이스 */
export interface INavOptionsProps {
	labelRowsPerPage?: string;
	rowsPerPageOptions?: number[];
}

export interface ISearchOptionData {
	label: string;
	value: string;
    defaultValue?: boolean;
}

interface ISearchFilterOptionDetailProps {
    label: string;
    name: string;
    data?: ISearchOptionData[];
    defaultValue?: string | number;
}

interface ISearchFilterOptionProps {
    type: 'radio' | 'checkbox' | 'select' | 'datepicker';
    option: ISearchFilterOptionDetailProps;
}

/* 검색 옵션 인터페이스 */
export interface ISearchOptionsProps {
	searchSelectOptions?: ISearchOptionData[];
    searchFilterOptions?: ISearchFilterOptionProps[];
}

/* 검색 필터 옵션 인터페이스 */
export interface ISearchSelectOptionPoprs {
    key: string;
    value: string;
}

export interface IButtonOptionsProps {
    name : string;
    callback?: (data: {[key: string]: any}) => void;
}

export interface IMenuOptionProps {
	title: string;
	event: (props: {
        data: {
            currentData: any,
            index: number
        },
        nav: ICallbackEventParamaterProps
    }) => void;
	icon?: React.ReactNode;
	color?:  
	|'inherit'
	| 'action'
	| 'disabled'
	| 'primary'
	| 'secondary'
	| 'error'
	| 'info'
	| 'success'
	| 'warning';
}

/* 테이블 props 인터페이스 */
interface ITableGlobalProps {
    useCheckBox?: boolean;
    singleCheck? : boolean;
    search?: boolean;
    callbackCheckData? : (rowValue: any) => void;
}

export interface ITableProps extends ITableGlobalProps {
	tableHeadOptions: ITableHeadProps[];
	tableLabel: string;
    tableCaption?: string;
	tableData: object[];
	navOptions?: INavOptionsProps;
	searchOptions?: ISearchOptionsProps;
    searchSelectOption?: ISearchSelectOptionPoprs[];
	menuOptions?: IMenuOptionProps[];
    searchPlaceHolder?: string;
    useCheckBox? : boolean;
    totalPage?: number;
    currentPage?: number;
    callbackPage?: (data: ICallbackEventParamaterProps) => void;
    callbackPerPage?: (data: ICallbackEventParamaterProps) => void;
    callbackSearch?: (data: ICallbackEventParamaterProps) => void;
    defaultPerPage?: number;
    defaultSearchValue?: string;
    buttonOptions?: IButtonOptionsProps[];
    useEllipsis? : boolean;
}

/* 테이블 셀 */
export interface IBodyCell {
    type?: celltype;
	pureData: any;
    data: any;
    align?: textalign;
    color?: (data: any) => 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
    clickevent?: (e?: any) => void;
    useEllipsis?: boolean;
}

/* 테이블 데이터 */
export interface ITableBaseDataProps<T extends Record<string, any> = Record<string, any>> {
    currentPage: number;
    data: T[];
    totalCount: number;
    totalPages: number;
}

/* 공통 탬플릿 테이블 props */
export interface ITemplateTableProps extends ITableGlobalProps {
    defaultTableData: object;
}