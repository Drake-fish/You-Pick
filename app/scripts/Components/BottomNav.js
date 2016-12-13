import React from 'react';
import _ from 'underscore';

import store from '../store';

export default React.createClass({
  getInitialState(){
    return{
      searchOpen:false,
      food:false,
      loading:false,
      session:store.session.toJSON(),
      places:store.places.toJSON()
    };
  },
    componentWillMount(){

            store.session.on('change update', this.updateSession);
            store.places.on('change update', this.updatePlaces);
          },
        componentWillUnmount(){
          store.session.off('change update', this.updateSession);
          store.places.off('change update', this.updatePlaces);

        },

        updateSession() {

            this.setState({
                session: store.session.toJSON()
            });
        },
        updatePlaces() {
            this.setState({
                places: store.places.toJSON(),
                loading:false
            });
        },

        componentWillUnMount() {
            store.session.off('change update', this.updateSession);
            store.places.off('change update',this.updatePlaces);
        },
  render(){
    let menu;
    if(!this.state.searchOpen && !this.state.food && !this.state.loading){
      menu=(
          <ul>
            <li onClick={this.handleSearch} className="nav-item">
              <i className="fa fa-search" aria-hidden="true"></i>
              <span>SEARCH</span>
            </li>
            <li onClick={this.handleEvents} className="nav-item">
              <i className="fa fa-users" aria-hidden="true"></i>
              <span>EVENTS</span>
            </li>
            <li onClick={this.openFood} className="nav-item">
              <i className="fa fa-cutlery" aria-hidden="true"></i>
              <span>FOOD</span>
            </li>
            <li onClick={this.handleAdventure} className="nav-item">
              <i className="fa fa-rocket" aria-hidden="true"></i>
              <span>ADVENTURES</span>
            </li>
          </ul>
      );
    }else if(this.state.searchOpen && !this.state.food && !this.state.loading){
      menu=(
        <ul>
          <li className="search-nav">
            <i onClick={this.handleClose} className="fa fa-times" aria-hidden="true"></i>
            <form onSubmit={this.handleSubmit} className="bottom-nav">
              <input ref="searchTerm" type="text" placeholder="Search"/>
              <i onClick={this.handleSubmit} className="fa fa-search" aria-hidden="true"></i>
            </form>
          </li>
        </ul>
      );
    }else if(!this.state.searchOpen && this.state.food && !this.state.loading){
      menu=(
      <ul>
        <i onClick={this.handleClose} className="fa fa-times" aria-hidden="true"></i>
        <li onClick={this.handleBreakfast} className="options">
         <span> BREAKFAST</span>
        </li>
        <li onClick={this.handleLunch} className="options">
         <span>LUNCH</span>
        </li>
        <li onClick={this.handleDinner} className="options">
         <span>DINNER</span>
        </li>
        <li onClick={this.handleFood} className="options">
         <span>YOU PICK</span>
        </li>
      </ul>
    );
  }else if(this.state.loading && !this.state.searchOpen && !this.state.food){
    menu=(
      <ul>
        <li className="search-nav">
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
          <span className="sr-only">Loading...</span>
        </li>
      </ul>
    );
  }
    return(
        <div className="mobile-nav">
         {menu}
        </div>

    );
  },
  handleClose(){
  this.setState({searchOpen:false, food:false});
  },
  openFood(){
    this.setState({food:true});
  },
  handleSearch(){
    this.setState({searchOpen:true});
  },
  handleEvents() {
      let prefs = this.state.session.events;
      this.setState({loading:true});
        window.scrollTo(0,0);
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
          let trueEvents = ['Attraction', 'Comedy', 'Festival', 'Holiday', 'Film', 'Music', 'Social', 'Sports'];
          let mixedEvents = _.shuffle(trueEvents);
          let selection = _.first(mixedEvents);
          console.log(selection);
          store.places.getEvents(selection);

      }
    },
  handleSubmit(e){
      e.preventDefault();
      let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
      let searchTerm=this.refs.searchTerm.value;
      store.places.searchFood(searchTerm,coordinates);
      this.refs.searchTerm.value='';
      this.setState({searchOpen:false, food:false, loading:true});
      window.scrollTo(0,0);
  },
  handleBreakfast(){
    let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
    store.places.searchFood('breakfast', coordinates);
    this.setState({searchOpen:false, food:false, loading:true});
    window.scrollTo(0,0);

  },
  handleLunch(){
    let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
    store.places.searchFood('lunch', coordinates);
    this.setState({searchOpen:false, food:false, loading:true});
    window.scrollTo(0,0);

  },
  handleDinner(){
    let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
    store.places.searchFood('dinner', coordinates);
    this.setState({searchOpen:false, food:false, loading:true});
    window.scrollTo(0,0);
  },


  handleFood() {
      window.scrollTo(0,0);
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
          let trueFoods = ['American', 'BBQ', 'Burgers', 'Cafes', 'Chicken', 'Mexican', 'Chinese', 'Pizza', 'Italian', 'Comfortfood', 'Deli', 'Diners', 'French', 'German', 'Greek', 'Asian', 'Indian', 'Tacos', 'Salad', 'Soup', 'Spanish', 'Texmex', 'Steakhouse', 'Foodtrucks'];
          let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
          let mixedFood = _.shuffle(trueFoods);
          let selection = _.first(mixedFood);
          console.log(selection);
          store.places.searchFood(selection, coordinates);
          this.setState({searchOpen:false, food:false, loading:true});

      }
  },
  handleAdventure() {
      let prefs = this.state.session.adventure;
      this.setState({searchOpen:false, food:false,loading:true});
      window.scrollTo(0,0);

      if (prefs) {
          let weather = window.localStorage.getItem('description');
          let temp= window.localStorage.getItem('temp');
          let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
          let trueAdventures = [];
          if (weather.includes('rain') || temp<60) {
              _.mapObject(prefs, function(val, key) {
                  if (key.match(/^(arcades|Spas|Coffee|Bowling|escape|Aquariums|Lasertag|Movies|Bingo|shopping|Wineries|Breweries|Bookstores|Bars)$/) && val === true || temp<60) {
                      trueAdventures.push(key);
                  }
              });
              let mixedAdventures = _.shuffle(trueAdventures);
              let selection = _.first(mixedAdventures);
              store.places.searchAdventure(selection, coordinates);
          } else {
              _.mapObject(prefs, function(val, key) {
                  if (val === true) {
                      trueAdventures.push(key);
                  }
              });
              let mixedAdventures = _.shuffle(trueAdventures);
              let selection = _.first(mixedAdventures);
              store.places.searchAdventure(selection, coordinates);
          }
      } else {
        let weather=window.localStorage.getItem('description');
        let temp=window.localStorage.getItem('temp');
          if (weather.includes('rain')|| temp<60) {
              let trueAdventures = ['Arcades', 'Bars', 'Bingo', 'Bookstores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Aquariums', 'Breweries', 'GoKarts', 'Movies', 'Wineries'];
              let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
              let mixedAdventures = _.shuffle(trueAdventures);
              let selection = _.first(mixedAdventures);
              store.places.searchAdventure(selection, coordinates);
          } else {
              let trueAdventures = ['Arcades', 'Bars', 'Bingo', 'BookStores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Amusement', 'Aquariums', 'BikeRentals', 'Breweries', 'Canoeing', 'GoKarts', 'Kayaking', 'Hiking', 'Minigolf', 'Movies', 'PaddleBoarding', 'Paintball', 'Tours', 'Swimming', 'Tubing', 'Ziplining', 'Zoos', 'Wineries', ];
              let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
              let mixedAdventures = _.shuffle(trueAdventures);
              let selection = _.first(mixedAdventures);
              store.places.searchAdventure(selection, coordinates);
          }
      }
  }
});
