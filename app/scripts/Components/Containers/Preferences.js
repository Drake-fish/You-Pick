import React from 'react';

import FoodPrefs from '../../components/FoodPrefs';
import EventPrefs from '../../components/EventPrefs';
import AdventurePrefs from '../../components/AdventurePrefs';
import store from '../../store';
import SearchOptions from './SearchOptions';

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
          <ul className="preference-nav">
            <a href="#food"><li className="nav-option">Food Options</li></a>
            <a href="#adventure"><li className="nav-option">Adventure Options</li></a>
            <a href="#event"><li className="nav-option">Event Options</li></a>
          </ul>
        <FoodPrefs prefs={this.state.session.prefs}/>
        <AdventurePrefs prefs={this.state.session.adventure}/>
        <EventPrefs prefs={this.state.session.events}/>
      </div>
    );
  }
});
