import request from "../utils/request";

//获取所有班级
export function ManagerGrade() {
  return request.get("/manger/grade");
}

//获取学生试卷列表
export function getExamStudent(params) {
  return request.get("/exam/student", params);
}
//获取学生试卷信息

export function getExamStudentSer(params) {
  return request.get(`/exam/student/{params.exam_student_id}`);
}

export function getScoreSer(params) {
  return request.put("/exam/student", { params });
}
