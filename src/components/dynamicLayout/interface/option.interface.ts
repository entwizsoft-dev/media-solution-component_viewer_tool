/***********************************************
 * Elements Option 공통 타입 모음             *
 ***********************************************/

//옵션에서 생성되는 컴포넌트 종류
export type ILayoutElementOptionComponentsProps = 
'text' |
'number' |
'switch' |
'datepicker' |
'rangeslider' |
'radio' |
'selection' |
'selectbox'|
'templateselectbox' |
'selectDataTemplate' |
'selectLayoutTemplate' |
'dataTemplateFilter';

/***********************************************
 * 옵션별 상호작용 객체 타입 모음             *
 ***********************************************/

//엑션 모음
export type ILayoutElementOptionDependencyActionProps =
'toggleHideBoolean' |
'radioWindowType' |
'radioExternalLink' |
'radioLayoutTemplateLink';

//layout element option 별 의존성 타입
export interface ILayoutElementOptionDependencyProps {
    action: ILayoutElementOptionDependencyActionProps;
    targetKey: string[];
}