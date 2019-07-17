import {
  lookCheck,
  examTypes,
  getQuestionsTypes,
  questions,
  condition,
  detailCon,
  detailConTi
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
  effects: {
    *lookCheck({ payload, type }, { call, put }) {
      let data = yield call(lookCheck, payload);
      yield put({
        type: "upDatalookCheck",
        payload: data.data
      });
    },
    *examTypes({ payload, type }, { call, put }) {
      let data = yield call(examTypes, payload);
      yield put({
        type: "upDataexamTypes",
        payload: data.data
      });
    },
    *getQuestionsTypes({ payload, type }, { call, put }) {
      let data = yield call(getQuestionsTypes, payload);
      yield put({
        type: "upDatagetQuestionsTypes",
        payload: data.data
      });
    },

    *questions({ payload, type }, { call, put }) {
      let data = yield call(questions, payload);
      console.log(data)
      yield put({
        type: "upDataquestions",
        payload: data.data
      });
    },
    *condition({ payload, type }, { call, put }) {
      let data = yield call(condition, payload);
      yield put({
        type: "upDatcondition",
        payload: data.data
      });
    },
    *detailCon({ payload, type }, { call, put }) {
      let data = yield call(detailCon, payload);
      yield put({
        type: "upDatdetailCon",
        payload: data.data
      });
    },
    *detailConTi({ payload, type }, { call, put }) {
      let data = yield call(detailConTi, payload);
      yield put({
        type: "upDatdetailConTi",
        payload: data.data
      });
    },
    //detailConTi
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
    },
    upDatdetailConTi(state, action) {
      return { ...state, detailConDataL: action.payload };
    }
  }
};
