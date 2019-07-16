import request from '../utils/request';
//获取所有教室号
export function room(params) {
  return request.get('/manger/room',params);
}
//获取所有课程
export function subject() {
    return request.get('/exam/subject');
}
//添加班级接口
export function grade(params) {
  return request.post('/manger/grade',params);
}
  
//获取已经分配教室的班级
export function gradeClass(params) {
  return request.get('/manger/grade',{params});
}
//更新班级信息
export function update(params) {
  return request.put('/manger/grade/update',params);
}
//删除班级接口
export function deleteD(params) {
  return request.delete(`/manger/grade/delete/${params}`);
}