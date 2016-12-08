import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import Moment from 'moment';
export default React.createClass({
  render(){
    let image=(<img className="picture" src="http://www.clker.com/cliparts/n/T/5/z/f/Y/image-missing-md.png"/>);
    let startTime=(<span>
                      <a href={this.props.event.moreInfo} target="_blank">Click Here for more details</a>
                   </span>
                   );


    if(this.props.event.startTime){
      startTime=( <div className="time-info">
                    <h4>Date:{Moment(this.props.event.startTime).format('LL')}</h4>
                    <h4>Time:{Moment(this.props.event.startTime).format('LT')}</h4>
                  </div>
                );

      }

    if(this.props.event.image){
      image=(<img className="event-picture" src={this.props.event.image}/>);
      }
    return(
      <li className="event-result">
        <h3 className="event-name">{this.props.event.title}</h3>
        {image}
        <div className="event-details">
            <h4>{this.props.event.placeName}</h4>
            <h4>{this.props.event.address}</h4>
            {startTime}
        </div>
        <div className="description">
            <p>{this.props.event.description}</p>
        </div>

      </li>
    );
  }
});
