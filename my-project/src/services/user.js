import request from '../utils/request'

//用户登录
export function login(params) {
  return request.post('/user/login', params);
}

//获取当前用户信息
export function userInfo() {
  return request('/user/userInfo')
}

//获取用户数据
export function getUserSer() {
  return request.get('/user/user')
}

//更新用户数据
export function upDataUserSer(params) {
  return request.put('/user/user',params)
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

//添加用户的接口
export function addUser(params){
  return request.post('/user',params)
}

//获取用户身份
export function userIdentity (params){
  return request.get('/user/identity',params)
}

//添加身份
export function addIdentity (params){
  return request.get('/user/identity/edit',{params})
}

//添加api接口权限
export function addapiSer(params){
  return request.get('/user/authorityApi/edit',{params})
}
//获取是视图权限

export function getViewSer(params){
  return request.get('/user/view_authority')
}

//添加视图权限的接口

export function addViewSer(params){
  
  return request.get('/user/authorityView/edit',{params})
}


//获取api接口权限
export function getApiServer(){
  
  return request.get('/user/api_authority')
}


//添加api接口权限
export function setApiServer(params){
  return request.post('/user/setIdentityApi',params)
}

//给身份设置视图权限

export function setViewSer(params){
  return request.post('/user/setIdentityView',params)
}

//更新时获取用户数据


//获取当前用户信息
export function userUser() {
  return request.get('/user/user')
}







