import request from '../utils/request';
//获取所有已经分班的学生的接口
export function getStudent() {
  return request.get('/manger/student');
}
//获取教室号

export function getStudentRoom() {
    return request.get('/manger/room');
  }
  //获取班级名称
 
  export function getStudentGrade() {
    return request.get('/manger/grade');
  }


