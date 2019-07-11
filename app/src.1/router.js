import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './pages/login/IndexPage';
import Home from './pages/home/index';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={IndexPage} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;