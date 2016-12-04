import React from 'react';
import _ from 'underscore';

import LikedAdventureItem from './likedAdventureItem';
import HatedAdventureItem from './hatedAdventureItem';


export default React.createClass({
  render(){
    console.log(this.props);
    let list=this.props.prefs;
    let likedAdventureList=[];
    let adventureNotLiked=[];
     _.mapObject(list,function(val,key){
      if(val===true){
        likedAdventureList.push(key);
      }else if(val===false){
        adventureNotLiked.push(key);
      }
    });
    let likedAdventure=likedAdventureList.map((adventure,i,arr)=>{
     return <LikedAdventureItem key={adventure} adventure={adventure}/>;
    });
    let hatedAdventure=adventureNotLiked.map((adventure,i,arr)=>{
      return<HatedAdventureItem key={adventure} adventure={adventure}/>;
    });


    return(
    <div className="preferences">
      <h2>ADVENTURE PREFERENCES</h2>
      <ul>
        <h3>Adventures I like</h3>
          {likedAdventure}
        <h3>Adventures I dont Like</h3>
          {hatedAdventure}
      </ul>
    </div>


    );
  }
});
