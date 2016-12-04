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
          <span>{this.props.food}</span>
          <input checked={this.state.isChecked} onChange={this.handleChange} type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id={this.props.food}/>
          <label className="onoffswitch-label" htmlFor={this.props.food}>
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
            store.session.addFood(this.props.food);
          },1000);
          }else{
            setTimeout(()=>{
          store.session.removeFood(this.props.food);
        },1000);
        }
  }
});
