import {
    BaseTextFieldProps,
    TextFieldProps,
    InputProps,
    SelectProps,
    SwitchProps,
    SliderProps,
} from '@mui/material';
import {
    IImageFileUploadProps,
} from '@/components/input/ImageFileUpload';
import { IBindActionTypeProps } from '../utils/bindAction';


/***********************************************
 * Elements 들의 기본적인 공통 타입 모음             *
 ***********************************************/

//원시 데이터 타입
/*
    원시 타입 이외에도 커스텀 타입이 존재 함
*/
export type IPrimalDataTypeProps =
'string' |
'integer' |
'date' |
'boolean' |
'object' |
'array' |
'SQL' |
'noSQL';

//기본 elements 종류
export type IBasicElementProps =
'input' |
'number' |
'textarea' |
'checkbox' |
'radio' |
'switch' |
'range' |
'select';

//커스텀 elements 종류
export type ICustomElementProps = 
'datepicker' |
'imageUpload' |
'fileUpload' |
'iconSelect';

//데이터 바인딩 elements 종류
export type IDataBindingElementProps =
'videoDataBind' |
'userDataBind' |
'templateDataBind';

//elements 종류 통합 type
export type ITotalElementProps =
IBasicElementProps |
ICustomElementProps |
IDataBindingElementProps;

/**
 * selection data 기본 객체 구조
 * 주로 radio, checkbox, select의 옵션에서 쓰이는 타입
 */
export interface ISelectionItemDataProps{
    label?: string;
    value?: any;
    checked?: boolean;
}

//데이터 타입 및 데이터 타입 리스트 공통 타입 모음
export interface IDataTypeProps {
    dataType: IPrimalDataTypeProps;
    dataTypeList: IPrimalDataTypeProps[];
}

/***********************************************
 * Elements Option Item type            *
 ***********************************************/

//RangeSlide type
export interface IRangeSliderDefaultProps {
    min? : number
    max? : number
    step? : number
    defaultValue? : number
    marks? : boolean
    valueLabelFormat? : string
}

//option item type 통합
export type IComponentPropsMap = 
IRangeSliderDefaultProps &
ISelectionPropsDataProps;

/***********************************************
 * Elements 데이터 파일 및 옵션 리스트 타입          *
 ***********************************************/

//옵션에서 생성되는 컴포넌트 종류
export type IElementListOptionComponentsProps = 
'text' |
'number' |
'switch' |
'datepicker' |
'rangeslider' |
'radio' |
'selection' |
'selectbox'|
'templateselectbox';

//다른 옵션과 상호 작용 할 수 있는 bind 객체 타입
export interface IElementListOptionBindProps {
    key: string;
    action: IBindActionTypeProps
}

export interface IElementListOptionProps<T> {
    components: IElementListOptionComponentsProps;
    key: string; 
    label?: string;
    value?: T;
    bind?: IElementListOptionBindProps;
    defaultProps?: IComponentPropsMap; //각 옵션 컴포넌트 들의 object 정보를 넣어야함 (개발중)
}

//option 객체 구조
export type IElementListOptionDataProps<T> = (IElementListOptionProps<T> | IElementListOptionProps<T>[]);

//통합 element list 제네릭 타입
export interface IElementListProps<T> extends IDataTypeProps {
    type: T;
    label: string;
    icon?: string;
    option?: IElementListOptionDataProps<any>[];
}

//기본 element list type
export type IBasicElementListProps = IElementListProps<IBasicElementProps>;

//커스텀 element list type
export type ICustomElementListProps = IElementListProps<ICustomElementProps>;

//데이터 바인딩 element list type
export type IDataBindingElementListProps = IElementListProps<IDataBindingElementProps>;

//총합 element list type
export type ITotalElementListProps = IElementListProps<ITotalElementProps>;

/***********************************************
 * Elements Item 옵션 타입 모음           *
 ***********************************************/

//input type
export type IInputTextElementOptionProps =
Omit<BaseTextFieldProps, 'inputProps' | 'InputProps'> &
Partial<InputProps> &
TextFieldProps['inputProps'];

//switch type
export interface ISwitchElementOptionProps extends SwitchProps {
    switchLabel?: string;
}

//range slider
export interface ISlideElementOptionProps extends SliderProps {};

//select element type
export interface ISelectionElementOptionProps extends SelectProps {
    selectionItem?: ISelectionPropsDataProps;
}

//checklist type
export interface ISelectionPropsDataProps {
    disabled?: boolean;
    multiple?: boolean;
    useCreate?: boolean;
    useRemove?: boolean;
    useValues?: boolean;
    data?: (ISelectionItemDataProps | undefined)[];
}

//image upload (수정 필요)
export interface IImageUploadElementOptionProps extends Omit<IImageFileUploadProps, 'maxUploadSize' | 'objectFit'> {
    maxUploadSize: {
        defaultValue?: number;
    }
    data: ISelectionItemDataProps[]
}

//item type 통합 (* 이거 언제 쓰는지 확인)
export type ITemplateDataOptionProps =
IInputTextElementOptionProps &
ISelectionElementOptionProps &
ISwitchElementOptionProps &
ISlideElementOptionProps &
IImageUploadElementOptionProps;

/***********************************************
 * 템플릿 데이터 핵심 타입 요소         *
 ***********************************************/

//template data object row type
export interface ITemplateDataProps extends IDataTypeProps {
    type: ITotalElementProps;
    name: string;
    key: string;
    label?: string;
    useTableColumn?: boolean;
    unique?: boolean;
    option?: IElementListOptionDataProps<any>[];
}

/***********************************************
 * 템플릿 root 옵션 데이터*
 ***********************************************/

export interface ITemplateRootOptionProps {
    fullwidth?: boolean;
    useSearch?: boolean;
    useTableMenu?: boolean;
    viewCreateDate?: boolean;
}

export interface ITemplateRootOptionRowDataProps {
    templateOption: ITemplateRootOptionProps;
}

/***********************************************
 * 페이지 구성에 필요한 상위 Root Data 모음           *
 ***********************************************/

//template 데이터 구성 type
export interface ITemplateDataRowProps {
    templateData: ITemplateDataProps[];
}

//template 페이지 설정 type
export interface ITemplatePageDataProps {
    _templateName: string;
    templateLabel: string;
    templateType: 'object' | 'list';
}

//DB에서 주는 기본 정보 값
export interface ITemplateDBRowDataProps {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

//통합 Root 타입 (DB 값 없는 프론트 데이터 타입)
export type ITemplateMainDataProps = ITemplateDataRowProps & ITemplatePageDataProps & ITemplateRootOptionRowDataProps;

//통합 Root 타입 (DB에서 건내주는 데이터 타입 * mongoDB key 존재)
export type ITemplateListRowDataProps = ITemplateMainDataProps & ITemplateDBRowDataProps & ITemplateRootOptionRowDataProps;
