import React from 'react';
import {browserHistory,Link} from 'react-router';
import _ from 'underscore';

import Search from '../../components/search';
import FoodSearchList from '../../components/FoodSearchList';
import store from '../../store';
import SearchOptions from './SearchOptions';


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
          <h3 className="search-title">{login} How about {this.state.places[0].searchTerm} {food}</h3>
          <span className="research" onClick={this.search}>(Try Again)</span>
          <FoodSearchList results={results}/>
        </div>
      );
    }else if(this.state.loading){
      searchDiv = (
                    <div className = "search-results">
                      <h3 className = "search-title">{login} How About {this.state.places[0].searchTerm}</h3>
                      <i id="try-again-loading" className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                      <span className="sr-only">Loading...</span>
                    </div>
                  );
    }
      return (<div>
                <SearchOptions/>
                {searchDiv}
             </div>);
    },
    search(e){
      e.preventDefault();
      this.setState({loading:true});
      let searchTerm=this.state.places[0].searchTerm;
      let prefs=this.state.session.prefs;
      store.places.searchFood(prefs,searchTerm);
    }
  });
