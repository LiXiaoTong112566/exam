import {
  ManagerGrade,
  getExamStudent,
  getExamStudentSer,
  getScoreSer,
  getMangerGradeSer
} from "@/services";
import { routerRedux } from "dva/router";

export default {
  namespace: "AwaitClassModel",

  state: {
    getAllGradeData: [],
    ExamStudentData: [], //获取学生试卷列表
    getExamStudentData: {}, //获取学生试卷信息
    getScoreData: {}, //获取学生分数
    getMangerGradeData: [] //获取待批班级
  },
  subscription: {
    setup({ dispatch, history }) {}
  },
  effects: {
    //获取待批班级

    *getMangerGradeModel({ payload }, { call, put }) {
      let data = yield call(getMangerGradeSer);
      yield put({
        type: "getMangerGradeReducer",
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

    //跳路由的另一种方式

    *redirectTestClass({ payload }, { call, put }) {
      yield put(
        routerRedux.push({
          pathname: "/home/testClass",
          params: { grade_id: payload.grade_id }
        })
      );
    },

    //获取学生试卷列表

    *getStudentExamModel({ payload }, { call, put }) {
      let data = yield call(getExamStudent, payload);
    

      if (data.code) {
        yield put({
          type: "getExamStudentReducer",
          action: data.exam
        });
      }
    },

    //获取班级
    *getGradeModel({ payload }, { call, put }) {
      let data = yield call(getExamStudent, payload);

      if (data.code) {
        yield put({
          type: "getExamStudentReducer",
          action: data.exam
        });
      }
    },

    //获取学生试卷详情信息

    *getAwaitClassModel({ payload }, { call, put }) {
      let data = yield call(getExamStudentSer, payload);
     
      if (data.code) {
        yield put({
          type: "getExamStudentSerReducer",
          action: data.data
        });
      }
    },

    //批改试卷

    *getScoreModel({ payload }, { call, put }) {
      let data = yield call(getScoreSer, payload);
    

      yield put({
        type: "getScoreReducer",
        action: data
      });
    }
  },

  reducers: {
    //获取待批班级
    getMangerGradeReducer(state, { action }) {
      return {
        ...state,
        getMangerGradeData: action
      };
    },

    //获取学生试卷信息
    getExamStudentSerReducer(state, { action }) {
      return {
        ...state,
        getExamStudentData: action
      };
    },

    //批改试卷
    getScoreReducer(state, { action }) {
      return {
        ...state,
        getScoreData: action
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
      const arr = state.ExamStudentData.filter((item, index) => {
        return item.grade_name === payload;
      });

      return {
        ...state,
        ExamStudentData: arr
      };
    }
  }
};
