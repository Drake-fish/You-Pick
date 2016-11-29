import React from 'react';

import Header from '../header';
import Nav from '../Nav';
import store from '../../store';
import Weather from '../weather';
import Home from '../home';

export default React.createClass({

render(){
  return(
    <div id="app">
      <Header/>
      <Home/>
        {this.props.children}
    </div>
  );

}
});
