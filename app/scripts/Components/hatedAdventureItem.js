import React from 'react';

import store from '../store';


export default React.createClass({
  getInitialState(){
    return{
      isChecked:false
    }
  },
  render(){
    return(
  <div className="liked-item">
      <h4>{this.props.adventure}</h4>
      <label className="switch">
  <input onChange={this.handleChange}
type="checkbox"/>
  <div className="slider round"></div>
</label>
  </div>
    );
  },
  handleChange(){
    this.setState({isChecked:!this.state.isChecked});
    if(this.state.isChecked===false){
      setTimeout(()=>{
      store.session.addAdventure(this.props.adventure);
    },1000);
    }else{
      setTimeout(()=>{
    store.session.removeAdventure(this.props.adventure);
  },1000);
  }
  }
});
