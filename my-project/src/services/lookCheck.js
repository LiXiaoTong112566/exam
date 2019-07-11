import request from '../utils/request';

export function lookCheck() {
  return request.get('/exam/subject');
}


export function  examType() {
  return request.get('/exam/examType');
}

export function  getQuestionsType() {
  return request.get('/exam/getQuestionsType');
}

export function  questions() {
  return request.get('/exam/questions/new');
}

export function  condition(params) {
  return request.get(`/exam/questions/condition?questions_type_id=${params.questions_type_id}&&exam_id=${params.exam_id}&&subject_id=${params.subject_id}`);
}

export function  detailCon(params) {
  console.log(params)
  return request.get(`/exam/questions/condition?questions_id=${params.questions_id}`);
}

