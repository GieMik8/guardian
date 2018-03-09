import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosError } from 'axios';

import { API_KEY, BASE_URL } from './options'; 

const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.params = {
      ...config.params,
      'api-key': API_KEY
    };
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default instance;