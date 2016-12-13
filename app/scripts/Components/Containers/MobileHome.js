import React from 'react';
import _ from 'underscore';
import { browserHistory } from 'react-router';

import store from '../../store';


export default React.createClass({
    getInitialState() {
        return {
            foodLoading:false,
            eventsLoading:false,
            adventuresLoading:false,
            foodClicked:false,
            session: store.session.toJSON(),
            places: store.places.toJSON()
        }
    },
    componentWillMount() {

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
            foodLoading:false,
            eventsLoading:false,
            adventuresLoading:false
        });
    },

    componentWillUnMount() {
        store.session.off('change update', this.updateSession);
        store.places.off('change update',this.updatePlaces);
    },


    render() {
      let FoodDiv;
        if(!this.state.foodClicked && !this.state.loading){
          FoodDiv=(
            <div onClick = {this.handleFoodChoices} className = "overlay mobile-options">
                <div className = "food search">
                  <h3 className = "title"> FOOD </h3>
                </div>
            </div>
          )

        }else if(this.state.foodClicked && !this.state.loading){
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
        }else if(!this.state.foodClicked && this.state.loading){
          FoodDiv=(
            <div className = "food-clicked">
                <div className = "food">
                    <div className="modal">

                      <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                      <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>

          );
        }
        let AdventureDiv;
        if(!this.state.adventuresLoading){
          AdventureDiv=(
                        <div onClick = {this.handleAdventure} className = "overlay mobile-options">
                          <div className = "random search" >
                            <h3 className = "title" > ADVENTURE < /h3>
                          </div>
                        </div>

                      );
        }else{
          AdventureDiv=(
                        <div className = "overlay mobile-options">
                          <div className = "random search" >
                          <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                          <span className="sr-only">Loading...</span>
                          </div>
                        </div>

                      );
             }
        let EventsDiv;
        if(!this.state.eventsLoading){
          EventsDiv=(
                      <div onClick = {this.handleEvents} className = "overlay mobile-options">
                          <div className = "events search">
                            <h3 className = "title"> EVENTS </h3>
                          </div>
                      </div>
                    );

        }else{
          EventsDiv=(
                      <div className = "overlay mobile-options">
                          <div className = "events search">
                          <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                          <span className="sr-only">Loading...</span>
                          </div>
                      </div>
                    );
        }
        return ( <div className = "home">
                    {EventsDiv}
                    {FoodDiv}
                    {AdventureDiv}
                 </div>

              );
    },
    handleExit(){
      this.setState({foodClicked:false});
    },
    handleEvents() {
        console.log(this.state);
        this.setState({eventsLoading:true});
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
            let trueEvents = ['Attraction', 'Comedy', 'Festival', 'Holiday', 'Film', 'Music', 'Social', 'Sports'];
            let mixedEvents = _.shuffle(trueEvents);
            let selection = _.first(mixedEvents);
            console.log(selection);
            store.places.getEvents(selection);
        }
    },
    handleFoodChoices(){
      this.setState({foodClicked:true});
    },
    handleBreakfast(){
      let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
      store.places.searchFood('breakfast', coordinates);
      this.setState({loading:true,foodClicked:false});

    },
    handleLunch(){
      let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
      store.places.searchFood('lunch', coordinates);
      this.setState({loading:true,foodClicked:false});
    },
    handleDinner(){
      let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
      store.places.searchFood('dinner', coordinates);
      this.setState({loading:true, foodClicked:false});
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
          let trueFoods = ['American', 'BBQ', 'Burgers', 'Cafes', 'Chicken', 'Mexican', 'Chinese', 'Pizza', 'Italian', 'Deli', 'Diners', 'French', 'German', 'Greek', 'Asian', 'Indian', 'Tacos', 'Salad', 'Soup', 'Spanish', 'Texmex', 'Steakhouse', 'Foodtrucks'];
            let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
            let mixedFood = _.shuffle(trueFoods);
            let selection = _.first(mixedFood);
            console.log(selection);
            store.places.searchFood(selection, coordinates);
            this.setState({loading:true, foodClicked:false});
        }
    },
    handleAdventure() {
        let prefs = this.state.session.adventure;
        this.setState({adventuresLoading:true});

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
