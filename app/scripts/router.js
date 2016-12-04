import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import foodResults from './components/containers/foodResults';
import adventureResults from './components/containers/adventureResults';
import eventResults from './components/containers/eventResults';
import App from './components/containers/App';
import Home from './components/containers/home';
import Login from './components/containers/Login';
import Register from './components/containers/Register';
import Preferences from './components/containers/Preferences';


const router=(
  <Router history= {browserHistory}>
        <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='/foodresults' component={foodResults}/>
        <Route path='/adventureresults' component={adventureResults}/>
        <Route path='/eventresults' component={eventResults}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/preferences' component={Preferences}/>
    </Route>
  </Router>
);

export default router;
