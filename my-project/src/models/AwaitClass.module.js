import { ManagerGrade } from '@/services'
import {routerRedux } from "dva/router";

export default {
  namespace: 'AwaitClassModel',

  state: {
    getAllGradeData: [],
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
  }
}