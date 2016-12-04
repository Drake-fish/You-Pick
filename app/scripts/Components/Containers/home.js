import React from 'react';
import _ from 'underscore';
import {
    browserHistory
} from 'react-router';

import store from '../../store';
import Weather from '../weather';


export default React.createClass({
    getInitialState() {
        return {
            foodClicked:false,
            session: store.session.toJSON(),
            places: store.places.toJSON()
        }
    },
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(function(position) {
            window.localStorage.setItem('latitude', position.coords.latitude);
            window.localStorage.setItem('longitude', position.coords.longitude);
            store.session.getWeather(position.coords.latitude, position.coords.longitude);
        });

        store.session.on('change update', this.updateSession);
        store.places.on('change update', this.updatePlaces);

    },

    updateSession() {

        this.setState({
            session: store.session.toJSON()
        });
    },
    updatePlaces() {
        this.setState({
            places: store.places.toJSON()
        });
    },

    componentWillUnMount() {
        store.session.off('change update', this.updateSession);
        store.places.off('change update',this.updatePlaces);
    },


    render() {
      let FoodDiv;
        if(!this.state.foodClicked){
          FoodDiv=(
            <div onClick = {this.handleFoodChoices} className = "overlay">
                <div className = "food search">
                  <h3 className = "title"> FOOD </h3>
                </div>
            </div>
          )

        }else{
          FoodDiv=(
            <div className = "food-clicked">
                <div className = "food">
                    <div className="modal">
                      <i onClick={this.handleExit} className="fa fa-times" aria-hidden="true"></i>
                      <h3 className = "type"> I Want.. </h3>
                      <span onClick={this.handleBreakfast}>Breakfast</span>
                      <span onClick={this.handleLunch}>Lunch</span>
                      <span onClick={this.handleDinner}>Dinner</span>
                      <span onClick={this.handleFood}>You Pick</span>
                    </div>
                </div>
            </div>
          );
        }
        return ( <div className = "home">
                    <div onClick = {this.handleEvents} className = "overlay">
                        <div className = "events search">
                          <h3 className = "title"> EVENTS </h3>
                        </div>
                    </div>
                    {FoodDiv}
                    <div onClick = {this.handleAdventure} className = "overlay">
                      <div className = "random search" >
                        <h3 className = "title" > ADVENTURE < /h3>
                      </div>
                    </div>
                </div>

              );
    },
    handleExit(){
      this.setState({foodClicked:false});
    },
    handleEvents() {
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
    handleFoodChoices(){
      console.log('food clicked');
      this.setState({foodClicked:true});
    },
    handleBreakfast(){
      let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
      store.places.searchFood('breakfast', coordinates);

    },
    handleLunch(){
      let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
      store.places.searchFood('lunch', coordinates);
    },
    handleDinner(){
      let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
      store.places.searchFood('dinner', coordinates);
    },


    handleFood() {

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
    handleAdventure() {
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
