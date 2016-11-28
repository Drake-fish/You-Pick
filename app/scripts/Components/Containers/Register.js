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
componentWillUnMount(){
  store.session.off('change update', this.updateSession);

},
  render(){
    console.log(store);
    return(
      <div className="register">
        <h3> Lets get to know you a little better!</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref="name" placeholder="Name"/>
          <input type="email" ref="email" placeholder="Email"/>
          <input type="password" ref="password" placeholder="password"/>
          <input type="password" ref="confirmPassword" placeholder="Confirm Your Password"/>
          <input type="submit" value="Register"/>
        </form>
        <span> Already Have an account? <Link to="/login">Login</Link></span>
      </div>
    );
  },
  handleSubmit(e){
    console.log('registering');
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
