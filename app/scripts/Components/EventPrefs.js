import React from 'react';
import _ from 'underscore';

import LikedEventItem from './likedEventItem';
import HatedEventItem from './hatedEventItem';


export default React.createClass({
  render(){
    console.log(this.props);
    let list=this.props.prefs;
    let likedEventList=[];
    let eventNotLiked=[];
     _.mapObject(list,function(val,key){
      if(val===true){
        likedEventList.push(key);
      }else if(val===false){
        eventNotLiked.push(key);
      }
    });
    let likedEvent=likedEventList.map((event,i,arr)=>{
     return <LikedEventItem key={event} event={event}/>;
    });
    let hatedEvent=eventNotLiked.map((event,i,arr)=>{
      return<HatedEventItem key={event} event={event}/>;
    });


    return(
    <div className="preferences">
      <h2>EVENT PREFERENCES</h2>
      <ul>
        <h3>Events I like</h3>
          {likedEvent}
        <h3>Events I dont Like</h3>
          {hatedEvent}
      </ul>
    </div>


    );
  }
});
