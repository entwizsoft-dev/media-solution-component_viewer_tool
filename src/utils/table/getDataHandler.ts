import axiosGuard from '../axiosGuard';
import { IDateObject } from '@/components/table/template/ReceiptDataTable';
import { objectConvertHandler } from '../convertHandler';

export type IEventProps = {
    page: number;
    perPage?: number;
    searchvalue?: string;
    searchKey?: string;
    exposure? : {start : string, end : string | null};
}

export type ITemplateSearchTypeOptionProps = 
'contents'|
'video'|
'board'|
'layout'|
'payment'|
'distributor'|
'user'|
'statistics'|
'receipt' |
'datatemplate' |
string;

type ISearchOptionProps = {
    dbType: 'sql' | 'nosql';
    searchType?: ITemplateSearchTypeOptionProps;
    dateState? : IDateObject | null;
}

/**
 * page의 첫 시작 페이지는 1부터 시작합니다.
 * @param page 검색 페이지 넘버 | type - number
 * @param searchvalue 검색 텍스트 입력 값 | type - string
 * @param option 검색 세부 옵션
 */
export const getDataHandler = async (props: IEventProps, option?: ISearchOptionProps) => 
{
    try 
    {
        let {
            searchKey,
        } = props;

        if(props.page <= 0)
        {
            throw 'page value는 0보다 큰 수여야 합니다.';
        }

        let apiUrl = '/admin/content/list';

        const keymapping = (defaultKey: string) => 
        {
            return searchKey ? searchKey : defaultKey;
        };

        if(option && option.searchType)
        {
            if(option.dbType === 'sql')
            {
                switch (option.searchType) 
                {
                case 'video':
                    apiUrl = '/admin/uploadedVideo/list';
                    searchKey = keymapping('fileName');
                    break;
                case 'payment':
                    apiUrl = '/admin/payment/list';
                    searchKey = keymapping('nickname');
                    break;
                case 'distributor':
                    apiUrl = '/admin/distributor/list';
                    searchKey = keymapping('distributorId');
                    break;
                case 'user':
                    apiUrl = '/admin/user/list';
                    searchKey = keymapping('nickname');
                    break;
                case 'statistics':
                    apiUrl = '/admin/statistics/list';
                    searchKey = keymapping('distributor');
                    break;
                case 'receipt':
                    apiUrl = '/admin/calculate/list';
                    searchKey = keymapping('distributor');
                    break;
                }
            }
            else if(option.dbType === 'nosql')
            { 
                apiUrl = `/collection/${option.searchType}/list`;
                searchKey = keymapping('');
            }
        }
        props.searchKey = searchKey;
        const json = objectConvertHandler(props);

        const searchResponse = await axiosGuard.get(`${apiUrl}`, {params : json});
        const {
            code,
            data,
        } = searchResponse.data;

        if(code === 1)
        {
            //return
            return data;
        }
        else
        {
            throw `error code - ${code}`;
        }
    }
    catch (error) 
    {
        console.error(error);
        throw error;
    }
};