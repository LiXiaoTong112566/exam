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
               return <p>您无权访问当前页面</p>      
          }}></Route>
            <Route path='/404' render={props=>{
               return <p>xxxx</p>      
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
