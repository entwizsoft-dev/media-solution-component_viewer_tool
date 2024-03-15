//type
import {
    ILayoutElementOptionProps,
} from '../interface/element.interface';

//배열에서 옵션 찾기
export const findOption = <T = any>(option: ILayoutElementOptionProps<T>[] | undefined) => 
{
    const get = (matchKey: string) => 
    {
        if(Array.isArray(option))
        {
            const findObj = option?.find(op => 
            {
                return op.key === matchKey;
            });

            //숨겨져 있을 경우 없는 값으로 판단
            if(!findObj?.hide)
            {
                return findObj;
            }
        }
    };

    return Object.freeze({
        get,
    });
};

//특정 값을 찾을 때 까지 재귀하는 함수
export const findProperty = <T = any>(accessText?: string ,parentValue?: Record<string, any>): T | undefined => 
{
    //return 되는  value
    let accessValue = parentValue;

    if(accessText && parentValue)
    {
        const textpart = accessText.split(/\.|\[|\]\[|\]/).filter(Boolean);
        const parts = textpart.map(part => 
        {
            return (isNaN(parseInt(part)) ? part : parseInt(part));
        });
    
        for (const key of parts)
        {
            if(parentValue.hasOwnProperty(key))
            {
                accessValue = accessValue?.[key];
            }
            else
            {
                accessValue = undefined;
            }
        }
    }
    else
    {
        accessValue = undefined;
    }

    return accessValue as T | undefined;
};