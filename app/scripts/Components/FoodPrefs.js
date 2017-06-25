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
    likedFoodList.sort();
    foodNotLiked.sort();

    let likedFood=likedFoodList.map((food,i,arr)=>{
     return <LikedFoodItem key={food} food={food}/>;
    });
    let hatedFood=foodNotLiked.map((food,i,arr)=>{
      return<HatedFoodItem key={food} food={food}/>;
    });
    let addFood=(
      <div className="menu-top">
      <i onClick={this.handleExit} className="fa fa-times" aria-hidden="true"></i>

        <h3>Active Food Options</h3>
        <span onClick={this.handleAddFood} className="add-button"><i className="fa fa-plus-circle"  aria-hidden="true"></i>ADD</span>
        <form onSubmit={this.addFood} className="add-term">
        <input className="add-input" ref="add" type="text" placeholder="Add Food"/>
      </form>
      </div>
    );
   if(this.state.addFood && !this.state.success){
    addFood=(
      <div className="menu-top">
      <i onClick={this.handleExit} className="fa fa-times fa-times-open" aria-hidden="true"></i>
        <h3 className="open-add">Active Food Options</h3>
        <span onClick={this.addFood} className="add-button"><i className="fa fa-plus-circle"  aria-hidden="true"></i>ADD</span>
        <form onSubmit={this.addFood} className="add-term">
        <input className="add-input add-input-open" ref="add" type="text" placeholder="Add Food"/>
      </form>
      </div>
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
      <span className="error"><i className="fa fa-times-circle" aria-hidden="true"></i>Enter a search term</span>
    </div>
);
}

    return(
    <div id="food" className="preferences">
      <ul>
        <h2>FOOD PREFERENCES</h2>
          {addFood}
          {likedFood}
        <h3>Disabled Food Options</h3>
          {hatedFood}
      </ul>
    </div>


    );
  },
  handleExit(){
    this.setState({addFood:false,success:false});
  },
  handleAddFood(){
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
