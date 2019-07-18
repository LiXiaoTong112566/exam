import { ManagerGrade, getExamStudent } from '@/services'
import {routerRedux } from "dva/router";

export default {
  namespace: 'AwaitClassModel',

  state: {
    getAllGradeData: [],
    ExamStudentData:[]//获取学生试卷列表
  },
  subscription: {
    setup({ dispatch, history }) { }
  },
  effects: {
    
    *getAllGradeModel({ payload }, { call, put }) {
      let data = yield call(ManagerGrade);
      yield put({
        type: "getAllGradeReducer",
        action: data.data
      });
    },

    *getAllTestModel({ payload }, { call, put }) {
        let data = yield call(ManagerGrade);
        yield put({
          type: "getAllTestReducer",
          action: data.data
        });
      },
      
      *redirectTestClass({ payload }, { call, put }) {
       
        yield put(routerRedux.push({pathname:"/home/testClass",params:{grade_id:payload.grade_id}}));
      },

       //获取学生试卷列表
    
    *getStudentExamModel({ payload }, { call, put }) {
      let data = yield call(getExamStudent,payload);
      console.log(data);
      if(data.code){
        yield put({
          type: "getExamStudentReducer",
          action: data.exam
        });
      }
      
    },

    
//获取班级
    *getGradeModel({ payload }, { call, put }) {
      let data = yield call(getExamStudent,payload);
      console.log(data);
      if(data.code){
        yield put({
          type: "getExamStudentReducer",
          action: data.exam
        });
      }
      
    },
  
  },


  reducers: {
    getAllGradeReducer(state, { action }) {
      return {
        ...state,
        getAllGradeData: action
      };
    },

    
    getAllTestReducer(state, { action }) {
        return {
          ...state,
          getAllGradeData: action
        };
      },

      getExamStudentReducer(state, { action }) {
        return {
          ...state,
          ExamStudentData: action
        };
      },


      
      filterTestSearchModel(state, { payload }) {
        console.log(payload);
        const arr= state.ExamStudentData.filter((item,index)=>{
          console.log(item);
          return item.grade_name===payload;
        })
        console.log(arr);
        return {
          ...state,
          ExamStudentData:arr

           
        };
      },

  }
}