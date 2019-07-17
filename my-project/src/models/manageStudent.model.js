import { getStudent, getStudentRoom, getStudentGrade } from "@/services";

export default {
  namespace: "ManageStudentPage",

  state: {
    MangerStudentData: [],
    StudentRoomData: [],
    StudentGradeData: []
  },

  effects: {
    //获取所有学生信息
    *getManageStuModel({ payload }, { call, put }) {
      let data = yield call(getStudent);
      yield put({
        type: "getMangerReducer",
        action: data.data
      });
    },

    //获取教室
    *getRoomText({ payload }, { call, put }) {
      let data = yield call(getStudentRoom);
      // console.log(data);
      yield put({
        type: "getStudentRoomReducer",
        action: data.data
      });
    },
    //获取班级名称
    *getGradeName({ payload }, { call, put }) {
      let data = yield call(getStudentGrade);
      yield put({
        type: "getStudentGradeReducer",
        action: data.data
      });
    }
  },

  reducers: {
    getMangerReducer(state, { action }) {
      return {
        ...state,
        MangerStudentData: action
      };
    },

    getStudentRoomReducer(state, { action }) {
      return {
        ...state,
        StudentRoomData: action
      };
    },

    getStudentGradeReducer(state, { action }) {
      return {
        ...state,
        StudentGradeData: action
      };
    }
  }
};
