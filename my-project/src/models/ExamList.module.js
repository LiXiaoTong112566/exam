import { subjectD, examTypeD, examList, examTeach } from "@/services";

export default {
  namespace: "examListS",

  state: {
    subjectData: [], //获取所有课程数据
    examTypeData: [], //添加试题考试类型数据
    examListData: [], //获取试卷列表
    examTeachData: [] //examTeach
  },
  effects: {
    //获取所有课程
    *subject({ payload }, { call, put }) {
      let data = yield call(subjectD, payload);

      yield put({
        type: "getsubject",
        payload: data.data
      });
    },
    //获取考试类型
    *examType({ payload }, { call, put }) {
      let data = yield call(examTypeD, payload);

      yield put({
        type: "getExamType",
        payload: data.data
      });
    },
    //获取试卷列表
    *examList({ payload }, { call, put }) {
      let data = yield call(examList, payload);

      yield put({
        type: "examListType",
        payload: data.exam
      });
    },
    //获取试卷详情（教师端）
    *examTeach({ payload }, { call, put }) {
      let data = yield call(examTeach, payload);

      yield put({
        type: "examTeachType",
        payload: data.data
      });
    }
  },

  reducers: {
    //获取所有课程
    getsubject(state, action) {
      return {
        ...state,
        subjectData: action.payload
      };
    },
    //获取考试类型
    getExamType(state, action) {
      return {
        ...state,
        examTypeData: action.payload
      };
    },
    //获取试卷列表
    examListType(state, action) {
      return { ...state, examListData: action.payload };
    },
    //获取试卷列表
    examTeachType(state, action) {
      return { ...state, examTeachData: action.payload };
    }
  }
};
