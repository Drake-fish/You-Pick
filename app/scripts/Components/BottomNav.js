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
        <li onClick={this.handleFood} className="options">
         <span>LUNCH</span>
        </li>
        <li onClick={this.handleFood} className="options">
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
      store.places.getEvents(prefs);
        window.scrollTo(0,0);
    },
  handleSubmit(e){
      e.preventDefault();
      let searchTerm=this.refs.searchTerm.value;
      store.places.searchAnything(searchTerm);
      this.refs.searchTerm.value='';
      this.setState({searchOpen:false, food:false, loading:true});
      window.scrollTo(0,0);
  },
  handleBreakfast(){
    store.places.searchBreakfast();
    this.setState({searchOpen:false, food:false, loading:true});
    window.scrollTo(0,0);

  },
  handleFood() {
      window.scrollTo(0,0);
      let prefs = this.state.session.prefs;
      store.places.searchFood(prefs);
      this.setState({searchOpen:false,food:false,loading:true});
  },
  handleAdventure() {
      let prefs = this.state.session.adventure;
      this.setState({searchOpen:false, food:false,loading:true});
      store.places.searchAdventure(prefs);
      window.scrollTo(0,0);
  }
});
