import React from 'react';
import { Link } from 'react-router';

import store from '../../store';

export default React.createClass({
  getInitialState(){
    return{
      session:store.session.toJSON(),
      loginLoading:false
    };

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
  render(){
    let login=(
      <div className="login">
        <form onSubmit={this.handleLoginSubmit} className="form">

          <h2>WELCOME</h2>
          <div className="error-message">
            <h6></h6>
            <div className="triangle"></div>
          </div>
          <i className="user fa fa-user" aria-hidden="true"></i>
          <i className="lock fa fa-lock" aria-hidden="true"></i>
          <input ref="email" type="email" placeholder="Email"/>
          <input ref="password" type="password" placeholder="password"/>
          <span onClick={this.handleForgotPassword}>Lost your password?</span>
          <input className="submit" type="submit" value="Login"/>

        </form>
      </div>
    );
    if(this.state.session.error && this.state.loginLoading){
      login=(
        <div className="login">
          <form onSubmit={this.handleLoginSubmit} className="form">
            <h2>WELCOME</h2>
            <div className="error-message error-message-open">
              <h6 className="error">{this.state.session.error.message}</h6>
              <div className="triangle"></div>
            </div>
            <i className="user fa fa-user" aria-hidden="true"></i>
            <i className="lock fa fa-lock" aria-hidden="true"></i>
            <input ref="email" type="email" placeholder="Email"/>
            <input ref="password" type="password" placeholder="password"/>
            <span onClick={this.handleForgotPassword}>Lost your password?</span>
            <div className="loader">
            <i className="fa left fa-circle" aria-hidden="true"></i>
            <i className="fa middle fa-circle" aria-hidden="true"></i>
            <i className="fa right fa-circle" aria-hidden="true"></i>
            </div>


          </form>
        </div>
      );
    }else if(this.state.forgotPassword){
      let emailAddress=this.refs.email.value;
      login=(
        <div className="login">
          <form onSubmit={this.handleLoginSubmit} className="form">
            <h2>WELCOME</h2>
            <div className="error-message error-message-open">
              <h6 className="error email"><i className="fa fa-check" aria-hidden="true"></i>Email sent to {emailAddress}</h6>
            </div>
            <i className="user fa fa-user" aria-hidden="true"></i>
            <i className="lock fa fa-lock" aria-hidden="true"></i>
            <input ref="email" type="email" placeholder="Email"/>
            <input ref="password" type="password" placeholder="password"/>
            <span onClick={this.handleForgotPassword}>Lost your password?</span>
            <input className="submit" type="submit" value="Login"/>
          </form>
        </div>
      );
    }else if(this.state.loginLoading){
      login=(
        <div className="login">
          <form onSubmit={this.handleLoginSubmit} className="form">

            <h2>WELCOME</h2>
            <div className="error-message">
              <h6></h6>
              <div className="triangle"></div>
            </div>
            <i className="user fa fa-user" aria-hidden="true"></i>
            <i className="lock fa fa-lock" aria-hidden="true"></i>
            <input ref="email" type="email" placeholder="Email"/>
            <input ref="password" type="password" placeholder="password"/>
            <span onClick={this.handleForgotPassword}>Lost your password?</span>
            <div className="loader">
            <i className="fa left fa-circle" aria-hidden="true"></i>
            <i className="fa middle fa-circle" aria-hidden="true"></i>
            <i className="fa right fa-circle" aria-hidden="true"></i>
            </div>

          </form>
        </div>
      )
    }
    return(
      <div>
        {login}
      </div>

    );

},
handleForgotPassword(){
  let email=this.refs.email.value;
  store.session.forgotPassword(email);
  this.setState({forgotPassword:true});
  window.setTimeout(()=>{
    this.setState({forgotPassword:false});
  },4000);
},
handleLoginSubmit(e){
  e.preventDefault();
  const email=this.refs.email.value;
  const password=this.refs.password.value;
  store.session.login(email,password);
  this.setState({menuOpen:false, loginLoading:true});
  window.setTimeout(()=>{
    this.setState({loginLoading:false});
  },5000);

}
});
