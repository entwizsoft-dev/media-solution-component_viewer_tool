// type
import {
    IElementListOptionDataProps,
} from '../interface/element.interface';

//특정 배열에서 매치되는 키 찾아서 리턴
export const matchkey = (key: string, arr?: IElementListOptionDataProps<any>[]) => 
{
    if (!Array.isArray(arr)) 
    {
        return undefined;
    }

    for (const el of arr) 
    {
        if (Array.isArray(el)) 
        {
            const foundInNestedArray = el.find(ael => 
            {
                return ael.key === key;
            });
            if (foundInNestedArray) 
            {
                return foundInNestedArray.value;
            }
        }
        else if (el.key === key) 
        {
            return el.value;
        }
    }

    return undefined;
};