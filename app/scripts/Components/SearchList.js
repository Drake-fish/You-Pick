import React from 'react';

import SearchResult from './searchResult';

export default React.createClass({
  render(){
  let resultItem=this.props.results.map((result,i,arr)=>{
    return <SearchResult key={i} place={result}/>
});

    return(
      <div className="searchList">
        <ul>
         {resultItem}
        </ul>
      </div>
    );
  }
});
