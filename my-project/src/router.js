import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './pages/Home/IndexPage';
import Login from "./pages/Login/login";
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home"  component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
