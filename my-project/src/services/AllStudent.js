import request from '../utils/request';
//获取所有已经分班的学生的接口
export function getStudent() {
  return request.get('/manger/student');
}

//获取所有没有分班的学生的接口
export function getNewStudent() {
    return request.get('/manger/student/new');
  }
//获取教室号

export function getStudentRoom() {
    return request.get('/manger/room');
  }
  //获取班级名称
 
  export function getStudentGrade() {
    return request.get('/manger/grade');
  }
  
 
//获取没有分配教室的班级
  export function getNewStudentGrade() {
    return request.get('/manger/grade/new');
  }


//删除学生信息
  export function delStudent(data) {
   
      ///:id=>student_id
    return request.delete(`/manger/student/${data.id}`);
  }

  



