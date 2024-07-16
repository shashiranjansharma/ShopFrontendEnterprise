import axios, { type AxiosResponse } from 'axios';
import router from './router';

export function useAxios() {
    const token = localStorage.getItem('shop_app_token');
    const { protocol, hostname } = window.location;
    const defaultOptions = {
        withCredentials: true,
        baseURL: `${protocol}//dt1.${hostname}:80/api/`,
        headers: {
            Authorization: token ? token : '',
        }
    };
    return {
        get: (url: string, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
        post: (url: string, data: Record<string, any>, options = {}) =>
            axios.post(url, data, { ...defaultOptions, ...options }),
        put: (url: string, data: Record<string, any>, options = {}) =>
            axios.put(url, data, { ...defaultOptions, ...options }),
        delete: (url: string, options = {}) => axios.delete(url, { ...defaultOptions, ...options })
    };
}

axios.interceptors.response.use(
    (response: AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) => {
        return response;
    },
    (error: any) => {
        if (error.response.status === 401) {
            localStorage.removeItem('shop_app_token');
            router?.push({ name: 'Login' });
        }
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
    }
);