import React from 'react';
import _ from 'underscore';
import store from '../store';
import { browserHistory } from 'react-router';


import Results from '../components/containers/Results';
import Weather from './weather';
export default React.createClass({
  getInitialState(){
    return{
      session: store.session.toJSON(),
      places: store.places.toJSON()
    }
  },
  componentWillMount(){
    navigator.geolocation.getCurrentPosition(function(position){
      window.localStorage.setItem('latitude',position.coords.latitude);
      window.localStorage.setItem('longitude',position.coords.longitude);
      store.session.getWeather(position.coords.latitude,position.coords.longitude);
    });

    store.session.on('change update', this.updateSession );
    store.places.on('change update', this.updatePlaces);

  },
  updateSession(){

    this.setState({
      session: store.session.toJSON()
    });
  },
  updatePlaces(){
    this.setState({
      places:store.places.toJSON()
    });
      console.log('places updated')
  },
  componentWillUnMount(){
    store.session.off('change update', this.updateSession);

  },
  render(){
    let latitude=window.localStorage.getItem('latitude');
    let longitude=window.localStorage.getItem('longitude');
    return(
      <div className="home">
        <div className="overlay">
          <div onClick={this.handleEvents} className="events search">
          </div>
          <h3 className="title">EVENTS</h3>
        </div>
        <div className="overlay">
          <div onClick={this.handleFood} className="food search">
          </div>
          <h3 className="title">FOOD</h3>
        </div>
        <div className="overlay">
          <div onClick={this.handleRandom} className="random search">
          </div>
          <h3 className="title">ADVENTURE</h3>
        </div>
     </div>

    );
  },
  handleEvents(){

  },
  handleFood(){
    let coordinates=[window.localStorage.getItem('latitude'),window.localStorage.getItem('longitude')];
    let food=this.state.session.foodPreferences;
    let mixedFood=_.shuffle(food);
    let selection=_.first(mixedFood);
    console.log(selection);
    store.places.searchFood(selection ,coordinates);
  },
  handleRandom(){
    console.log('random');
  }
});
