import request from "../utils/request";

export function questionClass(){
    return request.get("/exam/getQuestionsType")
}

export function addType(params){
    console.log(params);
    return request.get(`/exam/insertQuestionsType?text=${params.text}&&sort=${params.sort}`);
}