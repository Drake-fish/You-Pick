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
    let eventHeader;
    if(!this.state.addEvent && !this.state.success){
      eventHeader=(
        <div className="preference-header">
          <h2><i className="fa fa-plus-circle" onClick={this.handleAddEvent} aria-hidden="true"></i>EVENT PREFERENCES</h2>

    </div>
    );
  }else if(this.state.addEvent && !this.state.success){
    eventHeader=(
      <div className="preference-header">
        <h2>EVENT PREFERENCES</h2>

        <form onSubmit={this.addEvent} className="add-term">
          <input ref="add" type="text" placeholder="Add Event"/>
          <i onClick={this.handleExit} className="fa fa-times" aria-hidden="true"></i>
        </form>
  </div>
  );
}else if(this.state.addEvent && this.state.success===true){
  eventHeader=(
    <div className="preference-header">
      <h2>EVENT PREFERENCES</h2>
      <span className="success"><i className="fa fa-check-circle" aria-hidden="true"></i>SUCCESS!</span>
    </div>
);

}else if(this.state.addEvent && this.state.success==='empty'){
  eventHeader=(
    <div className="preference-header">
      <h2>EVENT PREFERENCES</h2>
      <span className="error"><i className="fa fa-times-circle" aria-hidden="true"></i> Please Enter A Search Term!</span>
    </div>
);
}


    return(
    <div className="preferences">
      {eventHeader}
      <ul>
        <h3>Events I like</h3>
          {likedEvent}
        <h3>Events I dont Like</h3>
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
