import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './components/containers/App';
import Home from './components/home';
import Login from './components/containers/Login';
import Register from './components/containers/Register';


const router=(
  <Router history= {browserHistory}>
        <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
    </Route>
  </Router>
);

export default router;
