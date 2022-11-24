import http from './axios';
const BASE_API_URL = '/notion';

class ResultApi {
  static getList(params) {
    return http.get(`${BASE_API_URL}/`, params);
  }
}

export default ResultApi;