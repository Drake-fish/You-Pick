import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default React.createClass({
  render(){
    let image=(<img className="picture" src="http://www.clker.com/cliparts/n/T/5/z/f/Y/image-missing-md.png"/>);
    let startTime=(<span>
                      <a href={this.props.event.moreInfo} target="_blank">Click Here for more details</a>
                   </span>
                   );


    if(this.props.event.startTime){
      startTime=( <div className="time-info">
                    <h4>Start Time:{this.props.event.startTime}</h4>
                    <a href={this.props.event.moreInfo} target="_blank">More Details</a>
                  </div>
                );

      }

    if(this.props.event.image){
      image=(<img className="picture" src={this.props.event.image}/>);
      }
    return(
      <li className="result">
        <div className="business-info">
            <h3 className="event-name">{this.props.event.title}</h3>
            {image}
            <p className="description">{this.props.event.description}</p>
        </div>
        <div className="location">
            <h4>{this.props.event.placeName}</h4>
            <h4>{this.props.event.address}</h4>
            {startTime}
        </div>
      </li>
    );
  }
});
