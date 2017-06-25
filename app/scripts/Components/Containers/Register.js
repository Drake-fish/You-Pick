import React from 'react';
import { Link } from 'react-router';

import store from '../../store';

export default React.createClass({
  getInitialState(){
    return{
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
  render(){
    return(
      <div className="login">
        <h3>Create an Account</h3>
        <form className="form" onSubmit={this.handleSubmit}>
          <input type="text" ref="name" placeholder="Name"/>
          <input type="email" ref="email" placeholder="Email"/>
          <input type="password" ref="password" placeholder="password"/>
          <input type="password" ref="confirmPassword" placeholder="Confirm Your Password"/>
          <input className="submit" type="submit" value="Register"/>
          <h5> <Link to="/login">Already Have an account?</Link></h5>
        </form>

      </div>
    );
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
  }
});
