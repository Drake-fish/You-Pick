import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import Search from './search';
import store from '../store';
import Bubble from './bubble';
import Nav from './Nav';
import Weather from './weather';

export default React.createClass({
  render(){
    return(
      <div className="header">
      <Nav/>
      </div>
    );
  }
});
