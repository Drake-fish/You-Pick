import React from 'react';
import {browserHistory,Link} from 'react-router';
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

  componentWillUnMount(){
    store.session.off('change update',()=>{
      this.setState({session:store.session.toJSON()});
    }),
    store.places.off('change update',()=>{
      this.setState({places:store.session.toJSON()});
    });
  },

  render(){
    let login=(
      <h4 className="login">Want to make this more personal? <Link to='login'>Login</Link></h4>
      );
    if(window.localStorage.getItem('user-token')){
      login=(<h4>Want to make this more personal?<Link to='preferences'>Update Preferences</Link></h4>
      );
    }
    let searchDiv;
    if(this.state.places.length===0){
      searchDiv=(
        <div className="empty-search">
          <h3 className="search-title">Click an option above to get started!</h3>
        </div>
      );
    }else{
      let food;
      let searchTerm=this.state.places[0].searchTerm;
      if(searchTerm.match(/^(american|mexican|chinese|italian|french|german|asian|greek|indian|spanish)$/)){
        food='Food';
      }
      let results=this.state.places;
      searchDiv=(
        <div className="search-results">
          <h3 className="search-title">How about {this.state.places[0].searchTerm} {food} <span onClick={this.search}>(Nope)</span></h3>
          {login}
          <SearchList results={results}/>
        </div>
      );
    }
      return (<div>
                {searchDiv}
             </div>);
    },
    search(){
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
    console.log(selection);
    store.places.searchFood(selection ,coordinates);

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
