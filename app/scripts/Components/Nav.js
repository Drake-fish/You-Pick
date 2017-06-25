import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';

import Search from './search';
import store from '../store';
import Bubble from './Bubble';
import Weather from './weather';
import Session from '../Models/Session';
import Login from './Containers/Login';

export default React.createClass({
  getInitialState(){
    return{
      menuOpen:false,
      loginOpen:false,
      registerOpen:false,
      searchOpen:false,
      hamburger:false,
      session:store.session.toJSON()

    }
  },
  componentWillMount(){
    store.session.on('change update', this.updateSession);
  },
  updateSession(){
  this.setState({
    session: store.session.toJSON()
  });
  },
  componentWillUnmount(){
  store.session.off('change update', this.updateSession);

  },

//new code

render(){
  let modal=(
    <div className="remove-menu-modal"></div>
  );
  let menu=(

    <div className="menu">
    <div onClick={this.takeHome} className="bubble">
      <h1>I DONT CARE</h1>
      <h2>YOU PICK</h2>
    </div>
    <form onSubmit={this.handleSubmit} className="search-form">
    <i className="fa fa-search" aria-hidden="true"></i>
      <input className="search-field" ref="searchTerm" type="text" placeholder="Search"/>
    </form>
    <div onClick={this.toggleMenu} className="hamburger-menu">
      <span className="hamburger-top"></span>
      <span className="hamburger-middle"></span>
      <span className="hamburger-bottom"></span>
      </div>
    <div className="login-menu-closed">
      <li onClick={this.toggleLogin}><i className="fa fa-user" aria-hidden="true"></i>
Login</li>
      <li onClick={this.toggleRegister}><i className="fa fa-cloud" aria-hidden="true"></i>
Register</li>
    </div>
    <div className="loggedin-menu-closed">
      <Link to="/preferences"><li> <i className="fa fa-cogs" aria-hidden="true"></i>
Settings</li></Link>
      <Link to="/saved"><li> <i className="fa fa-heart" aria-hidden="true"></i>
Favorites</li></Link>
      <li onClick={this.handleClick}><i className="fa fa-sign-out" aria-hidden="true"></i>
Logout</li>
    </div>
    </div>
  );

  if(window.localStorage.getItem('user-token') && this.state.menuOpen){
    menu=(
      <div className="menu">
      <div onClick={this.takeHome} className="bubble">
        <h1>I DONT CARE</h1>
        <h2>YOU PICK</h2>
      </div>
      <form onSubmit={this.handleSubmit} className="search-form">
      <i className="fa fa-search" aria-hidden="true"></i>
        <input className="search-field" ref="searchTerm" type="text" placeholder="Search"/>
      </form>
      <div onClick={this.toggleMenu} className="hamburger-menu">
        <span className="hamburger-top hamburger-top-open"></span>
        <span className="hamburger-middle hamburger-middle-open"></span>
        <span className="hamburger-bottom hamburger-bottom-open"></span>
        </div>
      <div className="login-menu-closed">
        <li onClick={this.toggleLogin}><i className="fa fa-user" aria-hidden="true"></i>
  Login</li>
        <li onClick={this.toggleRegister}><i className="fa fa-cloud" aria-hidden="true"></i>
  Register</li>
      </div>
      <div className="loggedin-menu-closed loggedin-menu-open">
      <Link to="/preferences"><li onClick={this.toggleMenu}> <i className="fa fa-cogs" aria-hidden="true"></i>
Settings</li></Link>
      <Link to="/saved"><li onClick={this.toggleMenu}> <i className="fa fa-heart" aria-hidden="true"></i>
Favorites</li></Link>
        <li onClick={this.handleClick}><i className="fa fa-sign-out" aria-hidden="true"></i>
  Logout</li>
      </div>
      </div>
    );
  }else if(!window.localStorage.getItem('user-token') && this.state.menuOpen){
    menu=(
    <div className="menu">
    <div onClick={this.takeHome} className="bubble">
      <h1>I DONT CARE</h1>
      <h2>YOU PICK</h2>
    </div>
    <form onSubmit={this.handleSubmit} className="search-form">
    <i className="fa fa-search" aria-hidden="true"></i>
      <input className="search-field" ref="searchTerm" type="text" placeholder="Search"/>
    </form>
    <div onClick={this.toggleMenu} className="hamburger-menu">
      <span className="hamburger-top hamburger-top-open"></span>
      <span className="hamburger-middle hamburger-middle-open"></span>
      <span className="hamburger-bottom hamburger-bottom-open"></span>
      </div>
    <div className="login-menu-closed login-menu-open">
      <li onClick={this.toggleLogin}><i className="fa fa-user" aria-hidden="true"></i>
Login</li>
      <li onClick={this.toggleRegister}><i className="fa fa-cloud" aria-hidden="true"></i>
Register</li>
    </div>
    <div className="loggedin-menu-closed">
      <li> <i className="fa fa-cogs" aria-hidden="true"></i>
Settings</li>
      <li> <i className="fa fa-heart" aria-hidden="true"></i>
Favorites</li>
      <li onClick={this.handleClick}><i className="fa fa-sign-out" aria-hidden="true"></i>
Logout</li>
    </div>
    </div>
  );
}else if(!window.localStorage.getItem('user-token') && this.state.registerOpen){
  menu=(
    <div className="menu">
    <div onClick={this.takeHome} className="bubble">
      <h1>I DONT CARE</h1>
      <h2>YOU PICK</h2>
    </div>
    <form onSubmit={this.handleSubmit} className="search-form">
    <i className="fa fa-search" aria-hidden="true"></i>
      <input className="search-field" ref="searchTerm" type="text" placeholder="Search"/>
    </form>
    <div onClick={this.toggleMenu} className="hamburger-menu">
      <span className="hamburger-top"></span>
      <span className="hamburger-middle"></span>
      <span className="hamburger-bottom"></span>
      </div>
    <div className="login-menu-closed">
      <li onClick={this.toggleLogin}><i className="fa fa-user" aria-hidden="true"></i>
    Login</li>
      <li onClick={this.toggleRegister}><i className="fa fa-cloud" aria-hidden="true"></i>
    Register</li>
    </div>
    <div className="loggedin-menu-closed">
      <li> <i className="fa fa-cogs" aria-hidden="true"></i>
    Settings</li>
      <li> <i className="fa fa-heart" aria-hidden="true"></i>
    Favorites</li>
      <li onClick={this.handleClick}><i className="fa fa-sign-out" aria-hidden="true"></i>
    Logout</li>
    </div>
  <div className="login">
  <h2>REGISTER</h2>
    <form className="form" onSubmit={this.handleRegisterSubmit}>
      <input type="text" ref="name" placeholder="Name"/>
      <input type="email" ref="email" placeholder="Email"/>
      <input type="password" ref="password" placeholder="password"/>
      <input type="password" ref="confirmPassword" placeholder="Confirm Your Password"/>
      <input className="submit" type="submit" value="Register"/>
      <span className="switch" onClick={this.switchMenu}>LOGIN</span>
    </form>

  </div>
  </div>

);
}else if(!window.localStorage.getItem('user-token') && this.state.loginOpen){
  menu=(
    <div className="menu">
    <div onClick={this.takeHome} className="bubble">
      <h1>I DONT CARE</h1>
      <h2>YOU PICK</h2>
    </div>
    <form onSubmit={this.handleSubmit} className="search-form">
    <i className="fa fa-search" aria-hidden="true"></i>
      <input className="search-field" ref="searchTerm" type="text" placeholder="Search"/>
    </form>
    <div onClick={this.toggleMenu} className="hamburger-menu">
      <span className="hamburger-top"></span>
      <span className="hamburger-middle"></span>
      <span className="hamburger-bottom"></span>
      </div>
    <div className="login-menu-closed">
      <li onClick={this.toggleLogin}><i className="fa fa-user" aria-hidden="true"></i>
    Login</li>
      <li onClick={this.toggleRegister}><i className="fa fa-cloud" aria-hidden="true"></i>
    Register</li>
    </div>
    <div className="loggedin-menu-closed">
      <li> <i className="fa fa-cogs" aria-hidden="true"></i>
    Settings</li>
      <li> <i className="fa fa-heart" aria-hidden="true"></i>
    Favorites</li>
      <li onClick={this.handleClick}><i className="fa fa-sign-out" aria-hidden="true"></i>
    Logout</li>
    </div>
    <Login/>
    </div>

   );
}
if(this.state.loginOpen || this.state.registerOpen || this.state.menuOpen){
  modal=(
    <div onClick={this.removeEverything} className="remove-menu-modal remove-menu-modal-open">
    </div>
  );

}
  return(
    <div className="nav-bar">
    <div className="bar">
    </div>
      {modal}
      {menu}
    </div>
  );
},
handleClick(){
  this.setState({menuOpen:false});
  store.session.logout();

},
toggleRegister(){
  this.setState({registerOpen:!this.state.registerOpen, menuOpen:false});
},
toggleLogin(){
  this.setState({loginOpen:!this.state.loginOpen, menuOpen:false});

},
removeEverything(){
  this.setState({loginOpen:false,registerOpen:false,menuOpen:false});
},
switchMenu(){
  this.setState({loginOpen:!this.state.loginOpen, registerOpen:!this.state.registerOpen});
},
toggleMenu(){
  this.setState({menuOpen:!this.state.menuOpen, hamburger:!this.state.hamburger});
  if(this.state.loginOpen || this.state.registerOpen){
    this.setState({loginOpen:false, registerOpen:false});
  }
},
handleRegisterSubmit(e){
  e.preventDefault();
  const name= this.refs.name.value;
  const email= this.refs.email.value;
  const password= this.refs.password.value;
  const confirmPassword= this.refs.confirmPassword.value;
  if(store.session.validatePassword(password,confirmPassword)){
    store.session.register(name,email,password);
  }else{
    console.log('passwords do not match');
  }
  this.setState({menuOpen:false});
},

handleSubmit(e){
  this.setState({searchOpen:false});
  e.preventDefault();
  let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
  let searchTerm=this.refs.searchTerm.value;
  store.places.searchAnything(searchTerm);
  this.refs.searchTerm.value='';
},
takeHome(){
  browserHistory.push('/');
}
});
