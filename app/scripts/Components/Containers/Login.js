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
componentWillUnMount(){
  store.session.off('change update', this.updateSession);

},
  render(){
    console.log(store.session);
    return(
      <div className="login">
        <h3>Welcome Back!</h3>
        <form onSubmit={this.handleSubmit} className="login-form">
          <input ref="email" type="email" placeholder="Email"/>
          <input ref="password" type="password" placeholder="password"/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  },
  handleSubmit(e){
    console.log('login');
    e.preventDefault();
    const email=this.refs.email.value;
    const password=this.refs.password.value;
    store.session.login(email,password);
  }
})
