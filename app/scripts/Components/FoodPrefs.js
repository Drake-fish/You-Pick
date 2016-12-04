import React from 'react';
import _ from 'underscore';

import LikedFoodItem from './likedFoodItem';
import HatedFoodItem from './hatedFoodItem';


export default React.createClass({
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
    let foodList=<LikedFoodItem prefs={list}/>

    return(
    <div className="preferences">
      <h2>FOOD PREFERENCES</h2>
      <ul>
        <h3>Food I like</h3>
          {likedFood}
        <h3>Food I dont Like</h3>
          {hatedFood}
      </ul>
    </div>


    );
  }
});
