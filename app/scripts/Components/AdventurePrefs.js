import React from 'react';
import _ from 'underscore';

import LikedAdventureItem from './likedAdventureItem';
import HatedAdventureItem from './hatedAdventureItem';
import store from '../store';


export default React.createClass({
  getInitialState(){
    return{
      addAdventure:false,
      success:false
    }
  },
  render(){
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
    likedAdventureList.sort();
    adventureNotLiked.sort();
    let likedAdventure=likedAdventureList.map((adventure,i,arr)=>{
     return <LikedAdventureItem key={adventure} adventure={adventure}/>;
    });
    let hatedAdventure=adventureNotLiked.map((adventure,i,arr)=>{
      return<HatedAdventureItem key={adventure} adventure={adventure}/>;
    });

    let addAdventure=(
      <div className="menu-top">
      <i onClick={this.handleExit} className="fa fa-times" aria-hidden="true"></i>

        <h3>Active Adventure Options</h3>
        <span onClick={this.handleAddAdventure} className="add-button"><i className="fa fa-plus-circle"  aria-hidden="true"></i>ADD</span>
        <form onSubmit={this.addAdventure} className="add-term">
        <input className="add-input" ref="add" type="text" placeholder="Add Adventure"/>
      </form>
      </div>
    );
   if(this.state.addAdventure && !this.state.success){
    addAdventure=(
      <div className="menu-top">
      <i onClick={this.handleExit} className="fa fa-times fa-times-open" aria-hidden="true"></i>
        <h3 className="open-add">Active Adventure Options</h3>
        <span onClick={this.addAdventure} className="add-button"><i className="fa fa-plus-circle"  aria-hidden="true"></i>ADD</span>
        <form onSubmit={this.addAdventure} className="add-term">
        <input className="add-input add-input-open" ref="add" type="text" placeholder="Add Adventure"/>
      </form>
      </div>
  );
}else if(this.state.addAdventure && this.state.success===true){
  addAdventure=(
    <div className="preference-header">
      <span className="success"><i className="fa fa-check-circle" aria-hidden="true"></i>SUCCESS!</span>
    </div>
  );

}else if(this.state.addAdventure && this.state.success==='empty'){
  addAdventure=(
    <div className="preference-header">
      <span className="error"><i className="fa fa-times-circle" aria-hidden="true"></i>Enter a search term</span>
    </div>
  );
  }

    return(
    <div id="adventure" className="preferences">
      <ul>
        <h2>ADVENTURE PREFERENCES</h2>
          {addAdventure}
          {likedAdventure}
        <h3>Disabled Adventure Options</h3>
          {hatedAdventure}
      </ul>
    </div>
  );
},
  handleExit(){
    this.setState({addAdventure:false,success:false});
  },
  handleAddAdventure(){
    console.log('adding-adventure');
    this.setState({addAdventure:true});

  },
  addAdventure(e){
    e.preventDefault();
    let adventure=this.refs.add.value;
    if(!adventure){
      this.setState({success:'empty'});
      setTimeout(()=>{
        this.setState({success:false});
      },1000);
    }else{
    store.session.addAdventure(adventure);
    this.setState({success:true});

    setTimeout(()=>{
      this.setState({success:false, addAdventure:false});
    },1000);
    }
  }
});
