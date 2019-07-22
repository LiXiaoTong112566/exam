import {
  userUser,
  identity,
  interfaceInfo,
  relation,
  viewAuthority,
  identityViewAuthority
} from "@/services";

export default {
  namespace: "userManage",
  state: {
    //获取用户数据数据
    userDatas: [],
    //获取身份数据数据
    identityData: [],
    //获取api接口数据
    interfaceData: [],
    //展示身份和api权限关系
    relationData: [],
    //获取视图权限数据
    viewAuthorityData: [],
    //展示身份和视图权限关系
    identityViewAuthorityData: []
  },
  effects: {
    // //获取当前用户信息
    *userUsers({ payload, type }, { call, put }) {
      let data = yield call(userUser, payload);
      yield put({
        type: "upDatuserUser",
        payload: data.data
      });
    },
    //展示身份数据
    *identity({ payload, type }, { call, put }) {
      let data = yield call(identity, payload);
      yield put({
        type: "identityUser",
        payload: data.data
      });
    },
    //展示api接口权限数据
    *interface({ payload, type }, { call, put }) {
      let data = yield call(interfaceInfo, payload);
      yield put({
        type: "interfaceUser",
        payload: data.data
      });
    },
    //展示身份和api权限关系
    *relation({ payload, type }, { call, put }) {
      let data = yield call(relation, payload);
      yield put({
        type: "relationUser",
        payload: data.data
      });
    },
    //获取视图权限数据
    *viewAuthority({ payload, type }, { call, put }) {
      let data = yield call(viewAuthority, payload);
      yield put({
        type: "viewAuthorityUser",
        payload: data.data
      });
    },
    //展示身份和视图权限关系
    *identityViewAuthority({ payload, type }, { call, put }) {
      let data = yield call(identityViewAuthority, payload);
      yield put({
        type: "identityViewAuthorityUser",
        payload: data.data
      });
    }
  },

  reducers: {
    //同步当前用户信息
    upDatuserUser(state, action) {
      return { ...state, userDatas: action.payload };
    },
    //展示身份数据
    identityUser(state, action) {
      return { ...state, identityData: action.payload };
    },
    //展示api接口权限数据
    interfaceUser(state, action) {
      return { ...state, interfaceData: action.payload };
    },
    //展示身份和api权限关系
    relationUser(state, action) {
      return { ...state, relationData: action.payload };
    },
    //获取视图权限数据
    viewAuthorityUser(state, action) {
      return { ...state, viewAuthorityData: action.payload };
    },
    //展示身份和视图权限关系
    identityViewAuthorityUser(state, action) {
      return { ...state, identityViewAuthorityData: action.payload };
    }
  }
};
