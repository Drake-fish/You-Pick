import React from 'react';
import _ from 'underscore';

import store from '../store';
import LikedFoodItem from './likedFoodItem';
import HatedFoodItem from './hatedFoodItem';


export default React.createClass({
  getInitialState(){
    return{
      addFood:false,
      success:false
    }
  },
  render(){
    console.log(this.props);
    let list=this.props.prefs;
    let likedFoodList=[];
    let foodNotLiked=[];
     _.mapObject(list,function(val,key){
      if(val===true){
        likedFoodList.push(key);
      }else if(val===false){
        foodNotLiked.push(key);
      }
    });
    let likedFood=likedFoodList.map((food,i,arr)=>{
     return <LikedFoodItem key={food} food={food}/>;
    });
    let hatedFood=foodNotLiked.map((food,i,arr)=>{
      return<HatedFoodItem key={food} food={food}/>;
    });
    let addFood;
    if(!this.state.addFood && !this.state.success){
      addFood=(
          <span onClick={this.handleAddFood} className="add-button"><i className="fa fa-plus-circle"  aria-hidden="true"></i>ADD</span>
    );
  }else if(this.state.addFood && !this.state.success){
    addFood=(
        <form onSubmit={this.addFood} className="add-term">
          <input className="add-input" ref="add" type="text" placeholder="Add Food"/>
          <i className="fa fa-plus-circle" id="submit-food" onClick={this.addFood} aria-hidden="true"></i>
          <i onClick={this.handleExit} className="fa fa-times" aria-hidden="true"></i>
        </form>
  );
}else if(this.state.addFood && this.state.success===true){
  addFood=(
    <div className="preference-header">
      <span className="success"><i className="fa fa-check-circle" aria-hidden="true"></i>SUCCESS!</span>
    </div>
);

}else if(this.state.addFood && this.state.success==='empty'){
  addFood=(
    <div className="preference-header">
      <span className="error"><i className="fa fa-times-circle" aria-hidden="true"></i> Please Enter A Search Term!</span>
    </div>
);
}

    return(
    <div className="preferences">
      <ul>
        <h2>FOOD PREFERENCES</h2>
        <h3>Food I Like {addFood}</h3>
          {likedFood}
        <h3>Food I Dont Like</h3>
          {hatedFood}
      </ul>
    </div>


    );
  },
  handleExit(e){
    e.preventDefault();
    this.setState({addFood:false,success:false});
  },
  handleAddFood(e){
    e.preventDefault();
    this.setState({addFood:true});

  },
  addFood(e){
    e.preventDefault();
    let food=this.refs.add.value;
    if(!food){
      this.setState({success:'empty'});
      setTimeout(()=>{
        this.setState({success:false});
      },2000);
    }else{
    store.session.addFood(food);
    this.setState({success:true});

    setTimeout(()=>{
      this.setState({success:false, addFood:false});
    },2000);
    }
  }
});
