
//키와 매칭해서 value array 로 변환
export const convarr = (checkkey: string, valuekey: string, arr?: any[]) => 
{
    if (!arr) 
    {
        return [];
    }

    return arr.reduce((acc, item) => 
    {
        if (item?.[checkkey]) 
        {
            const value = item?.[valuekey];
            if (value !== undefined) 
            {
                acc.push(value);
            }
        }
        return acc;
    }, []);
};


