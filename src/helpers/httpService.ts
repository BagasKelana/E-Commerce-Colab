/* eslint-disable no-param-reassign */
import axios from 'axios';

// create axios instance wrapper
export const httpService = axios.create({
  baseURL: import.meta.env.VITE_DEVELOPE_API,
  headers: {
    'Content-Type': 'application/json'
  }
});

httpService.interceptors.request.use(
  (config) => {
    const { user } = JSON.parse(String(localStorage.getItem('persist:root')));
    const { currentUser } = JSON.parse(user);

    if (currentUser.token)
      config.headers.Authorization = 'Bearer ' + currentUser.token;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// add interceptor to handle errors
httpService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isAllowPath =
      window.location.pathname !== '/signup' &&
      window.location.pathname !== '/signin';

    if (error?.response?.status === 401 && isAllowPath) {
      // redirect to login page if not authenticated
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  }
);
