import { room,subject,grade,gradeClass,update,deleteD} from '@/services'

export default {
  namespace: 'GradeManageData',

  state: {
    //获取所有教室号
    roomData: [],
    //获取所有班级
    subjectData:[],
    //添加班级接口
    gradeData:-1,
    //获取已经分配教室的班级
    gradeClassData:[],
    //xiug数组
    gradepayload:[],
    //gengxnzhuangt
    upDedata:-1

  },
  effects: {
    //获取全部教室
    *roomD({ payload }, { call, put }) {
      let data = yield call(room,payload);
      yield put({
        type: 'roomInfo',
        payload: data.data
      });
    },
    //获取所有课程
    *subject({ payload }, { call, put }) {
        let data = yield call(subject,payload);
        yield put({
          type: 'subjectInfo',
          payload: data.data
        });
      },
      //添加班级接口
      *grade({ payload }, { call, put }) {
        let data = yield call(grade,payload);
        yield put({
          type: 'gradeInfo',
          payload: data.code
        });
      },
      //获取已经分配教室的班级
      *gradeClass({ payload }, { call, put }) {
        let data = yield call(gradeClass,payload);
        yield put({
          type: 'gradeClassInfo',
          payload: data.data
        });
      },
       //更新班级信息(看数组)
       *update({ payload }, { call, put }) {
        let data = yield call(update,payload);
        yield put({
          type: 'updateInfo',
          payload: data.data,
          padyCode:data.code
        });
      },
       //删除班级接口
       *deleteD({ payload }, { call, put }) {
        let data = yield call(deleteD,payload);
        // yield put({
        //   type: 'deleteDInfo',
        //   payload: data
        // });
      },
  },


  reducers: {
    //获取所有教师号
    roomInfo(state, action ) {
      return {...state, roomData: action.payload};
    },
    //获取所有课程
    subjectInfo(state, action ) {
      return {...state, subjectData: action.payload};
    },
    //添加班级接口
    gradeInfo(state, action ) {
      return {...state, gradeData: action.payload};
    },
    //获取已经分配教室的班级
    gradeClassInfo(state, action ) {
      return {...state, gradeClassData: action.payload};
    },
    //更新班级信息
    updateInfo(state, action ) {
      return {...state, gradeClassData: action.payload,upDedata:action.padyCode};
    },
    //删除班级接口
    deleteDInfo(state, action ) {
      return {...state, gradeClassData: action.payload};
    },
  }
}