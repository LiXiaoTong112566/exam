import request from '../utils/request'

//用户登录
export function login(params) {
  return request.post('/user/login', params);
}

//获取当前用户信息
export function userInfo() {
  return request('/user/userInfo')
}




//获取当前用户信息
export function userUser() {
  return request.get('/user/user')
}

//展示身份数据
export function identity() {
  return request.get('/user/identity')
}

//展示api接口权限数据
export function interfaceInfo() {
  return request.get('/user/api_authority')
}

//展示身份和api权限关系
export function relation() {
  return request.get('/user/identity_api_authority_relation')
}

//视图接口权限
export function viewAuthority() {
  return request.get('/user/view_authority')
}
//展示身份和视图权限关系
export function identityViewAuthority() {
  return request.get('/user/identity_view_authority_relation')
}
