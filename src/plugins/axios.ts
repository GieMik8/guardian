import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosError } from 'axios';

import settings from '~environment/index';

const instance: AxiosInstance = axios.create({
    baseURL: settings.BASE_URL
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.params = {
      ...config.params,
      'api-key': settings.API_KEY
    };
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default instance;