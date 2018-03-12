import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosError, AxiosResponse } from 'axios';

import settings from '~environment/index';

const instance: AxiosInstance = axios.create({
    baseURL: settings.BASE_URL
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Add Api Key to every request
    config.params = {
      'api-key': settings.API_KEY,
      ...config.params,
    };
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // TODO: Handle errors
    return Promise.reject(error);
  }
);

export default instance;