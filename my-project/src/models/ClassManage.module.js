import { room,addRoom,deleteClass } from '@/services'

export default {
  namespace: 'ClassManage',

  state: {
   //获取所有教室号
   roomData: [],
  },
  effects: {
     //获取全部教室
     *roomD({ payload }, { call, put }) {
      let data = yield call(room,payload);
      yield put({
        type: 'roomInfo',
        payload: data.data
      });
    },

    //添加教书接口
    *addRoom({ payload }, { call, put }) {
      let data = yield call(addRoom,payload);
      yield put({
        type: 'addRoomInfo',
        payload: data.data
      });
    },
      //删除教书接口
      *deleteClass({ payload }, { call, put }) {
        let data = yield call(deleteClass,payload);
        // yield put({
        //   type: 'deleteClassInfo',
        //   payload: data.data
        // });
      },
  },


  reducers: {
    //获取所有教师号
    roomInfo(state, action ) {
      return {...state, roomData: action.payload};
    },
    //添加教书接口
    addRoomInfo(state, action ) {
      return {...state, roomData: action.payload};
    },
    //删除教书接口
    deleteClassInfo(state, action ) {
    return {...state, roomData: action.payload};
  },
  }
}