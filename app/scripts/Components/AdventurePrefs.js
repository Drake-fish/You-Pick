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

    let adventureHeader;
    if(!this.state.addAdventures && !this.state.success){
      adventureHeader=(
        <div className="preference-header">
          <h2><i className="fa fa-plus-circle" onClick={this.handleAddAdventure} aria-hidden="true"></i>ADVENTURE PREFERENCES</h2>

    </div>
    );
  }else if(this.state.addAdventures && !this.state.success){
    adventureHeader=(
      <div className="preference-header">
        <h2>ADVENTURE PREFERENCES</h2>
        <form onSubmit={this.addAdventure} className="add-term">
          <input ref="add" type="text" placeholder="Add Adventure"/>
          <i onClick={this.handleExit} className="fa fa-times" aria-hidden="true"></i>
        </form>
  </div>
  );
}else if(this.state.addAdventures && this.state.success===true){
  adventureHeader=(
    <div className="preference-header">
      <h2>ADVENTURE PREFERENCES</h2>
      <span className="success"><i className="fa fa-check-circle" aria-hidden="true"></i>SUCCESS!</span>
    </div>
);

}else if(this.state.addAdventures && this.state.success==='empty'){
  adventureHeader=(
    <div className="preference-header">
      <h2>ADVENTURE PREFERENCES</h2>
      <span className="error"><i className="fa fa-times-circle" aria-hidden="true"></i> Please Enter A Search Term!</span>
    </div>
);
}

    return(
    <div className="preferences">
      {adventureHeader}
      <ul>
        <h3>Adventures I like</h3>
          {likedAdventure}
        <h3>Adventures I dont Like</h3>
          {hatedAdventure}
      </ul>
    </div>
    );
  },
  handleExit(){
    this.setState({addAdventures:false,success:false});
  },
  handleAddAdventure(){
    this.setState({addAdventures:true});

  },
  addAdventure(e){
    e.preventDefault();
    let adventure=this.refs.add.value;
    if(!adventure){
      this.setState({success:'empty'});
      setTimeout(()=>{
        this.setState({success:false});
      },2000);
    }else{
    store.session.addAdventure(adventure);
    this.setState({success:true});

    setTimeout(()=>{
      this.setState({success:false, addAdventures:false});
    },2000);
    }
  }
});
