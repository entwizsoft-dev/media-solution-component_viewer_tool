//type
type IUnkownKey = Record<string, any>;

// export interface IReturnSearchConvProps extends IUnkownKey {
//     limit: string | number;
//     value: string;
// }

//공통 데이터 queryString 변환 함수
export const objectConvertHandler = (props: IUnkownKey): IUnkownKey => 
{
    const {
        perPage,
        searchvalue,
        searchKey,
    } = props;

    const convertArray: IUnkownKey = {}; // 체크박스 변환 값 담을 객체
    let stringObj: IUnkownKey = {};

    const propsKeys = Object.keys(props);

    propsKeys.forEach((propsKey) => 
    {
        /*
        **변환 조건**
        -1depth object일 경우
        -2depth object일 경우
        -Array일 경우
        */
    
        const propsValue = props[propsKey as keyof IUnkownKey];

        if(propsValue)
        {
            //Array일 경우
            if(Array.isArray(propsValue))
            {
                const convString = propsValue.map((obj) => 
                {
                    const [objKey, value] = Object.entries(obj)[0];
                    if(value)
                    {
                        return objKey;
                    }
                    else
                    {
                        return null;
                    }
                });
                const filterNull = convString.filter(i => 
                {
                    return i !== null;
                });

                if(filterNull.length > 0)
                {
                    convertArray[propsKey] = filterNull.join();
                }
            }
            else if(typeof propsValue === 'object')
            {
                const {
                    start,
                    end,
                } = propsValue;
    
                const convertDate: {
                    startDate : string,
                    endDate? : string,
                } = {
                    startDate : start,
                };
            
                if(end)
                {
                    convertDate.endDate = end;
                }

                stringObj = {...stringObj,...convertDate};
            }
            //1depth object일 경우
            else if(
                (typeof propsValue === 'string' || typeof propsValue === 'number') &&
                propsValue !== ''
            )
            {
                stringObj[propsKey] = propsValue;
            }
        }
    });

    const resJson: any = {
        ...convertArray,
        ...stringObj,
        limit: perPage ? perPage : 10,
        value: searchvalue ? searchvalue : '',

    };

    delete resJson.perPage;
    delete resJson.searchvalue;

    if(searchKey)
    {
        const keyJson = {
            ...resJson,
            key: searchKey,
        };

        delete keyJson.searchKey;

        return keyJson;
    }

    return resJson;
};

//object 를 queryString으로 변환
export const objectToQueryString = (obj: IUnkownKey) => 
{
    const parts = [];
    for (const key in obj) 
    {
        if (obj.hasOwnProperty(key)) 
        {
            parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
    }
    return parts.join('&');
};