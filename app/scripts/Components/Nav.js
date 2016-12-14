import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import {StickyContainer,Sticky} from 'react-sticky';

import Search from './search';
import store from '../store';
import Header from './header';

export default React.createClass({
  getInitialState(){
    return{
      menuOpen:false
    }
  },
  render(){
    let menu;
    if(this.state.menuOpen && window.localStorage.getItem('user-token')){
      menu=(
                <div className="menu">
                  <i className="fa fa-times" onClick={this.closeMenu} aria-hidden="true"></i>
                  <div className="menu-items">
                    <Link to="/"><span onClick={this.closeMenu}><i className="fa fa-home" aria-hidden="true"></i>HOME</span></Link>
                    <Link to="/preferences"><span onClick={this.closeMenu}><i className="fa fa-cog" aria-hidden="true"></i>SETTINGS</span></Link>
                    <Link to="saved"><span onClick={this.closeMenu}><i id="heart" className="fa fa-heart" aria-hidden="true"></i>FAVORITES</span></Link>
                    <span onClick={this.handleClick}><i className="fa fa-sign-in" aria-hidden="true"></i>LOG OUT</span>
                  </div>
                </div>
              );
    }else if(!this.state.menuOpen){
      menu=(<i onClick={this.openMenu} className="fa fa-bars" aria-hidden="true"></i>);
    }else if(this.state.menuOpen && !window.localStorage.getItem('user-token')){
      menu=(
                <div className="menu">
                <i className="fa fa-times" onClick={this.closeMenu} aria-hidden="true"></i>
                  <div className="menu-items">
                    <Link to="/"><span onClick={this.closeMenu}><i className="fa fa-home" aria-hidden="true"></i>HOME</span></Link>
                    <Link to="/login"><span onClick={this.closeMenu}><i className="fa fa-user-o" aria-hidden="true"></i>LOG IN</span></Link>
                    <Link to="/register"><span onClick={this.closeMenu}><i className="fa fa-sign-in" aria-hidden="true"></i>REGISTER</span></Link>
                  </div>
                </div>
              );
    }
    let nav=(
    <nav>
      <Link to="/"><i className="fa fa-home" aria-hidden="true"></i><span>Home</span></Link>
      <Link to="/preferences"><i className="fa fa-cog" aria-hidden="true"></i><span>Settings</span></Link>
      <Link to="/saved"><i id="heart" className="fa fa-heart" aria-hidden="true"></i> <span>Favorites</span></Link>
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
    <Sticky>
    <div className="nav-container">
      {menu}
      <Header/>
      <Search/>
      {nav}
    </div>
    </Sticky>
    );
  },
  handleClick(){
    this.setState({menuOpen:false});
    store.session.logout();

  },
  openMenu(){
    this.setState({menuOpen:true});
  },
  closeMenu(){
    this.setState({menuOpen:false});
  }
});
