import React from 'react';

import store from '../store';
export default React.createClass({
render(){
  return(
    <form onSubmit={this.handleSubmit} className="search-field">
      <i onClick={this.handleSubmit} className="fa fa-search" aria-hidden="true"></i>
      <input ref="searchTerm" type="text" placeholder="Search"/>
    </form>

  );
},
handleSubmit(e){
  e.preventDefault();
  let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
  let searchTerm=this.refs.searchTerm.value;
  store.places.searchAnything(searchTerm);
  this.refs.searchTerm.value='';
}
});
