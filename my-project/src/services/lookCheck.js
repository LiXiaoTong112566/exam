import request from '../utils/request';

export function lookCheck() {
  return request.get('/exam/subject');
}


export function  examTypes() {
  return request.get('/exam/examType');
}

export function  getQuestionsTypes() {
  return request.get('/exam/getQuestionsType');
}

export function  questions() {
  return request.get('/exam/questions/new');
}
//第一个详情
export function  condition(params) {
  return request.get('/exam/questions/condition',{params});
}
//编辑
export function  detailCon(params) {
  return request.get(`/exam/questions/condition?questions_id=${params.questions_id}`);
}


//提交
export function  detailConTi(params) {
  console.log(params)
  return request.put('/exam/questions/update',params);
}

