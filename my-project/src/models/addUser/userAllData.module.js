import {
  addUser,
  userIdentity,
  addIdentity,
  addapiSer,
  getViewSer,
  addViewSer,
  getApiServer,
  setApiServer,
  setViewSer,
  getUserSer,
  upDataUserSer,
  userInfo
} from "@/services";

export default {
  //命名空间
  namespace: "userData",
  //模块的状态
  state: {
    isLogin: -1,
    addUserType: null, //添加用户
    userIdentData: null, //获取用户身份数据
    addUIData: null, //添加用户身份
    addApiData: null, ////添加api接口权限
    getViewData: null, //获取视图权限
    addViewData: null, //添加视图权限
    getApiData: null, //获取api权限接口数据
    setApiData: null, //设置api接口权限
    setViewData: null, //设置视图权限
    userAllData: null, //获取用户数据
    upDataUserData: null, //修改用户数据
    userInfoData: {}
  },
  subscription: {
    setup({ dispatch, history }) {}
  },

  //异步操作

  effects: {
    //获取当前用户信息
    *userInfo({ payload }, { call, put }) {
      let data = yield call(userInfo);
      yield put({
        type: "getUserInfo",
        action: data.data
      });
    },

    //添加用户
    *addUserData({ payload }, { call, put }) {
      let data = yield call(addUser, payload);
      yield put({
        type: "addUserID",
        payload: { code: data.code, msg: data.msg }
      });
    },
    //获取用户身份
    *getUserID({ payload }, { call, put }) {
      let data = yield call(userIdentity);
      if (data.code) {
        yield put({ type: "getUIdent", payload: data.data });
      }
    },

    //获取用户数据
    *getUserModel({ payload }, { call, put }) {
      let data = yield call(getUserSer);
      if (data.code) {
        yield put({ type: "getUserReducer", payload: data.data });
      }
    },

    //添加身份
    *addUserIdent({ payload }, { call, put }) {
      let data = yield call(addIdentity, payload);
      yield put({ type: "addUident", payload: data });
    },

    //添加api接口权限
    *addApimodel({ payload }, { call, put }) {
      let data = yield call(addapiSer, payload);
      yield put({ type: "addapiReducer", payload: data });
    },

    //获取视图权限

    *getView({ payload }, { call, put }) {
      let data = yield call(getViewSer);
      if (data.code) {
        yield put({ type: "getViewReducer", payload: data.data });
      }
    },

    //添加视图接口权限

    *addViewModel({ payload }, { call, put }) {
      let data = yield call(addViewSer, payload);
      yield put({ type: "addViewReudcer", payload: data });
    },

    //获取api接口权限
    *getApiModel({ payload }, { call, put }) {
      let data = yield call(getApiServer);
      if (data.code) {
        yield put({ type: "getApiReudcer", payload: data.data });
      }
    },

    //设置api接口权限

    *setApiModel({ payload }, { call, put }) {
      let data = yield call(setApiServer, payload);
      yield put({ type: "setApiReudcer", payload: data });
    },

    //给身份设置视图权限
    *setViewModel({ payload }, { call, put }) {
      let data = yield call(setViewSer, payload);
      yield put({ type: "setViewReudcer", payload: data });
    },

    //修改用户数据
    *upDataUserModel({ payload }, { call, put }) {
      let data = yield call(upDataUserSer, payload);
      yield put({ type: "upDataUserReudcer", payload: data });
    }
  },

  reducers: {
    getUserInfo(state, { action }) {
      return {
        ...state,
        userInfoData: action
      };
    },

    //添加用户
    addUserID(state, action) {
      return { ...state, addUserType: action.payload };
    },
    //获取用户身份
    getUIdent(state, action) {
      return { ...state, userIdentData: action.payload };
    },

    //修改用户数据
    upDataUserReudcer(state, action) {
      return { ...state, upDataUserData: action.payload };
    },

    //获取用户数据

    getUserReducer(state, action) {
      return { ...state, userAllData: action.payload };
    },

    //添加用户身份
    addUident(state, action) {
      return { ...state, addUIData: action.payload };
    },

    //添加api接口权限

    addapiReducer(state, action) {
      return { ...state, addApiData: action.payload };
    },

    //获取视图权限
    getViewReducer(state, action) {
      return { ...state, getViewData: action.payload };
    },

    //添加视图权限
    addViewReudcer(state, action) {
      return { ...state, addViewData: action.payload };
    },

    //获取api接口权限
    getApiReudcer(state, action) {
      return { ...state, getApiData: action.payload };
    },

    //添加身份qpi接口权限

    setApiReudcer(state, action) {
      return { ...state, setApiData: action.payload };
    },

    //给身份设置视图权限
    setViewReudcer(state, action) {
      return { ...state, setViewData: action.payload };
    }
  }
};
