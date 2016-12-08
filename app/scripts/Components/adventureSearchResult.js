import React from 'react';
import {Link} from 'react-router';

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
   console.log(this.props);

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
 let hours;
 if(!this.props.place.is_closed){
   hours=(
     <span className="hours">We Are Open!</span>
   );

 }else{
   hours=(
          <span className="hours-closed">We Are Closed!</span>
   );
 }
   let resultDiv;
   if(!this.state.liked){
     resultDiv=(
       <li className="result">
         {likeButton}
         <img className="picture" src={this.props.place.imageUrl}/>
         <div className="business-info">
             <h3 className="business-name">{this.props.place.name}</h3>
             <img className="stars" src={this.props.place.yelpRatingStars}/>
             <span className="ratings">{this.props.place.reviewCount} reviews</span>
             {hours}
         </div>
         {map}
         <div className="contact">

             <h4 className="address">{this.props.place.address[0]}</h4>
             <h4>{this.props.place.address[1]}</h4>
             <h4>{this.props.place.phoneNumber}</h4>
             <h4>{distance} Miles</h4>
         </div>

         <div className="review-section">
             <span className="review">{this.props.place.snippetText}</span>
             <img className="reviewer-pic" src={this.props.place.snippetImageUrl}/>
             <div className="link yelp">
               <a href={this.props.place.moreInfo} target="_blank"><img src="https://s3-media2.fl.yelpcdn.com/assets/srv0/developer_pages/ebeb7fcf7307/assets/img/yelp-2c-outline.png"/></a>
             </div>
         </div>
      </li>
     );
   }else{
     resultDiv=(
       <li className="result">
        <div className="liked-overlay">
        <i onClick={this.save}className="liked fa fa-heart" aria-hidden="true"></i>
        </div>
         <img className="picture" src={this.props.place.imageUrl}/>
         <div className="business-info">
             <h3 className="business-name">{this.props.place.name}</h3>
             <img className="stars" src={this.props.place.yelpRatingStars}/>
             <span className="ratings">{this.props.place.reviewCount} reviews</span>
             {hours}
         </div>
         {map}
         <div className="contact">
             <h4 className="address">{this.props.place.address[0]}</h4>
             <h4>{this.props.place.address[1]}</h4>
             <h4>{this.props.place.phoneNumber}</h4>
             <h4>{distance} Miles</h4>
         </div>
         <div className="review-section">
             <span className="review">{this.props.place.snippetText}</span>
             <img className="reviewer-pic" src={this.props.place.snippetImageUrl}/>
         </div>
         <div className="link yelp">
           <a href={this.props.place.moreInfo} target="_blank"><img src="https://s3-media2.fl.yelpcdn.com/assets/srv0/developer_pages/ebeb7fcf7307/assets/img/yelp-2c-outline.png"/></a>
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
  save(){
    let picture=this.props.place.imageUrl;
    let title=this.props.place.name;
    let address=this.props.place.address[0];
    let phone= this.props.place.phoneNumber;
    let moreInfo=this.props.place.moreInfo;
    store.session.addSearch(picture,title,address,phone,moreInfo,'likedAdventures');
    this.setState({liked:true});
    // setTimeout(()=>{
    //   this.setState({liked:false});
    // },3000);

  }
});
