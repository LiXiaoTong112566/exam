import { login,userInfo,upDataUserSer,viewAuthority } from "@/services";
import { routerRedux } from "dva/router";
import { setCookie, getCookie } from "@/utils/index";
import  allAuthority  from "@/router/config"
export default {
  //命名空间
  namespace: 'login',
  //模块的状态 
  state: {
    isLogin: -1,
    userInfoz:{},
    myView: [],
    forbiddenView: [],
  },
  //订阅的状态
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        //如果不是去登录页面
        if (pathname.indexOf("/login") === -1) {
          if (!getCookie()) {
            dispatch(routerRedux.replace({
              pathname: `/login`,
              search: `?redirect=${encodeURIComponent(pathname)}`
            }))

          }

        } else {
          //如果用户去的是登录页面
          if (getCookie()) {
            dispatch(routerRedux.replace({
              pathname: `/home`,
            }))
          }
        }
        
        if (getCookie()) {
           //获取用户信息
          dispatch({
            type: 'login/userInfo'
          })
        }
      })
    },
  },

  //异步操作

  effects: {
    *login({ payload }, { call, put }) {
      let data = yield call(login, payload)
      if (data.code === 1) {
        setCookie(data.token)
      }
      yield put({ type: 'updateLogin', payload: data.code })
    },
    *userInfo({ payload }, { call, put,select }) {
      // 1. 判断用户是否已经获取用户
      let userInfoz = yield select(state=>state.login.userInfoz);
      if (Object.keys(userInfoz).length){
        return;
      }
      // 2. 获取用户信息
      let data = yield userInfo();
      yield put({
        type: 'updateUserInfo',
        payload: data.data
      })

       // 3.获取用户权限
      let authority = yield viewAuthority();
      yield put({
        type: 'updateViewAuthority',
        payload: authority.data
      })
    },
    *upDataUser({ payload }, { call, put }) {
      let data = yield call(upDataUserSer, payload)
      yield put({ type: "upDateUserDataReducer", payload: data }); //获取到的信息给state
      yield put({ type: 'userInfo'})
    },
  },

  reducers: {
    updateLogin(state, action) {
      return { ...state, isLogin: action.payload };
    },
    updateUserInfo(state, action){
      return { ...state, userInfoz: action.payload };
    },

       //修改用户信息
       upDateUserDataReducer(state, action) {
        return { ...state, userInfoz: {} };
      },
    updateViewAuthority(state, action){
     // 筛选出我拥有的路由
      let myView = [], forbiddenView = [];
     allAuthority.routes.forEach((item,index)=>{
       let obj={
         name:item.name,
         children:[]
       }

       item.children.map(value=>{
          if(action.payload.findIndex(item=>item.view_id===value.view_id)!==-1){
            //value====> {name: "router.management.view", path: "/homeowUser", view_id: "main-showUser", components: ƒ}
             obj.children.push(value)
         }else{
             forbiddenView.push(value)
         }
       })
        myView.push(obj)
     })
       return { ...state, myView,forbiddenView };
    },
  
  }

};
