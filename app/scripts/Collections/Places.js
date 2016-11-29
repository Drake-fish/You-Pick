import Backbone from 'backbone';
import $ from 'jquery';

import { browserHistory} from 'react-router';
import OAuth from '../Oauth';
import Place from '../Models/Place';
import config from '../config';

export default Backbone.Collection.extend({
    model: Place,
    searchFood(term,coordinates) {
return new Promise((resolve, reject) => {

   let cll = `${coordinates[0]},${coordinates[1]}`;

 this.reset();
 let auth = {
   consumerKey : config.consumerKey,
   consumerSecret : config.consumerSecret,
   accessToken : config.accessToken,
   accessTokenSecret : config.accessTokenSecret,
   serviceProvider : {
       signatureMethod : "HMAC-SHA1",
   },
 };
 let terms = term;
 let sort = 0;
 let accessor = {
     consumerSecret : config.consumerSecret,
     tokenSecret : config.accessTokenSecret,
 };

 let parameters = [];

 parameters.push(['ll', cll]);
 parameters.push(['sort_by','distance']);
 parameters.push(['categories','food']);
 parameters.push(['term', terms]);
 parameters.push(['sort', sort]);
 parameters.push(['callback', 'cb']);
 parameters.push(['oauth_consumer_key', config.consumerKey]);
 parameters.push(['oauth_consumer_secret', config.consumerSecret]);
 parameters.push(['oauth_token', config.accessToken]);
 parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


 let message = {
     'action' : 'https://api.yelp.com/v2/search',
     'method' : 'GET',
     'parameters' : parameters,
 };

 OAuth.setTimestampAndNonce(message);
 OAuth.SignatureMethod.sign(message, accessor);
 let parameterMap = OAuth.getParameterMap(message.parameters);
 $.ajax({
     'url' : message.action,
     'data' : parameterMap,
     'dataType' : 'jsonp',
     'cache': true,
 }).then((places) => {
   let placeList =  places.businesses.map((place) => {
     let distance;
     if(place.distance){
       console.log(place.distance);
       distance=place.distance;
     }
     console.log(place);
     return {
       searchTerm: term,
       name: place.name,
       yelpRating: place.rating,
       yelpRatingStars: place.rating_img_url,
       yelpMobileUrl: place.mobile_url,
       yelpID: place.id,
       categories: place.categories,
       imageUrl: place.image_url,
       snippetImageUrl: place.snippet_image_url,
       snippetText: place.snippet_text,
       ll: place.location.coordinate,
       address: place.location.display_address,
       neighborhoods: place.location.neighborhoods,
       isClosed: place.is_closed,
       reviewCount: place.review_count,
       phoneNumber: place.display_phone,
       moreInfo:place.url,
       distance:distance

     }
   });
   this.add(placeList);
   browserHistory.push('results');
   resolve();

 })
 .fail(function(e) {
   console.error('Yelp Data failed: ', e)
   reject();
 });
});
}
});
