import axios from 'axios';
import history from './history';

export default () => {
  let onRequestSuccess = config => {
    var token = localStorage.getItem('auth-token');
    if (token) {
      config.headers['X-Auth-Token'] = token;
    }
    return config;
  };
  const identity = (response) => response;
  let onResponseError = (error) => {
    if (error.status == 403) {
      const currentPath = window.location.pathname;
      history.replaceState({nextPathname: currentPath}, '/login');
    }
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(identity, onResponseError);
}