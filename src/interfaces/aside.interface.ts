
//접근 권한 레벨
type IAuthLevel = 0 | 1 | 2;

//aside 데이터가 공통적으로 사용하는 타입
export interface IAsideCommonType {
    label?: string;
    rewrite?: boolean;
    remove?: boolean;
    setting?: boolean;
}

//aisde 하위 리스트 데이터
export interface IAsideListDataProps extends IAsideCommonType {
    icon?: string;
    link?: string;
    focus?: string;
    ACL: IAuthLevel;
    newTab? : boolean;
}

//aside에 사용되는 데이터 폼 object rows
export interface IAsideDataRowsProps extends IAsideCommonType {
    list?: IAsideListDataProps[];
}