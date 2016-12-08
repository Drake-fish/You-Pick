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
    let foodHeader;
    if(!this.state.addFood && !this.state.success){
      foodHeader=(
        <div className="preference-header">
          <h2><i className="fa fa-plus-circle" onClick={this.handleAddFood} aria-hidden="true"></i>FOOD PREFERENCES</h2>

    </div>
    );
  }else if(this.state.addFood && !this.state.success){
    foodHeader=(
      <div className="preference-header">
        <h2>FOOD PREFERENCES</h2>

        <form onSubmit={this.addFood} className="add-term">
          <input ref="add" type="text" placeholder="Add Food"/>
          <i onClick={this.handleExit} className="fa fa-times" aria-hidden="true"></i>
        </form>
  </div>
  );
}else if(this.state.addFood && this.state.success===true){
  foodHeader=(
    <div className="preference-header">
      <h2>FOOD PREFERENCES</h2>
      <span className="success"><i className="fa fa-check-circle" aria-hidden="true"></i>SUCCESS!</span>
    </div>
);

}else if(this.state.addFood && this.state.success==='empty'){
  foodHeader=(
    <div className="preference-header">
      <h2>FOOD PREFERENCES</h2>
      <span className="error"><i className="fa fa-times-circle" aria-hidden="true"></i> Please Enter A Search Term!</span>
    </div>
);
}

    return(
    <div className="preferences">
      {foodHeader}
      <ul>
        <h3>Food I like</h3>
          {likedFood}
        <h3>Food I dont Like</h3>
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
