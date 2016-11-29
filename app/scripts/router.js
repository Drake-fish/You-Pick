import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Results from './components/containers/Results';
import App from './components/containers/App';
import Home from './components/home';
import Login from './components/containers/Login';
import Register from './components/containers/Register';


const router=(
  <Router history= {browserHistory}>
        <Route path='/' component={App}>
        <Route path='/results' component={Results}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
    </Route>
  </Router>
);

export default router;
