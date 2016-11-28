import React from 'react';
import store from '../store';

import Weather from './weather';
export default React.createClass({
  getInitialState(){
    return{
      session: store.session.toJSON()
    }
  },
  componentWillMount(){
    navigator.geolocation.getCurrentPosition(function(position){
      window.localStorage.setItem('latitude',position.coords.latitude);
      window.localStorage.setItem('longitude',position.coords.longitude);
      store.session.getWeather(position.coords.latitude,position.coords.longitude);
    });

    store.session.on('change update', this.updateSession );

  },
  updateSession(){

    this.setState({
      session: store.session.toJSON()
    });
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
    let latitude=window.localStorage.getItem('latitude');
    let longitude=window.localStorage.getItem('longitude');
    console.log('events');
    store.places.searchEvents('food',longitude,latitude);
  },
  handleFood(){
    console.log('food');
  },
  handleRandom(){
    console.log('random');
  }
});
