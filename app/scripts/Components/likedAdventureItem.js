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
      <div className="onoffswitch">
          <span>{this.props.adventure}</span>
          <input checked={this.state.isChecked} onChange={this.handleChange} type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id={this.props.adventure}/>
          <label className="onoffswitch-label" htmlFor={this.props.adventure}>
              <span className="onoffswitch-inner"></span>
              <span className="onoffswitch-switch"></span>
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
