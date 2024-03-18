import axios from 'axios';
//type
import {
    AxiosResponse,
} from 'axios';

type IDownLoadFileFcnProps = (url: string, json?: {[key: string]: any}) => Promise<void>;

//axios로 다운로드 하는 함수
const downloadFile: IDownLoadFileFcnProps = async (url, json) => 
{
    try 
    {
        //validate
        if(!url || url === '')  
        {
            throw 'donwload url not valid';
        }

        const res: AxiosResponse<BlobPart> = await axios.get(url, {
            params: json,
            responseType: 'blob',
        });

        //filename
        const contentDisposition = res.headers['content-disposition'] || '';
        const matches = contentDisposition.match(/filename=([^;]+)/);
        const filename = (matches && matches[1]) ? matches[1] : 'default_filename.xlsx';

        //blob url create
        const blobUrl = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', filename);
        document.body.appendChild(link);

        //download start
        link.click();                    

        //remove
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(link);
    }
    catch (error) 
    {
        console.error(error);
        throw error;
    }
};

export default downloadFile;