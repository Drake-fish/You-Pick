import React from 'react';
import {browserHistory,Link} from 'react-router';
import _ from 'underscore';

import Search from '../../components/search';
import FoodSearchList from '../../components/FoodSearchList';
import store from '../../store';


export default React.createClass({
  getInitialState(){
    return{
      places: store.places.toJSON(),
      session: store.session.toJSON(),
      loading:false
    }
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

  render(){
    let login=(
      <Link to='login'><i className="fa fa-cog" aria-hidden="true"></i></Link>
    );
    if(window.localStorage.getItem('user-token')){
      login=(<Link to='preferences'><i className="fa fa-cog" aria-hidden="true"></i></Link>
    );
    }
    let searchDiv;
    if(this.state.places.length===0){
      browserHistory.push('/');
    }else if(!this.state.loading){
      let food;
      let searchTerm=this.state.places[0].searchTerm;
      if(searchTerm.match(/^(american|mexican|chinese|italian|french|german|asian|greek|indian|spanish)$/)){
        food='Food';
      }
      let results=this.state.places;
      searchDiv=(
        <div className="search-results">
          <Search/>
          <h3 className="search-title">{login} How about {this.state.places[0].searchTerm} {food}</h3>
          <span className="research" onClick={this.search}>(Try Again)</span>

          <FoodSearchList results={results}/>
        </div>
      );
    }else if(this.state.loading){
      searchDiv = (
                    <div className = "search-results">
                      <Search/>
                      <h3 className = "search-title">{login} How about {this.state.places[0].searchTerm}</h3>
                      <i id="try-again-loading" className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
    }
      return (<div>
                {searchDiv}
             </div>);
    },
    search(){
      this.setState({loading:true});
      let searchTerm=this.state.places[0].searchTerm;
      let coordinates=[window.localStorage.getItem('latitude'),window.localStorage.getItem('longitude')];
      let prefs=this.state.session.prefs;
      if(prefs){
      let trueFoods=[];
        _.mapObject(prefs,function(val,key){
          if(val===true){
            trueFoods.push(key);
          }
      });
      let newSearchArray=_.without(trueFoods,searchTerm);
      let mixedFood=_.shuffle(newSearchArray);
      let selection=_.first(mixedFood);
      store.places.searchFood(selection ,coordinates,'foodresults');

  }else{
    let trueFoods=['american', 'bbq', 'burgers', 'cafes', 'chicken','mexican','chinese','pizza','italian','comfortfood','deli','diners','french','german','greek','asian','indian','tacos','salad','soup','spanish','texmex','steakhouse','foodtrucks'];
    let newSearchArray=_.without(trueFoods,searchTerm);
    let mixedFood=_.shuffle(newSearchArray);
    let selection=_.first(mixedFood);
    console.log(selection);
    store.places.searchFood(selection,coordinates);
      }
    }
  });