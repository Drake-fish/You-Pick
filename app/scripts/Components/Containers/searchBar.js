import React from 'react';
import _ from 'underscore';

import store from '../../store';

export default React.createClass({
  getInitialState(){
    return{
      session:store.session.toJSON(),
      places:store.places.toJSON()
    };
  },
  componentWillMount(){
    store.session.on('update change', this.updateSession);
    store.places.on('update change', this.updatePlaces);
  },
  componentWillUnmount(){
    store.session.off('update change', this.updateSession);
    store.places.off('update change', this.updatePlaces);
  },
  updateSession(){
    this.setState({session:store.session.toJSON()});
  },
  updatePlaces(){
    this.setState({places:store.places.toJSON()});
  },

  render(){
    return(
      <div className="searchBar">
        <div onClick={this.handleEvents} className="event-bar">
          <h4>EVENTS</h4>
        </div>
        <div onClick={this.handleFood} className="food-bar">
          <h4>FOOD</h4>
        </div>
        <div onClick={this.handleAdventures} className="adventure-bar">
          <h4>ADVENTURE</h4>
        </div>
      </div>
    );
  },
  handleEvents(){
    console.log(this.state);
    let prefs = this.state.session.events;
    if (prefs) {
        let trueEvents = [];
        _.mapObject(prefs, function(val, key) {
            if (val === true) {
                trueEvents.push(key);
            }
        });
        let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
        let mixedFood = _.shuffle(trueEvents);
        let selection = _.first(mixedFood);
        console.log(selection);
        store.places.getEvents(selection);
    } else {
        let trueEvents = ['Attraction', 'Comedy', 'Festival_Parades', 'Holiday', 'Film', 'Music', 'Singles_social', 'Sports'];
        let mixedEvents = _.shuffle(trueEvents);
        let selection = _.first(mixedEvents);
        console.log(selection);
        store.places.getEvents(selection);
    }

  },
  handleFood(){
    let prefs = this.state.session.prefs;
    if (prefs) {
        let trueFoods = [];
        _.mapObject(prefs, function(val, key) {
            if (val === true) {
                trueFoods.push(key);
            }
        });
        let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
        let mixedFood = _.shuffle(trueFoods);
        let selection = _.first(mixedFood);
        console.log(selection);
        store.places.searchFood(selection, coordinates);
    } else {
        let trueFoods = ['american', 'bbq', 'burgers', 'cafes', 'chicken', 'mexican', 'chinese', 'pizza', 'italian', 'comfortfood', 'deli', 'diners', 'french', 'german', 'greek', 'asian', 'indian', 'tacos', 'salad', 'soup', 'spanish', 'texmex', 'steakhouse', 'foodtrucks'];
        let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
        let mixedFood = _.shuffle(trueFoods);
        let selection = _.first(mixedFood);
        console.log(selection);
        store.places.searchFood(selection, coordinates);
    }

  },
  handleAdventures(){
    let prefs = this.state.session.adventure;

    if (prefs) {
        let weather = window.localStorage.getItem('description');
        let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
        console.log('loggedin');
        let trueAdventures = [];
        if (weather.includes('rain')) {
            console.log('its raining');
            _.mapObject(prefs, function(val, key) {
                if (key.match(/^(arcades|Spas|Coffee|Bowling|escape|Aquariums|Lasertag|Movies|Bingo|shopping|Wineries|Breweries|Bookstores|Bars)$/) && val === true) {
                    trueAdventures.push(key);
                }
            });
            let mixedAdventures = _.shuffle(trueAdventures);
            let selection = _.first(mixedAdventures);
            console.log('rain ' + selection);
            store.places.searchAdventure(selection, coordinates);
        } else {
            _.mapObject(prefs, function(val, key) {
                if (val === true) {
                    trueAdventures.push(key);
                    console.log(key);
                }
            });
            let mixedAdventures = _.shuffle(trueAdventures);
            let selection = _.first(mixedAdventures);
            console.log('not raining ' + selection);
            store.places.searchAdventure(selection, coordinates);
        }
    } else {
      let weather=window.localStorage.getItem('description');
        if (weather.includes('rain')) {
            let trueAdventures = ['Arcades', 'Bars', 'Bingo', 'Bookstores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Aquariums', 'Breweries', 'GoKarts', 'Movies', 'Wineries'];
            let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
            let mixedAdventures = _.shuffle(trueAdventures);
            let selection = _.first(mixedAdventures);
            console.log(selection);
            store.places.searchAdventure(selection, coordinates);
        } else {
            let trueAdventures = ['Arcades', 'Bars', 'Bingo', 'BookStores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Amusement', 'Aquariums', 'BikeRentals', 'Breweries', 'Canoeing', 'GoKarts', 'Kayaking', 'Hiking', 'Minigolf', 'Movies', 'PaddleBoarding', 'Paintball', 'Tours', 'Swimming', 'Tubing', 'Ziplining', 'Zoos', 'Wineries', ];
            let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
            let mixedAdventures = _.shuffle(trueAdventures);
            let selection = _.first(mixedAdventures);
            console.log(selection);
            store.places.searchAdventure(selection, coordinates);
        }
    }
}

});
