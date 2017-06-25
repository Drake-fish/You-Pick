import React from 'react';
import {browserHistory} from 'react-router'
import Weather from './weather';
import Nav from './Nav';


export default React.createClass({
  render(){
    return(
      <div className="header">
      
      </div>
    );
  },
  takeHome(){
    browserHistory.push('/');
  }
});
