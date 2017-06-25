import React from 'react';

import store from '../store';


export default React.createClass({
  getInitialState(){
    return{
      isChecked:true
    }
  },
  render(){
    console.log(this.props);
    return(
      <div className="liked-item">
      <h4>{this.props.event}</h4>
      <label className="switch">
  <input checked={this.state.isChecked} onChange={this.handleChange}
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
            store.session.addEvent(this.props.event);
          },1000);
          }else{
            setTimeout(()=>{
          store.session.removeEvent(this.props.event);
        },1000);
        }
  }
});
