import request from '../utils/request';

export function login(params) {
  return request.post('/user/login', params);
}
