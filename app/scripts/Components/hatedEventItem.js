import React from 'react';

import store from '../store';


export default React.createClass({
  getInitialState(){
    return{
      isChecked:false
    }
  },
  render(){
    console.log(this.props);
    return(
      <div className="onoffswitch">
          <h4>{this.props.event}</h4>
          <input checked={this.state.isChecked} onChange={this.handleChange} type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id={this.props.event}/>
          <label className="onoffswitch-label" htmlFor={this.props.event}>
              <span className="onoffswitch-inner"></span>
              <span className="onoffswitch-switch"></span>
          </label>
      </div>
    );
  },
  handleChange(e){
    e.preventDefault();
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
