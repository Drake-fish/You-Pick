import React from 'react';
import {browserHistory} from 'react-router';
import _ from 'underscore';


import SearchList from '../../components/SearchList';
import store from '../../store';


export default React.createClass({
  getInitialState(){
    return{
      places: store.places.toJSON(),
      session: store.session.toJSON()
    }
  },
  componentWillMount(){
    store.session.on('change update',()=>{
      this.setState({session:store.session.toJSON()});
    }),
    store.places.on('change update', ()=>{
      this.setState({places:store.places.toJSON()});
    });
  },

  render(){
    let searchDiv;
    console.log(this.state);
    if(this.state.places.length===0){
      searchDiv=(
        <div className="empty-search">
          <h3 className="search-title">Click an option above to get started!</h3>
        </div>
      );
    }else{
      let food;
      let searchTerm=this.state.places[0].searchTerm;
      if(searchTerm.includes('american') || searchTerm.includes('mexian')|| searchTerm.includes('chinese')|| searchTerm.includes('italian')|| searchTerm.includes('french')|| searchTerm.includes('german')|| searchTerm.includes('asian')|| searchTerm.includes('greek')|| searchTerm.includes('indian')|| searchTerm.includes('spanish')){
        food='Food';
        // ,,,,'delis','diners','tacos','salad','soup','tex-mex','steakhouse'
      }
      let results=this.state.places;
      searchDiv=(
        <div className="search-results">
          <h3 className="search-title">How about {this.state.places[0].searchTerm} {food} <span onClick={this.search}>(Nope)</span></h3>
          <SearchList results={results}/>
        </div>
      );
    }
      return (<div>
                {searchDiv}
             </div>);
    },
    search(){
      let coordinates=[window.localStorage.getItem('latitude'),window.localStorage.getItem('longitude')];
      let food=this.state.session.foodPreferences;
      let mixedFood=_.shuffle(food);
      let selection=_.first(mixedFood);
      console.log(selection);
      store.places.searchFood(selection ,coordinates);
    }
});
