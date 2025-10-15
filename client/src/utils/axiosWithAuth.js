import axios from 'axios';
import { getAccessToken, setAccessToken, clearAccessToken } from '../utils/tokenStore';

const $api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

$api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await $api.post('/auth/refresh', {});

        const newToken = refreshResponse.data.accessToken;
        setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return $api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', {
          error: refreshError,
          response: refreshError.response?.data,
          status: refreshError.response?.status,
          headers: refreshError.response?.headers
        });
        clearAccessToken();
        throw new Error('SESSION_EXPIRED');
      }
    }

    return Promise.reject(error);
  }
);

export default $api;
