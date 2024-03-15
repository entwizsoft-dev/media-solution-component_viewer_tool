//type
import { IAxiosGuardResponseProps } from '@/utils/axiosGuard';

type IResProps = IAxiosGuardResponseProps;

type ISuccessFuncProps<T> = (d: T) => void;
type IErrorFuncProps = (c: string, m?: string) => void;

interface IOptionProps<T> {
    successMessage?: string;
    errorMessage?: string;
    successCallback?: ISuccessFuncProps<T>;
    errorCallback?: IErrorFuncProps;
}

const axiosResponseProcessor = <T>(res: IResProps, option?: IOptionProps<T>) => 
{
    const {
        code,
        data,
        message,
    } = res.data;

    if(code === 1)
    {
        if(typeof option?.successMessage == 'string')
        {
            alert(option.successMessage);
        }
        if(typeof option?.successCallback === 'function')
        {
            option.successCallback(data);
        }
    }
    else
    {
        if(typeof option?.errorMessage == 'string')
        {
            alert(`${option.errorMessage}\ncode - ${code}`);
        }
        if(typeof option?.errorCallback === 'function')
        {
            option.errorCallback(code, message);
        }
    }
};

export default axiosResponseProcessor;