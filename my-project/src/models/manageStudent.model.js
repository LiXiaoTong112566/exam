import {
  getStudent,
  getStudentRoom,
  getStudentGrade,
  delStudent,
  getNewStudent,
  getNewStudentGrade,
 
} from "@/services";

export default {
  namespace: "ManageStudentPage",
  state: {
    MangerStudentData: [], //获取所有分班学生的信息
    NewMangerStudentData: [], //获取所有没有分班学生的信息
    AllManagerStudentData: [], //所有的数据
    StudentRoomData: [],
    StudentGradeData: [], //获取已经分配教室的班级
    delStudentData: [],
    NewStudentGradeData: [], //获取没有分配教室的班级
   
  },

  effects: {
    //获取所有已经分班学生信息
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
      yield put({
        type: "getStudentRoomReducer",
        action: data.data
      });
    },
    //获取已经分配教室班级名称
    *getGradeName({ payload }, { call, put }) {
      let data = yield call(getStudentGrade);

      yield put({
        type: "getStudentGradeReducer",
        action: data.data
      });
    },

    //获取没有分配教室的班级
    *getNewGradeName({ payload }, { call, put }) {
      let data = yield call(getNewStudentGrade);

      yield put({
        type: "getNewStudentGradeReducer",
        action: data.data
      });
    },

    //获取所有没有分班的学生的班级

    *getNewManageStuModel({ payload }, { call, put }) {
      let data = yield call(getNewStudent);
      yield put({
        type: "getNewMangerReducer",
        action: data.data
      });
    },

    //删除数据
    *delManageStuModel({ payload }, { call, put }) {
      let data = yield call(delStudent, payload);

      yield put({
        type: "delStudentGradeReducer",
        action: data
      });

      yield put({
        type: "getManageStuModel"
      });

      yield put({
        type: "getNewManageStuModel"
      });
    },
   
  },

  reducers: {
    getMangerReducer(state, { action }) {
      return {
        ...state,
        AllManagerStudentData: state.NewMangerStudentData.concat(action),
        MangerStudentData: action //获取所有分班学生的信息
        //获取所有没有分班学生的信息: state.AllManagerStudentData.concat(action)
      };
    },

    getStudentRoomReducer(state, { action }) {
      return {
        ...state,
        StudentRoomData: action
      };
    },

    //获取已经分配教室的班级
    getStudentGradeReducer(state, { action }) {
      return {
        ...state,
        StudentGradeData: action
      };
    },

    //获取没有分配教室的班级
    getNewStudentGradeReducer(state, { action }) {
      return {
        ...state,
        NewStudentGradeData: action
      };
    },

    //删选数据
    filterStudentModel(state, { payload }) {
      const newData = state.AllManagerStudentData.filter((item, index) => {
        if (
          item.student_name === payload.student_name &&
          item.room_text === payload.room_text &&
          item.grade_name === payload.grade_name
        ) {
          return item;
        }
      });

      return {
        ...state,
        AllManagerStudentData: newData
      };
    },

    //删除数据

    delStudentGradeReducer(state, { action }) {
      return {
        ...state,
        delStudentData: action
      };
    },

    //获取所有没有分班的班级
    getNewMangerReducer(state, { action }) {
      return {
        ...state,
        NewMangerStudentData: action,
        AllManagerStudentData: state.MangerStudentData.concat(action)
      };
    },

    

  

  }
};
