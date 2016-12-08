import React from 'react';

import AdventureSearchResult from './adventureSearchResult';

export default React.createClass({
  render(){
  let resultItem=this.props.results.map((result,i,arr)=>{
    return <AdventureSearchResult key={i} place={result}/>
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
