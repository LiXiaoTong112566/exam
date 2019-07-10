import {login} from '../services/index'

//  处理数据
export default {
    //命名空间
    namespace: 'login',
   //模块的状态
    state: {
      isLogin:false
    },
  
    //异步操作
    effects: {
      * login({ payload,type }, { call, put }) {  // eslint-disable-line
        console.log('payload...', payload, type)
        //payload===>:user_name: "chenmanjie", user_pwd: "Chenmanjie12"
        let data = yield call(login, payload);
        //data====>msg: "登录成功", code: 1, token: 
        console.log('data...', data);
        yield put({
           type: 'updateLogin',//和下面的同步相连接 
           payload:data.code==1
          });
       },
    },
    //同步操作
    reducers: {
      updateLogin(state, action) {
        console.log(state,action)
        //state:{isLogin: true} 
        //action:{type: "login/updateLogin", payload: true, @@redux-saga/SAGA_ACTION: true}
        return { ...state,isLogin:action.payload };
      },
    },
  
  };


