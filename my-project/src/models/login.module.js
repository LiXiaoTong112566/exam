import { login, userInfo, upDataUserSer } from "@/services";
import { routerRedux } from "dva/router";
import { setCookie, getCookie } from "@/utils/index";
export default {
  //命名空间
  namespace: "login",
  //模块的状态
  state: {
    isLogin: -1,
    userInfoData: {}, //用户信息状态
    newUserData: {}
  },
  //订阅的状态
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        //如果不是去登录页面
        if (pathname.indexOf("/login") === -1) {
          if (!getCookie()) {
            dispatch(
              routerRedux.replace({
                pathname: `/login`,
                search: `?redirect=${encodeURIComponent(pathname)}`
              })
            );
          }
        } else {
          //如果用户去的是登录页面
          if (getCookie()) {
            dispatch(
              routerRedux.replace({
                pathname: `/home`
              })
            );
          }
        }

        //获取用户信息
        if (getCookie()) {
          dispatch({
            type: "login/getUserInfo"
          });
        }
      });
    }
  },

  //异步操作

  effects: {
    *login({ payload }, { call, put }) {
      let data = yield call(login, payload);
      if (data.code === 1) {
        setCookie(data.token);
      }
      yield put({ type: "updateLogin", payload: data.code });
    },

    //获取用户信息
    *getUserInfo({ payload }, { call, put, select }) {
      let userInfoFlag = yield select(state => state.login.userInfoData); //获取到的用户信息
      console.log(userInfoFlag); //获取到的用户信息
      // if(Object.keys(userInfoFlag).length){//判断用户信息是否有变化，如果有值就直接返回
      //   return;
      // }

      let data = yield call(userInfo); //发送接口获取用户信息
      console.log(data);
      yield put({ type: "upDateUserInfo", payload: data.data }); //获取到的信息给state
    },

    //修改更新用户
    *upDataUser({ payload }, { call, put }) {
      console.log(payload);
      let data = yield call(upDataUserSer, payload); //发送接口获取用户信息
      console.log(data);

      // yield put({type:"upDateUserDataReducer",payload:data});//获取到的信息给state
      //重新调用获取信息的方法
      yield put({
        type: "getUserInfo"
      });
    }
  },

  reducers: {
    updateLogin(state, action) {
      return { ...state, isLogin: action.payload };
    },

    //获取用信息
    upDateUserInfo(state, action) {
      console.log(action);
      return { ...state, userInfoData: action.payload };
    }
  }
};
