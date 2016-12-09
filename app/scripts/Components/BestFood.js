import React from 'react';

import FoodSearchResult from './foodSearchResult';


export default React.createClass({
  render(){
    console.log(this.props);
    let results;
    if(this.props.foods.length>0){
      results= this.props.foods.map((place,i,arr)=>{
        return <FoodSearchResult key={i} place={place}/>
      });
    }else{
      return (<div className="best">
                <i id="loading-home" className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span className="sr-only">Loading...</span>
             </div>);
    }
    return(
            <ul>
              {results}
            </ul>
          );
  }
});
