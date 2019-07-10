import {login} from "../services/login";
export default {
//命名空间
    namespace: 'login',
 //模块的状态 
    state: {
        isLogin:false,
    },
  
    // subscriptions: {
    //   setup({ dispatch, history }) {  // eslint-disable-line
    //   },
    // },

    //异步操作
  
    effects: {
      *login({ payload }, { call, put }) {  
        // eslint-disable-line
        console.log(payload);
        let data=yield call(login,payload)
        console.log(data);
        yield put({ type: 'updateLogin',payload:data.code==1})
      },
    },
  
    reducers: {
      updateLogin(state, action) {
        console.log(action);
        return { ...state,isLogin:action.payload };
      },
    },
  
  };
  