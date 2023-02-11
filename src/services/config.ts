import axios, { AxiosInstance } from 'axios';
import UserService from './UserService';

const $api = axios.create({
  baseURL: 'http://test-task-second-chance-env.eba-ymma3p3b.us-east-1.elasticbeanstalk.com'
});

$api.interceptors.request.use((config) => {
  config.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorize");
  config.headers.set('Content-Type', "application/json; charset=utf-8");
  
  config.headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);

  return config;
});

async function responseErrorMiddleware(error: any, api: AxiosInstance) {
  const originalRequest = error.config;

  console.log(originalRequest);
  console.log(originalRequest._isRetry);

  if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
    originalRequest._isRetry = true;
    try {
      const resp = await UserService.refresh();

      localStorage.setItem('accessToken', resp.data.accessToken);

      return api.request(originalRequest);
    } catch(e) {
      console.log('User is unauthorized');
    }
  }
  if (error.response.status !== 401) {
    return Promise.reject(error);
  }
}

$api.interceptors.response.use((config) => {
  return config;
}, async(error) => responseErrorMiddleware(error, $api));

export default $api;