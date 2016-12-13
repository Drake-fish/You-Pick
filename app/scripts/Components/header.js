import React from 'react';
import {browserHistory} from 'react-router'
import Weather from './weather';
import Nav from './Nav';


export default React.createClass({
  render(){
    return(
      <div className="header">
        <div onClick={this.takeHome} className="bubble">
          <h1>I DONT CARE</h1>
          <h2>YOU PICK</h2>
        </div>
      </div>
    );
  },
  takeHome(){
    browserHistory.push('/');
  }
});
