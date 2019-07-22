import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
import IndexPage from './pages/Home/IndexPage';
import Login from "./pages/Login/Login/login";
import {connect} from 'dva';
//引入国际化
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zhCN from '@/long/zh-CN.js';
import enUS from '@/long/en-US.js';

// 配置国际化字典
const localMap = {
  en: enUS,
  zh: zhCN
}

addLocaleData([...en, ...zh]);

const mapStateToProps = state=>{
  return {
    locale: state.global.locale
  }
}
let RouterView = connect(mapStateToProps)((props)=>{
  return (
    <IntlProvider locale={props.locale} messages={localMap[props.locale]}>
      <Router history={props.history}>
        <Switch>
          <Route path="/Login" exact component={Login} />
          <Route path="/home" component={IndexPage} />
          {/* <Redirect to="/home"></Redirect> */}
          <Route path='/403' render={props=>{
               return <p>
                    <img style={{width:'100%',height:'100%'}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563717624661&di=f95c617ce719f42a02a33c79a1e62e68&imgtype=0&src=http%3A%2F%2Fs6.sinaimg.cn%2Fbmiddle%2F003Qfs1Xgy6JxwDVpf775%26690" />
               </p>      
          }}></Route>
            <Route path='/404' render={props=>{
               return <p>
                 <img style={{width:'100%',height:'100%'}} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563717322832&di=7589886f4cfccfd95367a5162db99ae5&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F21%2F75%2F82%2F55a4f2aaae0f5.jpg" />
               </p>      
          }}></Route>
        </Switch>
      </Router>
    </IntlProvider>
  );
})

function RouterConfig({ history }) {
return <RouterView history={history} />
}

export default RouterConfig;
