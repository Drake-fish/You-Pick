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
    let likedEvent=likedEventList.map((event,i,arr)=>{
     return <LikedEventItem key={event} event={event}/>;
    });
    let hatedEvent=eventNotLiked.map((event,i,arr)=>{
      return<HatedEventItem key={event} event={event}/>;
    });
    let addEvent;
    if(!this.state.addEvent && !this.state.success){
      addEvent=(
          <span onClick={this.handleAddEvent} className="add-button"><i className="fa fa-plus-circle"  aria-hidden="true"></i>ADD</span>
    );
    }else if(this.state.addEvent && !this.state.success){
    addEvent=(
        <form onSubmit={this.addEvent} className="add-term">
          <input className="add-input" ref="add" type="text" placeholder="Add Event"/>
          <i className="fa fa-plus-circle" id="submit-food" onClick={this.addEvent} aria-hidden="true"></i>
          <i onClick={this.handleExit} className="fa fa-times" aria-hidden="true"></i>
        </form>
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
      <span className="error"><i className="fa fa-times-circle" aria-hidden="true"></i> Please Enter A Search Term!</span>
    </div>
    );
    }


    return(
    <div id="event-preferences" className="preferences">
      <ul>
        <h2>EVENT PREFERENCES</h2>
        <h3>Events I Like {addEvent}</h3>
          {likedEvent}
        <h3>Events I Dont Like</h3>
          {hatedEvent}
      </ul>
    </div>


    );
  },
  handleExit(e){
    e.preventDefault();
    this.setState({addEvent:false,success:false});
  },
  handleAddEvent(e){
    e.preventDefault();
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
