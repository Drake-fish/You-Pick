import React from 'react';
import _ from 'underscore';

import LikedAdventureItem from './likedAdventureItem';
import HatedAdventureItem from './hatedAdventureItem';
import store from '../store';


export default React.createClass({
  getInitialState(){
    return{
      addAdventures:false,
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
    let likedAdventure=likedAdventureList.map((adventure,i,arr)=>{
     return <LikedAdventureItem key={adventure} adventure={adventure}/>;
    });
    let hatedAdventure=adventureNotLiked.map((adventure,i,arr)=>{
      return<HatedAdventureItem key={adventure} adventure={adventure}/>;
    });

    let addAdventure;
    if(!this.state.addAdventures && !this.state.success){
      addAdventure=(
          <span onClick={this.handleAddAdventure} className="add-button"><i className="fa fa-plus-circle"  aria-hidden="true"></i>ADD</span>
    );
  }else if(this.state.addAdventures && !this.state.success){
    addAdventure=(
        <form onSubmit={this.addAdventure} className="add-term">
          <input className="add-input" ref="add" type="text" placeholder="Add Adventure"/>
          <i className="fa fa-plus-circle" id="submit-food" onClick={this.addAdventure} aria-hidden="true"></i>
          <i onClick={this.handleExit} className="fa fa-times" aria-hidden="true"></i>
        </form>
  );
}else if(this.state.addAdventures && this.state.success===true){
  addAdventure=(
    <div className="preference-header">
      <span className="success"><i className="fa fa-check-circle" aria-hidden="true"></i>SUCCESS!</span>
    </div>
);

}else if(this.state.addAdventures && this.state.success==='empty'){
  addAdventure=(
    <div className="preference-header">
      <span className="error"><i className="fa fa-times-circle" aria-hidden="true"></i> Please Enter A Search Term!</span>
    </div>
);
}

    return(
    <div className="preferences">
      <h2>ADVENTURE PREFERENCES</h2>
        <h3>Adventures I Like {addAdventure}</h3>
          {likedAdventure}
        <h3>Adventures I Dont Like</h3>
          {hatedAdventure}
    </div>
    );
  },
  handleExit(){
    this.setState({addAdventures:false,success:false});
  },
  handleAddAdventure(){
    console.log('adding-adventure');
    this.setState({addAdventures:true});

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
      this.setState({success:false, addAdventures:false});
    },1000);
    }
  }
});
