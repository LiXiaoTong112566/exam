import {
  lookCheck,
  examTypes,
  getQueTypes,
  Newquestions,
  condition,
  detailCon,
  detailConTi
} from "@/services/index";
import {message} from 'antd'
export default {
  namespace: "lookCheck",

  state: {
    data: [],
    examTData: [],
    getQueData: [],
    questionsData:[],
    detailConDataL:[],
    isCode:-1
  },
  effects: {
    *lookCheck({ payload, type }, { call, put }) {
      let data = yield call(lookCheck, payload);
     console.log(data);
      yield put({
        type: "upDatalookCheck",
        payload: data.data
      });
    },
    *examTypes({ payload, type }, { call, put }) {
      let data = yield call(examTypes, payload);
      console.log(data);
      yield put({
        type: "upDataexamTypes",
        payload: data.data
      });
    },
    *getQuestionsTypes({ payload, type }, { call, put }) {
     
      let data = yield call(getQueTypes);
     
      yield put({
        type: "upDatagetQuestionsTypes",
        payload: data.data
      });
    },

    *questions({ payload, type }, { call, put }) {
      console.log(payload);
      console.log(Newquestions);
      let data = yield call(Newquestions);
      console.log(data);
      
      yield put({
        type: "upDataquestions",
        payload: data.data
      });
    },
    *condition({ payload, type }, { call, put }) {
      let data = yield call(condition, payload);
      console.log(data)
      yield put({
        type: "upDatcondition",
        payload: data.data
      });
    },
    *detailCon({ payload, type }, { call, put }) {
      console.log(payload)
      let data = yield call(detailCon, payload);
      yield put({
        type: "upDatdetailCon",
        payload: data.data
      });
    },
    *detailConTi({ payload, type }, { call, put }) {
      let data = yield call(detailConTi, payload);
      console.log(data)
        if(data.code!==1){
          message.error(data.msg)
        }else{
          message.success("修改成功");
        }
      yield put({
        type: "upDatdetailConTi",
        payload: data.code,
        // payCode:data.code
      });
    }
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
      console.log(action,"iscode_action")
      return { ...state, isCode:action.payload};
    }
  }
};
