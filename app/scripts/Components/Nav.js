import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import store from '../store';

export default React.createClass({
  render(){
    let nav=(
    <nav>
      <Link to="/"><i className="fa fa-home" aria-hidden="true"></i>Home</Link>
      <Link to="/preferences"><i className="fa fa-cog" aria-hidden="true"></i>Settings</Link>
      <Link onClick={this.handleClick}><i className="fa fa-sign-in" aria-hidden="true"></i>Logout</Link>
    </nav>
  );

    if(!window.localStorage.getItem('user-token')){
      nav=(
        <nav>
          <Link to="/"><i className="fa fa-home" aria-hidden="true"></i>Home</Link>
          <Link to="/login"><i className="fa fa-user-o" aria-hidden="true"></i>Login</Link>
          <Link to="/Register"><i className="fa fa-sign-in" aria-hidden="true"></i>Register</Link>
        </nav>
      );
    }
    return(
    <div className="nav-container">
      {nav}
    </div>
    );
  },
  handleClick(){
    store.session.logout();
  }
});
