export default {
    // 命名空间
    namespace: 'global',
  
    // 模块的状态
    state: {
      locale: navigator.language.indexOf('zh')!=-1?'zh':'en'
    },
  
    // 同步操作
    reducers: {
      updateLocale(state, action) {
        return { ...state, locale: action.payload };
      },
    }
  };