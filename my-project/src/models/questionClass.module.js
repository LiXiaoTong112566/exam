import {questionClass,addType} from "@/services/questionClass"
console.log(questionClass);
console.log("aaaaaa",addType);
export default {

    namespace: 'questionClass',
  
    state: {
        questionClassData:[],
    },
  
    // subscriptions: {
    //   setup({ dispatch, history }) {  // eslint-disable-line
    //   },
    // },
  
    effects: {
     //查询所有的试题类型
      *questionClass({ payload }, { call, put }) { 
         // eslint-disable-line
       
        let data=yield call(questionClass)
     
       if(data.code===1){
        yield put({ type: "getQuestionClassData",payload:data.data });
       }
       
      },

      //添加试题类型

      *addType({payload},{call,put}){
        console.log(111);
        console.log(payload);
        let newType=yield call(addType,payload);
        console.log(newType);
      }
    },
  
    reducers: {
      getQuestionClassData(state,action){
        return {...state, questionClassData:action.payload}

      }
     
    },
  
  };
  