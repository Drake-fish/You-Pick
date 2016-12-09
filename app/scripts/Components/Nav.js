import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import {StickyContainer,Sticky} from 'react-sticky';

import Search from './search';
import store from '../store';

export default React.createClass({
  render(){
    let nav=(
    <nav>
      <Link to="/"><i className="fa fa-home" aria-hidden="true"></i><span>Home</span></Link>
      <Link to="/preferences"><i className="fa fa-cog" aria-hidden="true"></i><span>Settings</span></Link>
      <Link to="/saved"><i id="heart" className="fa fa-bookmark" aria-hidden="true"></i> <span>Saved</span></Link>
      <Link onClick={this.handleClick}><i className="fa fa-sign-in" aria-hidden="true"></i><span>Logout</span></Link>
    </nav>
  );

    if(!window.localStorage.getItem('user-token')){
      nav=(
        <nav className="login-menu">
          <Link to="/"><i className="fa fa-home" aria-hidden="true"></i><span>Home</span></Link>
          <Link to="/login"><i className="fa fa-user-o" aria-hidden="true"></i><span>Login</span></Link>
          <Link to="/Register"><i className="fa fa-sign-in" aria-hidden="true"></i><span>Register</span></Link>
        </nav>
      );
    }
    return(
    <Sticky topOffset={400}>
    <div className="nav-container">
      <Search/>
      {nav}
    </div>
    </Sticky>
    );
  },
  handleClick(){
    store.session.logout();
  }
});
