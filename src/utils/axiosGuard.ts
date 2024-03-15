import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosRequestConfig,
} from 'axios';
import Cookies from 'universal-cookie';
//type
import { IAxiosApiDataProps } from '@/interfaces/axios.interface';

export type IAxiosGuardResponseProps<T = IAxiosApiDataProps> = AxiosResponse<T>;

export interface IAxiosGuardProps<S = IAxiosApiDataProps> extends AxiosInstance {
    interceptors: {
        request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse<S>>;
    };
    get<T = S, R = IAxiosGuardResponseProps<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    delete<T = S, R = IAxiosGuardResponseProps<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    post<T = S, R = IAxiosGuardResponseProps<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    put<T = S, R = IAxiosGuardResponseProps<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

//axios instance 생성
const axiosGuard: IAxiosGuardProps = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REDIRECT_URL,
    headers: { 'Access-Control-Allow-Headers' : 'Content-Type' },
});

//conversion jwt
const convertJwt = (input: string) => 
{

    const output = input.replace(/-/g, '+').replace(/_/g, '/');

    return output;
};

//jwt token 유효성 검증
const jwtAtob = (jwtToken?: string | null) => 
{
    try 
    {
        if(jwtToken)
        {
            const [head, payload] = jwtToken.split('.');
            JSON.parse(atob(convertJwt(head)));
            const expiredTime = JSON.parse(atob(convertJwt(payload)));
            const currentTime = new Date();

            if(new Date(expiredTime.exp * 1000) < currentTime)
            {
                return '만료';
            }
            else
            {
                return true;
            }
        }
        else
        {
            throw 'empty token';
        }
    }
    catch (error) 
    {
        if(error === 'empty token')
        {
            throw error;
        }
        else
        {
            throw 'invalid Base64';
        }
    }
};


//req
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => 
{
    const {
        headers,
    }  = config;
    try 
    {
        const ssrCookie = new Cookies(headers.Cookie);
        const accessToken = ssrCookie.get(String(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME));

        //jwt token validate
        if(accessToken)
        {
            jwtAtob(accessToken);

            headers['Authorization'] = `Bearer ${accessToken}`;

            return config;
        }

        throw 'access token not valid';
    }
    catch (error) 
    {
        throw error;
    }
};

//res
const onResponse = (res: AxiosResponse<IAxiosApiDataProps>): AxiosResponse<IAxiosApiDataProps> => 
{
    return res;
};

//axios error
const onErrorResponse = async (error: AxiosError | Error): Promise<AxiosError | AxiosResponse> => 
{
    try 
    {
        throw error;
    }
    catch (callError) 
    {
        if(callError === 'invalid Base64')
        {
            //유효하지 않은 jwt 값
            const customError = {
                status: 401,
                message: 'Invalid JWT Token',
                originalError: error,
            };

            return Promise.reject(customError);
        }

        return Promise.reject(error);
    }
};


axiosGuard.interceptors.request.use(onRequest, onErrorResponse);
axiosGuard.interceptors.response.use(onResponse, onErrorResponse);

export default axiosGuard;