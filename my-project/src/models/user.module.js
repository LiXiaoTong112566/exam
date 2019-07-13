import { userInfo } from '@/services'

export default {
  namespace: 'user',

  state: {
    userInfoData: {},
  },
  subscription: {
    setup({ dispatch, history }) { }
  },
  effects: {
    //获取当前用户信息
    *userInfo({ payload }, { call, put }) {
      let data = yield call(userInfo);
      yield put({
        type: 'getUserInfo',
        action: data.data
      });
    },
  },


  reducers: {
    getUserInfo(state, { action }) {
      return {
        ...state,
        userInfoData: action
      };
    },
  }
}