import React from 'react';
import {browserHistory} from 'react-router';

import Header from '../header';
import store from '../../store';
import SavedFoodSearches from './SavedFoodSearches';
import SavedAdventureSearches from './SavedAdventureSearches';
import SavedEventSearches from './SavedEventSearches';

export default React.createClass({
  getInitialState(){
    return{
      food:true,
      events:false,
      adventures:false
    };
  },

  render(){
    let savedSearches;
    if(this.state.food && !this.state.events && !this.state.adventures){
      savedSearches=(<div className="saved-searches">
                      <div className="tab-container">
                        <ul className="tabs">
                        <li onClick={this.handleEvents} className="event-tab">
                          <span>EVENTS</span>
                        </li>
                          <li className="food-tab-open">
                            <span>FOOD</span>
                          </li>
                          <li onClick={this.handleAdventures} className="adventure-tab">
                            <span>ADVENTURES</span>
                          </li>

                        </ul>
                      </div>
                      <h2>Your Food Favorites</h2>
                      <SavedFoodSearches/>
                    </div>
                    );

    }else if(!this.state.food && !this.state.events && this.state.adventures){
      savedSearches=(<div className="saved-searches">
                      <div className="tab-container">
                        <ul className="tabs">
                        <li onClick={this.handleEvents} className="event-tab">
                          <span>EVENTS</span>
                        </li>
                          <li onClick={this.handleFood} className="food-tab">
                            <span>FOOD</span>
                          </li>
                          <li className="adventure-tab-open">
                            <span>ADVENTURES</span>
                          </li>

                        </ul>
                      </div>
                      <h2>Your Adventure Favorites</h2>
                      <SavedAdventureSearches/>
                    </div>
                    );
    }else if(!this.state.food && this.state.events && !this.state.adventures){
      savedSearches=(<div className="saved-searches">
                      <div className="tab-container">
                        <ul className="tabs">
                        <li className="event-tab-open">
                          <span>EVENTS</span>
                        </li>
                          <li onClick={this.handleFood} className="food-tab">
                            <span>FOOD</span>
                          </li>
                          <li onClick={this.handleAdventures} className="adventure-tab">
                            <span>ADVENTURES</span>
                          </li>

                        </ul>
                      </div>
                      <h2>Your Event Favorites</h2>
                      <SavedEventSearches/>
                    </div>

                    );
    }
    return(
            <div className="container">
              {savedSearches}
            </div>
    );
  },
  handleFood(){

    this.setState({food:true,adventures:false,events:false});
  },
  handleAdventures(){
    this.setState({food:false,adventures:true,events:false});
  },
  handleEvents(){
    this.setState({food:false,adventures:false,events:true});
  }
});
