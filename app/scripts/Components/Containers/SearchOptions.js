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
        if(!this.state.foodClicked && !this.state.foodLoading){
          FoodDiv=(
            <div onClick = {this.handleFoodChoices} className = "overlay search-options">
                <div className = "food search">
                  <h3 className = "title"> FOOD </h3>
                </div>
            </div>
          )

        }else if(this.state.foodClicked && !this.state.foodLoading){
          FoodDiv=(
            <div className = "food-clicked">
                <div className = "food">
                    <div className="modal">
                      <i onClick={this.handleExit} className="fa fa-times" aria-hidden="true"></i>
                      <h3 className = "type"> I Want.. </h3>
                      <span onClick={this.handleBreakfast}>Breakfast</span>
                      <span onClick={this.handleFood}>Lunch</span>
                      <span onClick={this.handleFood}>Dinner</span>
                      <span onClick={this.handleFood}>You Pick</span>
                    </div>
                </div>
            </div>
          );
        }else if(!this.state.foodClicked && this.state.foodLoading){
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
                        <div onClick = {this.handleAdventure} className = "overlay search-options">
                          <div className = "random search" >
                            <h3 className = "title" > ADVENTURE < /h3>
                          </div>
                        </div>

                      );
        }else{
          AdventureDiv=(
                        <div className = "overlay search-options">
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
                      <div onClick = {this.handleEvents} className = "overlay search-options">
                          <div className = "events search">
                            <h3 className = "title"> EVENTS </h3>
                          </div>
                      </div>
                    );

        }else{
          EventsDiv=(
                      <div className = "overlay search-options">
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
        this.setState({eventsLoading:true});
        let prefs = this.state.session.events;
            store.places.getEvents(prefs);
    },
    handleFoodChoices(){
      this.setState({foodClicked:true});
    },
    handleBreakfast(){
          store.places.searchBreakfast();
          this.setState({foodLoading:true,foodClicked:false});


    },


    handleFood() {
        let prefs;
        if(this.state.session.prefs){
          prefs=this.state.session.prefs;
        }
        store.places.searchFood(prefs);
        this.setState({foodLoading:true, foodClicked:false});
    },
    handleAdventure() {
        let prefs = this.state.session.adventure;
        this.setState({adventuresLoading:true});
                store.places.searchAdventure(prefs);
    }

});
