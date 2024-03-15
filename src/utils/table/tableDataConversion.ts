import { ITableHeadProps } from '@/interfaces/table.interface';

type IKeyValue = {
    [key: string]: any;
}

const tableDataConversion = (data: any[], headOption: ITableHeadProps[]) => 
{
    const convBody = [];

    for (const i in data)
    {
        const obj: any = [];
        for (const j of headOption)
        {
            const splitKey = j.key.split('.');

            // let dd = data[i];
            // for (let k = 0; k < splitKey.length; k++)
            // {
            //     if(splitKey.length > 1)
            //     {
            //         dd = dd[splitKey[k]];
            //     }
            // }

            // console.log('ekekek ', dd);

            const pureKey = splitKey.length > 1 ? splitKey[splitKey.length - 1] : j.key;
            const val: IKeyValue = splitKey.length > 1 ? data[i][splitKey[0]] :  data[i];
            
            const json: IKeyValue = {
                key: j.key,
                value: val[pureKey] ? val[pureKey] : null,
            };
            
            obj.push(json);
        }
        convBody.push(obj);
    }

    const conversionData = {head: headOption, body: convBody};

    return conversionData;
};

export { tableDataConversion };