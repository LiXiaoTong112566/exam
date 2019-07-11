import { questionClass, addType, add, examType, subjectType, getQuestionsType } from "@/services"

export default {

  namespace: 'questionClass',

  state: {
    examTypeData: [],
    subjectTypeData: [],
    questionsTypeData: [],
    // 添加试题 状态
    addQuestionsFlag: 0,
    questionClassData: [],
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  effects: {
    //查询所有的试题类型
    *questionClass({ payload }, { call, put }) {
      // eslint-disable-line

      let data = yield call(questionClass)

      if (data.code === 1) {
        yield put({ type: "getQuestionClassData", payload: data.data });
      }

    },

    //添加试题类型

    *addType({ payload }, { call, put }) {
      console.log(111);
      console.log(payload);
      let newType = yield call(addType, payload);
      console.log(newType);
    },
    //添加试题
    *add({ payload }, { call, put }) {
      let data = yield call(add, payload)

      yield put({
        type: 'updateAdd',
        action: data.code === 1 ? 1 : -1
      })
    },
    //获取考试类型
    *examType({ payload }, { call, put }) {
      let data = yield call(examType)
      console.log(data)
      yield put({
        type: 'getExamType',
        action: data.data
      })
    },
    // 获取课程类型
    *subjectType({ payload }, { call, put }) {
      let data = yield call(subjectType)
      yield put({
        type: 'getSubjectType',
        action: data.data
      });
    },
    // 获取题目类型
    *questionsType({ payload }, { call, put }) {
      let data = yield call(getQuestionsType)
      yield put({
        type: 'getQuestionsType',
        action: data.data
      });
    },
  },

  reducers: {
    getQuestionClassData(state, action) {
      return { ...state, questionClassData: action.payload }
    },
    updateAdd(state, { action }) {
      console.log(action)
      return {
        ...state,
        addQuestionsFlag: action
      };
    },
    getExamType(state, { action }) {
      return {
        ...state,
        examTypeData: action
      }
    },
    getSubjectType(state, { action }) {
      return {
        ...state,
        subjectTypeData: action
      };
    },
    getQuestionsType(state, { action }) {
      return {
        ...state,
        questionsTypeData: action
      };
    }

  },

};
