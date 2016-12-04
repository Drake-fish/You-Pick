import React from 'react';

import EventItem from './eventItem';

export default React.createClass({
  render(){
  let resultItem=this.props.results.map((result,i,arr)=>{
    return <EventItem key={i} event={result}/>
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
