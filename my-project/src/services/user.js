import request from '../utils/request'

//用户登录
export function login(params) {
  return request.post('/user/login', params);
}

//获取当前用户信息
export function userInfo() {
  return request('/user/userInfo')
}