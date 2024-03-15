//type
import {
    ILayoutElementOptionDependencyActionProps,
} from '../interface/option.interface';

type IActionProps = (type: ILayoutElementOptionDependencyActionProps, value: any) => any;
type IHandlerProps = (value: any) => any;

// 함수 매핑을 위한 객체
const actionHandlers = {
    //토글 boolean
    toggleHideBoolean: (value: boolean) => 
    {
        return { hide: !value };
    },
    radioWindowType: (value: string) => 
    {
        return { hide: value === 'noPath' || value === 'inheritLink' };
    },
    //외부 링크 라디오 버튼 선택 시 hide toggle
    radioExternalLink: (value: string) => 
    {
        return { hide: value !== 'externalLink' };
    },
    //레이아웃 템플릿 라디오 버튼 선택 시 hide toggle
    radioLayoutTemplateLink: (value: string) => 
    {
        return { hide: value !== 'layoutTemplate' };
    },
};


//바인드 액션 모음
export const bindAction: IActionProps = (type, value) => 
{
    const handler: IHandlerProps = actionHandlers[type];
    if (handler) 
    {
        return handler(value);
    }
    // 적절한 기본값 또는 오류 처리
    return null;
};