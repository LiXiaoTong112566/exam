import request from '../utils/request';
//获取所有课程
export function subjectD() {
    return request.get('/exam/subject');
}
//获取考试类型
export function examTypeD() {
    return request.get('exam/examType')
}
//获取试卷列表
export function examList() {
    return request.get('/exam/exam')
}
//获取试卷详情（教师端）
export function examTeach(params) {
    console.log(params)
    return request.get(`/exam/exam/${params}`)
}


