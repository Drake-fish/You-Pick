import React from 'react';

import FoodPrefs from '../../components/FoodPrefs';
import EventPrefs from '../../components/EventPrefs';
import AdventurePrefs from '../../components/AdventurePrefs';
import store from '../../store';
import SearchBar from './searchBar';

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
  componentWillUnmount(){
    store.session.off('change update', this.updateSession);
  },
  render(){
    return(
    <div className="preferences-container">
        <SearchBar/>
        <FoodPrefs prefs={this.state.session.prefs}/>
        <AdventurePrefs prefs={this.state.session.adventure}/>
        <EventPrefs prefs={this.state.session.events}/>
   </div>
    );
  }
});
