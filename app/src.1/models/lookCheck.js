import {
  lookCheck,
  examType,
  getQuestionsType,
  questions
} from "@/services/index";
export default {
  namespace: "lookCheck",

  state: {
    data: [],
    examTData: [],
    getQueData: [],
    questionsData:[],
    lisValue:''
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  effects: {
    *lookCheck({ payload, type }, { call, put }) {
      // eslint-disable-line
      console.log("payload...", payload, type);
      let data = yield call(lookCheck, payload);
      console.log(data.data);
      yield put({
        type: "upDatalookCheck",
        payload: data.data
      });
    },
    *examType({ payload, type }, { call, put }) {
      // eslint-disable-line
      console.log("payload...", payload, type);
      let data = yield call(examType, payload);
      console.log(data.data);
      yield put({
        type: "upDataexamType",
        payload: data.data
      });
    },
    *getQuestionsType({ payload, type }, { call, put }) {
      // eslint-disable-line
      console.log("payload...", payload, type);
      let data = yield call(getQuestionsType, payload);
      console.log(data.data);
      yield put({
        type: "upDatagetQuestionsType",
        payload: data.data
      });
    },

    *questions({ payload, type }, { call, put }) {
      // eslint-disable-line
      console.log("payload...", payload, type);
      let data = yield call(questions, payload);
      console.log(data.data);
      yield put({
        type: "upDataquestions",
        payload: data.data
      });
    }
  },

  reducers: {
    upDatalookCheck(state, action) {
      return { ...state, data: action.payload };
    },
    upDataexamType(state, action) {
      console.log(action);
      return { ...state, examTData: action.payload };
    },
    upDatagetQuestionsType(state, action) {
      console.log(action);
      return { ...state, getQueData: action.payload };
    },
    upDataquestions(state, action) {
      console.log(action);
      return { ...state, questionsData: action.payload };
    }
  }
};
