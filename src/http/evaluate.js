import http from './axios';
const BASE_API_URL = '/notion';

class EvaluateApi {
  static sendEvaluate(params) {
    return http.post(`${BASE_API_URL}`, params);
  }
}

export default EvaluateApi;