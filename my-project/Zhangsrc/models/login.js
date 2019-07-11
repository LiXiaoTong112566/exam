import {login} from '@/services/index'
import {setCookie,getCookie} from "@/utils/index";
import { routerRedux } from 'dva/router';
//  处理数据
export default {
    //命名空间
    namespace: 'login',
   //模块的状态
    state: {
      isLogin:-1
    },
    //订阅
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
        return history.listen(({ pathname }) => {
          // 1.判断去的页面是否是登陆页面
          if (pathname.indexOf('/login') === -1) {
            // 1.1 判断是否有登陆态
            if (!getCookie()){
              // 1.1.1没有登陆态，利用redux做路由跳转
              dispatch(routerRedux.replace({
                pathname: `/login`,
                search: `?redirect=${encodeURIComponent(pathname)}`
              }))
            }
          // 1.2用户没有登录态
          }else{
            // 1.2.1去登陆页面，如果已登陆跳回首页
            if (getCookie()){
               // 利用redux做路由跳转
               dispatch(routerRedux.replace({
                pathname: `/home`,
              }))
            }
          }
        });
      },
    },
  
    //异步操作
    effects: {
      * login({ payload,type }, { call, put }) {  // eslint-disable-line
        console.log('payload...', payload, type)
        //payload===>:user_name: "chenmanjie", user_pwd: "Chenmanjie12"
        let data = yield call(login, payload);
        //data====>msg: "登录成功", code: 1, token: 
        console.log('data...', data);
       // 保存cookie 
        if(data.code===1){
            setCookie(data.token)
        }


        yield put({
           type: 'updateLogin',//和下面的同步相连接 
           payload:data.code
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


