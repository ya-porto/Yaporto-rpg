import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

class HTTP {
  get = (url: string, options?: AxiosRequestConfig) => axios.get(url, options)
  post = (url: string, data: any, options?: AxiosRequestConfig) => axios.post(url, data, options)
  put = (url: string, data: any, options?: AxiosRequestConfig) => axios.put(url, data, options)
  delete = (url: string, options?: AxiosRequestConfig) => axios.delete(url, options)
}

const http = new HTTP();

export {http, AxiosError, AxiosResponse};
