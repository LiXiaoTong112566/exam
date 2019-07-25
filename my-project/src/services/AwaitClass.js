import request from "../utils/request";

//获取所有班级
export function ManagerGrade() {
  return request.get("/manger/grade");
}


//获取学生试卷列表
export function getExamStudent(params) {
 
  return request.get("/exam/student", {params});
}
//获取学生试卷详情信息

export function getExamStudentSer(params) {
  return request.get(`/exam/student/${params}`);
}

//获取学生分数
export function getScoreSer(params) {
 
  return request.put(`/exam/student/${params.id}`, {score:params.score });
}


//获取试卷列表


export function getMangerGradeSer() {
  return request.get("/manger/grade");
}