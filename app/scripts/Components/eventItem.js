import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from 'jquery';
import Moment from 'moment';
import store from '../store';
export default React.createClass({
  getInitialState(){
    return{
      liked:false,
      places:store.places.toJSON()
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
      console.log(this.props);
      let words=this.props.event.description;
      const regex = /(<([^>]+)>)/ig;
      let description;
      if(!words){
        description=(<p><a href={this.props.event.moreInfo}>No Description Availiable...See more on EventFul!</a></p>);
      }else{
        description=(<p>{words.replace(regex, " ").replace('&amp;', " ").replace('&#39;'," ").replace('&quote;'," ")}</p>);

      }
      let image=(<img className="picture" src="http://tapiaconference.org/assets/5567ae8dd4c961484002d7ea/austin_skyline6.jpeg"/>);
      let startTime=(<span>
                        <a href={this.props.event.moreInfo} target="_blank">Click Here for more details</a>
                     </span>
                     );


      if(this.props.event.startTime){
        startTime=( <div className="time-info">
                      <h5 className="date-time">Date:{Moment(this.props.event.startTime).format('LL')}</h5>
                      <h5 className="date-time">Time:{Moment(this.props.event.startTime).format('LT')}</h5>
                    </div>
                  );

        }

      if(this.props.event.image){
        image=(<img className="picture" src={this.props.event.image}/>);
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
     let resultDiv;
     if(!this.state.liked){
       resultDiv=(
         <li className="result">
          <div className="event-title">
           <h3 className="business-name">{this.props.event.title}</h3>
           {likeButton}
          </div>
           {image}
               <div className="event-contact">
                   <h4 className="event-name">{this.props.event.placeName}</h4>
                   <h5>{this.props.event.address}</h5>
                   {startTime}
               </div>
           <div className="review-section">
              {description}
           </div>
        </li>
       );
     }else{
       resultDiv=(
              <li className="result">
               <h3 className="business-name">{this.props.event.title}</h3>
               <Link to="/saved"><i id="liked-heart-icon" className="fa fa-heart" aria-hidden="true"></i></Link>
              <div className="event-picture-container">
                  {image}
                  <div className="event-liked-overlay">
                      <Link to="/saved">
                        <span>Added to Favorites</span>
                        <i className="liked fa fa-heart" aria-hidden="true"></i>
                      </Link>
                  </div>
              </div>

                      <div className="event-contact">
                          <h4 className="event-name">{this.props.event.placeName}</h4>
                          <h5>{this.props.event.address}</h5>
                          {startTime}
                      </div>
                  <div className="review-section">
                     {description}
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
      let picture;
      if(this.props.event.image){
       picture=this.props.event.image
      }else{
        picture='http://tapiaconference.org/assets/5567ae8dd4c961484002d7ea/austin_skyline6.jpeg';
      }
      let title=this.props.event.title;
      let address=this.props.event.address;
      let description= this.props.event.startTime;
      let moreInfo=this.props.event.moreInfo;
      store.session.addSearch(picture,title,address,description,moreInfo,'likedEvents');
      this.setState({liked:true});

    }
  });
