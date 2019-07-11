import request from '../utils/request';

export function lookCheck() {
  return request.get('/exam/subject');
  // return request.get('/exam/examType');
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

export function  condition() {
  return request.get('/exam/questions/condition');
}

