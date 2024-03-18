//중복되는 값이 있다면 그 값을 제거
export const dedupe = (checkkey: string, valuekey: string, arr: any) => 
{
    if(arr)
    {
        for (let i = arr.length - 1; i >= 0; i--) 
        {
            if (arr[i][checkkey]) 
            {
                return arr[i][valuekey] || null;
            }
        }
    }
    return null;
};