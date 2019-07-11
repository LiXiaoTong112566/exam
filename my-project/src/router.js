import React from 'react';
import { Router, Route, Switch,Redirect } from 'dva/router';
import IndexPage from './pages/Home/IndexPage';
import Login from "./pages/Login/login";
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/Login" exact component={Login} />
        <Route path="/home" component={IndexPage} />
        <Redirect to="/home"></Redirect>

      </Switch>
    </Router>
  );
}

export default RouterConfig;
