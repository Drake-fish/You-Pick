import React from 'react';

import Nav from '../Nav';
import store from '../../store';
import Weather from '../weather';

export default React.createClass({

render(){
  return(
    <div id="app">
      <div className="header">
        <div className="bubble">
          <h1>I DONT CARE</h1>
          <h2>YOU PICK</h2>
        </div>
          <Nav/>
          <Weather/>
      </div>
        {this.props.children}
    </div>
  );

}
});
