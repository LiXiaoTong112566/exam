import { login, userInfo, upDataUserSer, viewAuthority } from "@/services";
import { routerRedux } from "dva/router";
import { setCookie, getCookie } from "@/utils/index";
import allRouterPage from "@/router/config"; //获取路由表

export default {
  //命名空间
  namespace: "login",
  //模块的状态
  state: {
    isLogin: -1,
    userInfoData: {}, //用户信息状态
    newUserData: {},
    getViewAuthorityData: [], //获取用户权限
    myView: [], //我可以看得路由
    forbiddenView: [] //不能访问的路由
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
            type: "getUserInfo"
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

      if (Object.keys(userInfoFlag).length) {
        //判断用户信息是否有变化，如果有值就直接返回
        return;
      }

      //发送接口获取用户信息
      let data = yield call(userInfo);

      //获取用户权限
      let ViewAuthority = yield call(viewAuthority);

      //获取用户信息
      yield put({ type: "upDateUserInfo", payload: data.data }); //获取到的信息给state
      if (ViewAuthority.code === 1) {
        yield put({
          type: "getViewAuthorityReducer",
          payload: ViewAuthority.data
        });
      }
    },

    //修改更新用户
    *upDataUser({ payload }, { call, put }) {
      let data = yield call(upDataUserSer, payload); //发送接口获取用户信息

      if (data.code === 1) {
        yield put({ type: "upDateUserDataReducer", payload: data }); //获取到的信息给state
        //重新调用获取信息的方法
        yield put({
          type: "getUserInfo"
        });
      }
    }
  },

  reducers: {
    updateLogin(state, action) {
      return { ...state, isLogin: action.payload };
    },

    //获取用信息
    upDateUserInfo(state, action) {
      return { ...state, userInfoData: action.payload };
    },
    //修改用户信息
    upDateUserDataReducer(state, action) {
      return { ...state, userInfoData: {} };
    },

    // 获取用户权限 筛选出路由
    getViewAuthorityReducer(state, action) {
      let myView = [];
      let forbiddenView = [];

      allRouterPage.routes.forEach(item => {
        let obj = {
          name: item.name,
          children: []
        };

        item.children.forEach(value => {
          //如果获取到的用户权限和路由表里配置的路由表一样的就添加到我的路由里面
          if (
            action.payload.findIndex(item => item.view_id === value.view_id) !==
            -1
          ) {
            obj.children.push(value);
          } else {
            //否则就添加到不能访问的页面里面
            forbiddenView.push(value);
          }
        });
        myView.push(obj); //把能访问的路由添加到能访问的页面里面
      });

      return { ...state, myView, forbiddenView };
    }
  }
};
