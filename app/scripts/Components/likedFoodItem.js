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
      <h4>{this.props.food}</h4>
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
            store.session.addFood(this.props.food);
          },1000);
          }else{
            setTimeout(()=>{
          store.session.removeFood(this.props.food);
        },1000);
        }
  }
});
