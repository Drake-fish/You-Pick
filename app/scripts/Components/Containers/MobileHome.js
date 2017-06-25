import React from 'react';
import _ from 'underscore';
import { browserHistory } from 'react-router';

import store from '../../store';


export default React.createClass({
    getInitialState() {
        return {
            loading:false,
            eventsLoading:false,
            adventuresLoading:false,
            searchLoading:false,
            searchClicked:false,
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
            loading:false,
            eventsLoading:false,
            adventuresLoading:false
        });
    },

    componentWillUnMount() {
        store.session.off('change update', this.updateSession);
        store.places.off('change update',this.updatePlaces);
    },


    render() {
      let Search=(
        <div onClick={this.handleSearch} className="search search-option">
          <h3 className="search-title">SEARCH</h3>
          <form className="search-main-form">
            <input ref="searchTerm" type="text" placeholder="Search" className="search-box"/>
            <i className="fa fa-search" aria-hidden="true"></i>
            <div onClick={this.handleSearch} className="search-modal">
            </div>
            </form>
          <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw not-loading"></i>
          <span className="sr-only">Loading...</span>
    </div>

  );
  if(this.state.searchClicked && !this.state.searchLoading){
    Search=(
      <div className="search search-option">
        <h3 className="search-title">SEARCH</h3>
        <form className="search-main-form">
        <input ref="searchTerm" type="text" placeholder="Search" className=" search-box search-box-open"/>
        <i onClick={this.handleSubmit} className="fa fa-search search-icon-open" aria-hidden="true"></i>
        <div onClick={this.handleSearch} className="search-modal search-modal-open">
        </div>
        </form>
        <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw not-loading"></i>
        <span className="sr-only">Loading...</span>
  </div>
);
  }else if(this.state.searchClicked && this.state.loading){
    Search=(
      <div className="search search-option">
        <h3 className="search-title">SEARCH</h3>
        <input ref="searchTerm" type="text" placeholder="Search" className="search-box"/>
        <i onClick={this.handleSubmit} className="fa fa-search" aria-hidden="true"></i>
        <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw search-loading"></i>
        <span className="sr-only">Loading...</span>
  </div>
);
  }
      let FoodDiv;
        if(!this.state.foodClicked && !this.state.loading){
          FoodDiv=(
            <div onClick = {this.handleFood} className = "food search-option">
                  <h3 className = "food-title"> FOOD </h3>
                  <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw not-loading"></i>
                  <span className="sr-only">Loading...</span>
            </div>
          );

        }else if(!this.state.foodClicked && this.state.loading){
          FoodDiv=(
            <div className = "food search-option">
            <h3 className = "food-title"> FOOD </h3>

                      <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw food-loading"></i>
                      <span className="sr-only">Loading...</span>
            </div>

          );
        }
        let AdventureDiv;
        if(!this.state.adventuresLoading){
          AdventureDiv=(
                        <div onClick = {this.handleAdventure} className = "adventures search-option">
                            <h3 className = "adventure-title" > ADVENTURE < /h3>
                            <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw not-loading"></i>
                            <span className="sr-only">Loading...</span>
                        </div>

                      );
        }else{
          AdventureDiv=(
                        <div className = "adventures search-option">
                        <h3 className = "adventure-title" > ADVENTURE < /h3>

                          <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw adventures-loading"></i>
                          <span className="sr-only">Loading...</span>
                        </div>

                      );
             }
        let EventsDiv;
        if(!this.state.eventsLoading){
          EventsDiv=(
                      <div onClick = {this.handleEvents} className = "events search-option">
                            <h3 className = "events-title"> EVENTS </h3>
                            <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw not-loading"></i>
                            <span className="sr-only">Loading...</span>
                      </div>
                    );

        }else{
          EventsDiv=(
                      <div className = "events search-option">
                      <h3 className = "events-title"> EVENTS </h3>
                          <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw events-loading"></i>
                          <span className="sr-only">Loading...</span>
                      </div>
                    );
        }
        let PetDiv=(
          <div className = "pets search-option">
          <h3 className = "events-title"> PETS </h3>
              <i id="loading" className="fa fa-spinner fa-pulse fa-3x fa-fw not-loading"></i>
              <span className="sr-only">Loading...</span>
          </div>

        );
        return ( <div className = "home">
                    {EventsDiv}
                    {FoodDiv}
                    {Search}
                    {AdventureDiv}
                    {PetDiv}
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
handleSearch(){
    this.setState({searchClicked:!this.state.searchClicked});
},
    handleFood() {

        let prefs = this.state.session.prefs;
        store.places.searchFood(prefs);
        this.setState({loading:true,foodClicked:false});
    },
    handleAdventure() {
        let prefs = this.state.session.adventure;
        this.setState({adventuresLoading:true});
        store.places.searchAdventure(prefs);

    },
    handleSubmit(e){
      e.preventDefault();
      let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
      let searchTerm=this.refs.searchTerm.value;
      store.places.searchAnything(searchTerm);
      this.refs.searchTerm.value='';
      this.setState({searchLoading:true});
    }

});
