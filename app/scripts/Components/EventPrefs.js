import React from 'react';
import _ from 'underscore';

import store from '../store';
import LikedEventItem from './likedEventItem';
import HatedEventItem from './hatedEventItem';


export default React.createClass({
  getInitialState(){
    return{
      addEvent:false,
      success:false
    };
  },
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
    likedEventList.sort();
    eventNotLiked.sort();
    let likedEvent=likedEventList.map((event,i,arr)=>{
     return <LikedEventItem key={event} event={event}/>;
    });
    let hatedEvent=eventNotLiked.map((event,i,arr)=>{
      return<HatedEventItem key={event} event={event}/>;
    });
    let addEvent=(
      <div className="menu-top">
      <i onClick={this.handleExit} className="fa fa-times" aria-hidden="true"></i>

        <h3>Active Event Options</h3>
        <span onClick={this.handleAddEvent} className="add-button"><i className="fa fa-plus-circle"  aria-hidden="true"></i>ADD</span>
        <form onSubmit={this.addEvent} className="add-term">
        <input className="add-input" ref="add" type="text" placeholder="Add Event"/>
      </form>
      </div>
    );
   if(this.state.addEvent && !this.state.success){
    addEvent=(
      <div className="menu-top">
      <i onClick={this.handleExit} className="fa fa-times fa-times-open" aria-hidden="true"></i>
        <h3 className="open-add">Active Event Options</h3>
        <span onClick={this.addEvent} className="add-button"><i className="fa fa-plus-circle"  aria-hidden="true"></i>ADD</span>
        <form onSubmit={this.addEvent} className="add-term">
        <input className="add-input add-input-open" ref="add" type="text" placeholder="Add Event"/>
      </form>
      </div>
  );
}else if(this.state.addEvent && this.state.success===true){
  addEvent=(
    <div className="preference-header">
      <span className="success"><i className="fa fa-check-circle" aria-hidden="true"></i>SUCCESS!</span>
    </div>
  );

}else if(this.state.addEvent && this.state.success==='empty'){
  addEvent=(
    <div className="preference-header">
      <span className="error"><i className="fa fa-times-circle" aria-hidden="true"></i>Enter a search term</span>
    </div>
  );
  }

    return(
    <div id="event" className="preferences">
      <ul>
        <h2>Event PREFERENCES</h2>
          {addEvent}
          {likedEvent}
        <h3>Disabled Event Options</h3>
          {hatedEvent}
      </ul>
    </div>
  );
},
  handleExit(){
    this.setState({addEvent:false,success:false});
  },
  handleAddEvent(){
    this.setState({addEvent:true});

  },
  addEvent(e){
    e.preventDefault();
    let event=this.refs.add.value;
    if(!event){
      this.setState({success:'empty'});
      setTimeout(()=>{
        this.setState({success:false});
      },2000);
    }else{
    store.session.addEvent(event);
    this.setState({success:true});

    setTimeout(()=>{
      this.setState({success:false, addEvent:false});
    },2000);
    }
  }

});
