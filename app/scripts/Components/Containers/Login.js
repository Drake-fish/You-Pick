import React from 'react';
import { Link } from 'react-router';

import store from '../../store';

export default React.createClass({
  getInitialState(){
    return{
      session:store.session.toJSON()
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
    console.log(store.session);
    return(
      <div className="login">
        <h3>Welcome Back!</h3>
        <form onSubmit={this.handleSubmit} className="form">
          <i className="user fa fa-user" aria-hidden="true"></i>
          <i className="lock fa fa-lock" aria-hidden="true"></i>
          <input ref="email" type="email" placeholder="Email"/>
          <input ref="password" type="password" placeholder="password"/>
          <span onClick={this.handleForgotPassword}>Lost your password?</span>
          <input className="submit" type="submit" value="Login"/>
          <h5><Link to="/register">Dont have an account?</Link></h5>
        </form>
      </div>
    );
  },
  handleForgotPassword(e){
    e.preventDefault();
    let email=this.refs.email.value;
    store.session.forgotPassword(email);
  },
  handleSubmit(e){
    e.preventDefault();
    const email=this.refs.email.value;
    const password=this.refs.password.value;
    store.session.login(email,password);
  }
});
