import React from 'react';
import {Link,browserHistory} from 'react-router';

import store from '../store';

export default React.createClass({
  getInitialState(){
    return{
      places:store.places.toJSON(),
      liked:false,
    }
  },
  componentWillMount(){
   store.places.on('update change', this.updatePlaces);
 },
 componentWillUnmount(){
   store.places.off('update change',this.updatePlaces);
 },
 updatePlaces(){
   this.setState({places:store.places.toJSON()});
   this.setState({liked:false});
 },
  render(){
    let distance;

    if(this.props.place.distance){
     distance=Math.round(this.props.place.distance/1609);
   }
   let likeButton;
   if(window.localStorage.getItem('user-token')){
     likeButton=(
                 <i onClick={this.save}id="heart-icon" className="fa fa-heart" aria-hidden="true"></i>
               );
   }else{
     likeButton=(
                 <Link to="/login"><i id="heart-icon" className="fa fa-heart" aria-hidden="true"></i></Link>
     );
   }
   let url=`https://www.google.com/maps/embed/v1/directions?origin=${window.localStorage.getItem('latitude')}%2C${window.localStorage.getItem('longitude')}&destination=${this.props.place.address[0]}&key=AIzaSyDi7Dus0sr6U1ZjH_ixNtWF8fV2reeFDn0`
   let map=(<iframe className="map" src={url}></iframe>
 );
   let resultDiv;
   let miles="miles";
   if(distance===1){
     miles='mile';
   }
   if(!this.state.liked){
     resultDiv=(
       <li className="result">
         <h3 className="business-name">{this.props.place.name}</h3>
         {likeButton}
         <img className="picture" src={this.props.place.imageUrl}/>
         <div className="business-info">
             <div className="contact">
                 <h4 className="address">{this.props.place.address[0]}</h4>
                 <h5>{this.props.place.address[1]}</h5>
                 <h5>{this.props.place.phoneNumber}</h5>
                 <h5>{distance} {miles}</h5>
             </div>
             <img className="stars" src={this.props.place.yelpRatingStars}/>
             <span className="ratings">{this.props.place.reviewCount} reviews</span>
         </div>
         <div className="map-overlay">
         </div>
         {map}
         <div className="review-section">
             <span className="arrow_box">{this.props.place.snippetText}<a href={this.props.place.moreInfo} target="_blank"><img className="yelp" src="https://s3-media2.fl.yelpcdn.com/assets/srv0/developer_pages/ebeb7fcf7307/assets/img/yelp-2c-outline.png"/></a></span>
             <img className="reviewer-pic" src={this.props.place.snippetImageUrl}/>

         </div>
      </li>
     );
   }else{
     resultDiv=(
       <li className="result">
         <h3 className="business-name">{this.props.place.name}</h3>
         <Link to="/saved"><i id="liked-heart-icon" className="fa fa-heart" aria-hidden="true"></i></Link>
          <div className="result-picture">
            <img className="picture" src={this.props.place.imageUrl}/>
            <div className="liked-overlay">
                <Link to="/saved">
                  <span>Added to Favorites</span>
                  <i className="liked fa fa-heart" aria-hidden="true"></i>
                </Link>
            </div>
         </div>

         <div className="business-info">
             <div className="contact">
                 <h4 className="address">{this.props.place.address[0]}</h4>
                 <h5>{this.props.place.address[1]}</h5>
                 <h5>{this.props.place.phoneNumber}</h5>
                 <h5>{distance} {miles}</h5>
             </div>
             <img className="stars" src={this.props.place.yelpRatingStars}/>
             <span className="ratings">{this.props.place.reviewCount} reviews</span>
        </div>
        <div className="map-overlay">
        </div>
         {map}
         <div className="review-section">
            <span className="arrow_box">{this.props.place.snippetText}<a href={this.props.place.moreInfo} target="_blank"><img className="yelp" src="https://s3-media2.fl.yelpcdn.com/assets/srv0/developer_pages/ebeb7fcf7307/assets/img/yelp-2c-outline.png"/></a></span>
            <img className="reviewer-pic" src={this.props.place.snippetImageUrl}/>
         </div>
      </li>
     );
   }


    return(
          <div className="results">
            {resultDiv}
          </div>
        );

  },
  save(e){
    e.preventDefault();
    let picture=this.props.place.imageUrl;
    let title=this.props.place.name;
    let address=this.props.place.address[0];
    let phone= this.props.place.phoneNumber;
    let moreInfo=this.props.place.moreInfo;
    store.session.addSearch(picture,title,address,phone,moreInfo,'likedFood');
    this.setState({liked:true});

  },
});
