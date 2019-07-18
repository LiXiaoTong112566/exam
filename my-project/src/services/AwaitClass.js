import request from '../utils/request'

//获取所有班级
export function ManagerGrade() {
  return request.get('/manger/grade');
}

//获取学生试卷列表
export function getExamStudent(params) {
  console.log(params);
  console.log({params})
  return request.get('/exam/student',params);
}










