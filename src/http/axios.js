import axios, { Axios } from "axios";

const BASE_API_URL = process.env.REACT_APP_URL;

const http = new Axios({
  baseURL: BASE_API_URL,
  responseType: 'json',
  transformRequest: [...axios.defaults.transformRequest]
});

http.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data === 'string') {
      const res = JSON.parse(response.data);
      return res;
    } else {
      return response.statusText;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;