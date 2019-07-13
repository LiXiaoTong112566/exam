import {login} from "@/services";
import {routerRedux} from "dva/router";
import {setCookie,getCookie} from "@/utils/index";
export default {
//命名空间
    namespace: 'login',
 //模块的状态 
    state: {
        isLogin:-1,
    },
    //订阅的状态
    subscriptions: {
      setup({ dispatch, history }) {  

        return history.listen(({pathname})=>{
          console.log(pathname);
          //如果不是去登录页面
          if(pathname.indexOf("/login")===-1){
            if(!getCookie()){
              dispatch(routerRedux.replace({
                pathname:`/login`,
                search:`?redirect=${encodeURIComponent(pathname)}`
              }))

            }

          }else{
            //如果用户去的是登录页面
            if(getCookie()){
              dispatch(routerRedux.replace({
                pathname:`/home`,
              }))
            }

          }
        })

      },
    },

    //异步操作
  
    effects: {
      *login({ payload }, { call, put }) {  
        // eslint-disable-line
        console.log(payload);
        let data=yield call(login,payload)
        console.log(data);
        if(data.code===1){
          setCookie(data.token)
        }
        yield put({ type: 'updateLogin',payload:data.code})
      },
    },
  
    reducers: {
      updateLogin(state, action) {
        console.log(action);
        return { ...state,isLogin:action.payload };
      },
    },
  
  };
  