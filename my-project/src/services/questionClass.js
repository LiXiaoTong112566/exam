import request from "../utils/request";

export function questionClass(){
    return request.get("/exam/getQuestionsType")
}

export function addType(params){
    console.log(params);
    return request.get(`/exam/insertQuestionsType?text=${params.text}&&sort=${params.sort}`);
}


//添加试题
export function add(params) {
    return request({
        url: '/exam/questions',
        method: 'POST',
        data: params
    })
}

//获取考试类型
export function examType() {
    return request({
        url: 'exam/examType',
        method: 'GET'
    })
}

//获取课程类型
export function subjectType() {
    return request({
        url: '/exam/subject',
        method: 'GET'
    })
}


//获取题目类型
export function getQuestionsType() {
    return request({
        url: '/exam/getQuestionsType',
        method: 'GET'
    })
}
