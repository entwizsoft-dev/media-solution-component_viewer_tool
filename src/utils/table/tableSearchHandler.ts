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

export type ISearchTypeOptionProps = 
'contents'|
'video'|
'board'|
'layout'|
'payment'|
'distributor'|
'user'|
'statistics'|
'receipt'|
'report'
;

type ISearchOptionProps = {
    searchType?: ISearchTypeOptionProps;
    dateState? : IDateObject | null;
}

/**
 * page의 첫 시작 페이지는 1부터 시작합니다.
 * @param page 검색 페이지 넘버 | type - number
 * @param searchvalue 검색 텍스트 입력 값 | type - string
 * @param option 검색 세부 옵션
 */
export const contentsTableSearchEvent = async (props: IEventProps, option?: ISearchOptionProps) => 
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

        let type = '/content/list';


        const keymapping = (defaultKey: string) => 
        {
            return searchKey ? searchKey : defaultKey;
        };

        if(option && option.searchType)
        {
            switch (option.searchType) 
            {
            case 'contents':
                type = '/content/list';
                searchKey = keymapping('title');
                break;
            case 'video':
                type = '/uploadedVideo/list';
                searchKey = keymapping('fileName');
                break;
            case 'board':
                type = '/board/list';
                searchKey = keymapping('boardName');
                break;
            case 'layout':
                type = '/layout/list';
                searchKey = keymapping('');
                break;
            case 'payment':
                type = '/payment/list';
                searchKey = keymapping('nickname');
                break;
            case 'distributor':
                type = '/distributor/list';
                searchKey = keymapping('distributorId');
                break;
            case 'user':
                type = '/user/list';
                searchKey = keymapping('nickname');
                break;
            case 'statistics':
                type = '/statistics/list';
                searchKey = keymapping('distributor');
                break;
            case 'receipt':
                type = '/calculate/list';
                searchKey = keymapping('distributor');
                break;
            case 'report':
                type = '/report/list';
                searchKey = keymapping('reportedContent');
                break;
            default: 
                type = '/content/list';
                searchKey = keymapping('title');
                break;
            }
        }
        props.searchKey = searchKey;
        const json = objectConvertHandler(props);
        const searchResponse = await axiosGuard.get(`/admin${type}`, {params : json});

        if(searchResponse.data.code === 1)
        {
            //return
            const result = searchResponse.data.data;
            return result;
        }
        else
        {
            throw 'api error';
        }
    }
    catch (error) 
    {
        console.error(error);
        throw error;
    }
};