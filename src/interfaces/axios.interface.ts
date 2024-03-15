//api response data type 값
export interface IAxiosApiDataProps<T = any> {
    code: 1 | string;
    data?: T;
    message?: string;
}