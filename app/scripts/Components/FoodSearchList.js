import React from 'react';

import FoodSearchResult from './foodSearchResult';

export default React.createClass({
  render(){
  let resultItem=this.props.results.map((result,i,arr)=>{
    return <FoodSearchResult key={i} place={result}/>
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
