import React from 'react';

export default React.createClass({
  render(){
    let distance;


    if(this.props.place.distance){
     distance=Math.round(this.props.place.distance/1609);
   }

    return(
      <li className="result">
        <div className="business-info">
            <h3 className="business-name">{this.props.place.name}</h3>
            <img className="picture" src={this.props.place.imageUrl}/>
            <img className="stars" src={this.props.place.yelpRatingStars}/>
            <span className="ratings">Based on {this.props.place.reviewCount} reviews</span>
        </div>
        <div className="location">
            <h4>{this.props.place.address[0]}</h4>
            <h4>{this.props.place.address[1]}</h4>
            <h4>{this.props.place.phoneNumber}</h4>
            <h4>{distance}</h4>
        </div>
        <div className="review-section">
            <img className="reviewer-pic" src={this.props.place.snippetImageUrl}/>
            <span className="review">{this.props.place.snippetText}</span>
        </div>
     </li>
    );
  }
});
