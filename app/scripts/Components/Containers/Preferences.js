import React from 'react';

import FoodPrefs from '../../components/FoodPrefs';
import EventPrefs from '../../components/EventPrefs';
import AdventurePrefs from '../../components/AdventurePrefs';
import store from '../../store';

export default React.createClass({
  getInitialState(){
    return{
    session:store.session.toJSON()
    };
  },
  componentWillMount(){
    store.session.on('change update', this.updateSession );
  },
  updateSession(){

    this.setState({
      session: store.session.toJSON()
    });
  },
  render(){
    return(
    <div className="preferences-container">
        <FoodPrefs prefs={this.state.session.prefs}/>
        <AdventurePrefs prefs={this.state.session.adventure}/>
        <EventPrefs prefs={this.state.session.events}/>
   </div>
    );
  }
});
