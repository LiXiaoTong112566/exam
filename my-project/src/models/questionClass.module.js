import { questionClass, addType, add, examType, subjectType, getQuestionsType, examAdd, getQuestions } from "@/services"

export default {

	namespace: 'questionClass',

	state: {
		examTypeData: [],//添加试题考试类型数据
		subjectTypeData: [],//添加试题课程类型数据
		questionsTypeData: [],//添加试题题目类型数据
		addQuestionsFlag: 0, // 添加试题 状态
		questionClassData: [],
		examAddFlag: 0, // 添加试题的状态
		createpaperList: {},
		getQuestionsData:[]
	},
	effects: {
		//查询所有的试题类型
		*questionClass({ payload }, { call, put }) {
			// eslint-disable-line

			let data = yield call(questionClass)

			if (data.code === 1) {
				yield put({ type: "getQuestionClassData", payload: data.data });
			}
		},

		//添加试题类型
		*addType({ payload }, { call, put }) {
			// console.log(111);
			// console.log(payload);
			let newType = yield call(addType, payload);
			// console.log(newType);
			yield put({ type: "questionClass" })
		},
		//添加试题
		*add({ payload }, { call, put }) {
			let data = yield call(add, payload)

			yield put({
				type: 'updateAdd',
				action: data.code === 1 ? 1 : -1
			})
		},
		//获取考试类型
		*examType({ payload }, { call, put }) {
			let data = yield call(examType)
			yield put({
				type: 'getExamType',
				action: data.data
			})
		},
		// 获取课程类型
		*subjectType({ payload }, { call, put }) {
			let data = yield call(subjectType)
			yield put({
				type: 'getSubjectType',
				action: data.data
			});
		},
		// 获取题目类型
		*questionsType({ payload }, { call, put }) {
			let data = yield call(getQuestionsType)
			yield put({
				type: 'getQuestionsTypes',
				action: data.data
			});
		},
		//添加考试
		*examAdd({ payload }, { call, put }) {
			let data = yield call(examAdd, payload)
			console.log(data)
			localStorage.exam = JSON.stringify(data.data)
			yield put({
				type: 'getExamAdd',
				action: data.code === 1 ? 1 : -1,
				data: data.data
			})
		},
		//获取所有试题
		*getQuestions({ payload }, { call, put }){
			let data=yield call(getQuestions)
			yield put({
				type:'getQuestionsAll',
				action:data.data
			})
		}
	},

	reducers: {
		getQuestionClassData(state, action) {
			return { ...state, questionClassData: action.payload }
		},
		updateAdd(state, { action }) {
			return {
				...state,
				addQuestionsFlag: action
			};
		},
		getExamType(state, { action }) {
			return {
				...state,
				examTypeData: action
			}
		},
		getSubjectType(state, { action }) {
			return {
				...state,
				subjectTypeData: action
			};
		},
		getQuestionsTypes(state, { action }) {
			return {
				...state,
				questionsTypeData: action
			};
		},
		getExamAdd(state, { action, data }) {
			return {
				...state,
				examAddFlag: action,
				createpaperList: data
			}
		},
		getQuestionsAll(state, { action }) {
			return {
				...state,
				getQuestionsData: action
			};
		},

	},

};
