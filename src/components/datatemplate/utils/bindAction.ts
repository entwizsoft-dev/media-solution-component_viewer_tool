//type
import {
    ITemplateListRowDataProps,
} from '@/components/datatemplate/interface/element.interface';

//바인드 엑션 타입
export type IBindActionTypeProps = 
'datatemplateUpdate' |
'selectionMultipleTrigger';

type IActionProps = (type: IBindActionTypeProps, value: any) => any;

// 함수 매핑을 위한 객체
const actionHandlers = {
    //셀렉트 선택 시 데이터 템플릿 업데이트
    datatemplateUpdate: (value: ITemplateListRowDataProps) => 
    {
        if ('templateData' in value && Array.isArray(value.templateData)) 
        {
            const conv = value.templateData.map((d) => 
            {
                return {
                    ...d,
                    label: d.label || '',
                    value: d.key || '',
                };
            });
            return { value: conv };
        }
        return { value: [] };
    },
    //스위치에 값에 따른 selection multiple 변경
    selectionMultipleTrigger: (value: boolean) => 
    {
        const defaultProps = {
            multiple: value,
            useCreate: true,
            useRemove: true,
            useValues: true,
        };
        return { defaultProps };
    },
};


//바인드 액션 모음
export const bindAction: IActionProps = (type, value) => 
{
    const handler = actionHandlers[type];
    if (handler) 
    {
        return handler(value);
    }
    // 적절한 기본값 또는 오류 처리
    return null;
};