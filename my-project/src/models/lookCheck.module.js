import {
  lookCheck,
  examTypes,
  getQuestionsTypes,
  questions,
  condition,
  detailCon
} from "@/services/index";
export default {
  namespace: "lookCheck",

  state: {
    data: [],
    examTData: [],
    getQueData: [],
    questionsData:[],
    detailConDataL:[]
  },

  // subscriptions: {
  //   setup({ dispatch, history }) {  // eslint-disable-line
  //   },
  // },

  effects: {
    *lookCheck({ payload, type }, { call, put }) {
      let data = yield call(lookCheck, payload);
      console.log(data.data);
      yield put({
        type: "upDatalookCheck",
        payload: data.data
      });
    },
    *examTypes({ payload, type }, { call, put }) {
      // eslint-disable-line
      console.log("payload...", payload, type);
      let data = yield call(examTypes, payload);
      console.log(data.data);
      yield put({
        type: "upDataexamTypes",
        payload: data.data
      });
    },
    *getQuestionsTypes({ payload, type }, { call, put }) {
      // eslint-disable-line
      console.log("payload...", payload, type);
      let data = yield call(getQuestionsTypes, payload);
      console.log(data.data);
      yield put({
        type: "upDatagetQuestionsTypes",
        payload: data.data
      });
    },

    *questions({ payload, type }, { call, put }) {
      // eslint-disable-line
      // console.log("payload...", payload, type);
      let data = yield call(questions, payload);
      // console.log(data.data);
      yield put({
        type: "upDataquestions",
        payload: data.data
      });
    },
    *condition({ payload, type }, { call, put }) {
      // eslint-disable-line
      console.log("payload...", payload, type);
      let data = yield call(condition, payload);
      yield put({
        type: "upDatcondition",
        payload: data.data
      });
    },
    *detailCon({ payload, type }, { call, put }) {
      console.log("payload...", payload, type);
      let data = yield call(detailCon, payload);
      console.log(data)
      yield put({
        type: "upDatdetailCon",
        payload: data.data
      });
    },
  },

  reducers: {
    upDatalookCheck(state, action) {
      return { ...state, data: action.payload };
    },
    upDataexamTypes(state, action) {
      return { ...state, examTData: action.payload };
    },
    upDatagetQuestionsTypes(state, action) {
      return { ...state, getQueData: action.payload };
    },
    upDataquestions(state, action) {
      return { ...state, questionsData: action.payload };
    },
    upDatcondition(state, action) {
      return { ...state, questionsData: action.payload };
    },
    upDatdetailCon(state, action) {
      return { ...state, detailConDataL: action.payload };
    }
  }
};
