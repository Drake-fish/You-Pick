import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import { browserHistory } from 'react-router';
import OAuth from '../Oauth';
import Place from '../Models/Place';
import config from '../config';

export default Backbone.Collection.extend({
    model: Place,
    searchAnything(selection) {
        return new Promise((resolve, reject) => {
            let cll = `${window.localStorage.getItem('latitude')},${window.localStorage.getItem('longitude')}`;
            this.reset();
            let auth = {
                consumerKey: config.consumerKey,
                consumerSecret: config.consumerSecret,
                accessToken: config.accessToken,
                accessTokenSecret: config.accessTokenSecret,
                serviceProvider: {
                    signatureMethod: "HMAC-SHA1",
                },
            };
            let accessor = {
                consumerSecret: config.consumerSecret,
                tokenSecret: config.accessTokenSecret,
            };

            let parameters = [];
            parameters.push(['limit',20]);
            parameters.push(['ll', cll]);
            parameters.push(['sort_by', 'distance']);
            parameters.push(['term', selection]);
            parameters.push(['sort', 0]);
            parameters.push(['callback', 'cb']);
            parameters.push(['oauth_consumer_key', config.consumerKey]);
            parameters.push(['oauth_consumer_secret', config.consumerSecret]);
            parameters.push(['oauth_token', config.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


            let message = {
                'action': 'https://api.yelp.com/v2/search',
                'method': 'GET',
                'parameters': parameters,
            };

            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            let parameterMap = OAuth.getParameterMap(message.parameters);
            $.ajax({
                    'url': message.action,
                    'data': parameterMap,
                    'dataType': 'jsonp',
                    'cache': true,
                }).then((places) => {
                    let placeList = places.businesses.map((place) => {
                        let distance;
                        if (place.distance) {
                            distance = place.distance;
                        }
                        return {
                            searchTerm: selection,
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
                            moreInfo: place.url,
                            distance: distance

                        }
                    });
                    this.add(placeList);
                      browserHistory.push('/foodresults');
                    resolve();

                })
                .fail(function(e) {
                    console.error('Yelp Data failed: ', e);
                    reject();
                });
        });
    },
    searchFood(prefs, searchTerm) {
        return new Promise((resolve, reject) => {
            let cll = `${window.localStorage.getItem('latitude')},${window.localStorage.getItem('longitude')}`;
            this.reset();
            let auth = {
                consumerKey: config.consumerKey,
                consumerSecret: config.consumerSecret,
                accessToken: config.accessToken,
                accessTokenSecret: config.accessTokenSecret,
                serviceProvider: {
                    signatureMethod: "HMAC-SHA1",
                },
            };
            if(!searchTerm){
              searchTerm='';
            }
            let selection;
            if (prefs) {
                let trueFoods = [];
                _.mapObject(prefs, function(val, key) {
                    if (val === true) {
                        trueFoods.push(key);
                    }
                });
                let newArray=_.without(trueFoods,searchTerm);
                let mixedFood = _.shuffle(newArray);
                selection = _.first(mixedFood);
            } else {
              let trueFoods = ['American', 'BBQ', 'Burgers', 'Cafes', 'Chicken', 'Mexican', 'Chinese', 'Pizza', 'Italian', 'Deli', 'Diners', 'French', 'German', 'Greek', 'Asian', 'Indian', 'Tacos', 'Salad', 'Soup', 'Spanish', 'Texmex', 'Steakhouse', 'Foodtrucks'];
                let newArray=_.without(trueFoods,searchTerm);
                let mixedFood = _.shuffle(newArray);
                selection = _.first(mixedFood);
              }
            let accessor = {
                consumerSecret: config.consumerSecret,
                tokenSecret: config.accessTokenSecret,
            };

            let parameters = [];
            parameters.push(['limit',20]);
            parameters.push(['ll', cll]);
            parameters.push(['sort_by', 'distance']);
            parameters.push(['categories', 'food']);
            parameters.push(['term', selection]);
            parameters.push(['sort', 0]);
            parameters.push(['callback', 'cb']);
            parameters.push(['oauth_consumer_key', config.consumerKey]);
            parameters.push(['oauth_consumer_secret', config.consumerSecret]);
            parameters.push(['oauth_token', config.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


            let message = {
                'action': 'https://api.yelp.com/v2/search',
                'method': 'GET',
                'parameters': parameters,
            };

            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            let parameterMap = OAuth.getParameterMap(message.parameters);
            $.ajax({
                    'url': message.action,
                    'data': parameterMap,
                    'dataType': 'jsonp',
                    'cache': true,
                }).then((places) => {
                    let placeList = places.businesses.map((place) => {
                        let distance;
                        if (place.distance) {
                            distance = place.distance;
                        }
                        return {
                            searchTerm: selection,
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
                            moreInfo: place.url,
                            distance: distance

                        }
                    });
                    this.add(placeList);
                      browserHistory.push('/foodresults');
                    resolve();

                })
                .fail(function(e) {
                    console.error('Yelp Data failed: ', e);
                    reject();
                });
        });
    },
    searchBreakfast(searchTerm){
      return new Promise((resolve, reject) => {
          let cll = `${window.localStorage.getItem('latitude')},${window.localStorage.getItem('longitude')}`;
          this.reset();
          let auth = {
              consumerKey: config.consumerKey,
              consumerSecret: config.consumerSecret,
              accessToken: config.accessToken,
              accessTokenSecret: config.accessTokenSecret,
              serviceProvider: {
                  signatureMethod: "HMAC-SHA1",
              },
          };
            if(!searchTerm){
              searchTerm='';
            }
            let trueFoods = ['Breakfast Tacos', 'Pancakes' , 'Biscuits', 'Crepes', 'Croissants', 'Eggs', 'French Toast', 'Grits', 'Donuts', 'Migas', 'Oatmeal', 'Omelettes', 'Pastries', 'Toast', 'Bacon', 'Fruit'];
            let newArray=_.without(trueFoods,searchTerm);
              let mixedFood = _.shuffle(newArray);
              let selection = _.first(mixedFood);
          let accessor = {
              consumerSecret: config.consumerSecret,
              tokenSecret: config.accessTokenSecret,
          };

          let parameters = [];
          parameters.push(['limit',20]);
          parameters.push(['ll', cll]);
          parameters.push(['sort_by', 'distance']);
          parameters.push(['categories', 'food']);
          parameters.push(['term', selection]);
          parameters.push(['sort', 0]);
          parameters.push(['callback', 'cb']);
          parameters.push(['oauth_consumer_key', config.consumerKey]);
          parameters.push(['oauth_consumer_secret', config.consumerSecret]);
          parameters.push(['oauth_token', config.accessToken]);
          parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


          let message = {
              'action': 'https://api.yelp.com/v2/search',
              'method': 'GET',
              'parameters': parameters,
          };

          OAuth.setTimestampAndNonce(message);
          OAuth.SignatureMethod.sign(message, accessor);
          let parameterMap = OAuth.getParameterMap(message.parameters);
          $.ajax({
                  'url': message.action,
                  'data': parameterMap,
                  'dataType': 'jsonp',
                  'cache': true,
              }).then((places) => {
                  let placeList = places.businesses.map((place) => {
                      let distance;
                      if (place.distance) {
                          distance = place.distance;
                      }
                      return {
                          searchTerm: selection,
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
                          moreInfo: place.url,
                          distance: distance

                      }
                  });
                  this.add(placeList);
                    browserHistory.push('/foodresults');
                  resolve();

              })
              .fail(function(e) {
                  console.error('Yelp Data failed: ', e);
                  reject();
              });
      });

    },

    searchAdventure(prefs,searchTerm) {
        return new Promise((resolve, reject) => {
            let cll = `${window.localStorage.getItem('latitude')},${window.localStorage.getItem('longitude')}`;

            this.reset();
            let auth = {
                consumerKey: config.consumerKey,
                consumerSecret: config.consumerSecret,
                accessToken: config.accessToken,
                accessTokenSecret: config.accessTokenSecret,
                serviceProvider: {
                    signatureMethod: "HMAC-SHA1",
                },
            };
            let sort = 0;
            if(!searchTerm){
              searchTerm='';
            }
            let selection;
            if (prefs) {
                let weather = window.localStorage.getItem('description');
                let temp= window.localStorage.getItem('temp');
                let trueAdventures = [];
                if (weather.includes('rain') || temp<60) {
                    _.mapObject(prefs, function(val, key) {
                        if (key.match(/^(arcades|Spas|Coffee|Bowling|escape|Aquariums|Lasertag|Movies|Bingo|shopping|Wineries|Breweries|Bookstores|Bars)$/) && val === true || temp<60) {
                            trueAdventures.push(key);
                        }
                    });
                    let newArray=_.without(trueAdventures,searchTerm);
                    let mixedAdventures = _.shuffle(newArray);
                    selection = _.first(mixedAdventures);
                } else {
                    _.mapObject(prefs, function(val, key) {
                        if (val === true) {
                            trueAdventures.push(key);
                        }
                    });
                    let newArray=_.without(trueAdventures,searchTerm);
                    let mixedAdventures = _.shuffle(newArray);
                    selection = _.first(mixedAdventures);
                }
            } else {
              let weather=window.localStorage.getItem('description');
              let temp=window.localStorage.getItem('temp');
                if (weather.includes('rain')|| temp<60) {

                    let trueAdventures = ['Arcades', 'Bars', 'Bingo', 'Bookstores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Aquariums', 'Breweries', 'GoKarts', 'Movies', 'Wineries'];
                    let newArray=_.without(trueAdventures,searchTerm);
                    let mixedAdventures = _.shuffle(newArray);
                    selection = _.first(mixedAdventures);
                } else {
                    let trueAdventures = ['Arcades', 'Bars', 'Bingo', 'BookStores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Amusement', 'Aquariums', 'BikeRentals', 'Breweries', 'Canoeing', 'GoKarts', 'Kayaking', 'Hiking', 'Minigolf', 'Movies', 'PaddleBoarding', 'Paintball', 'Tours', 'Swimming', 'Tubing', 'Ziplining', 'Zoos', 'Wineries', ];
                    let newArray=_.without(trueAdventures,searchTerm);
                    let mixedAdventures = _.shuffle(newArray);
                    selection = _.first(mixedAdventures);
                  }
                }
            let accessor = {
                consumerSecret: config.consumerSecret,
                tokenSecret: config.accessTokenSecret,
            };

            let parameters = [];

            parameters.push(['ll', cll]);
            parameters.push(['sort_by', 'distance']);
            parameters.push(['term',selection ]);
            parameters.push(['sort', sort]);
            parameters.push(['callback', 'cb']);
            parameters.push(['oauth_consumer_key', config.consumerKey]);
            parameters.push(['oauth_consumer_secret', config.consumerSecret]);
            parameters.push(['oauth_token', config.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);


            let message = {
                'action': 'https://api.yelp.com/v2/search',
                'method': 'GET',
                'parameters': parameters,
            };

            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            let parameterMap = OAuth.getParameterMap(message.parameters);
            $.ajax({
                    'url': message.action,
                    'data': parameterMap,
                    'dataType': 'jsonp',
                    'cache': true,
                }).then((places) => {
                    let placeList = places.businesses.map((place) => {
                        let distance;
                        if (place.distance) {
                            distance = place.distance;
                        }
                        return {
                            searchTerm: selection,
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
                            moreInfo: place.url,
                            distance: distance

                        }
                    });
                    this.add(placeList);
                    browserHistory.push('adventureresults');
                    resolve();

                })
                .fail(function(e) {
                    console.error('Yelp Data failed: ', e)
                    reject();
                });
        });
    },
    getEvents(prefs,searchTerm) {
        return new Promise((resolve, reject) => {

            this.reset();
            let app_key = config.appKey;
            let selection;
            if(!searchTerm){
              searchTerm='';
            }
            if (prefs) {
                let trueEvents = [];
                _.mapObject(prefs, function(val, key) {
                    if (val === true) {
                        trueEvents.push(key);
                    }
                });
                let newArray=_.without(trueEvents,searchTerm);
                let mixedEvents = _.shuffle(newArray);
                selection = _.first(mixedEvents);
            } else {
                let trueEvents = ['Attraction', 'Comedy', 'Festival', 'Holiday', 'Film', 'Music', 'Social', 'Sports'];
                let newArray=_.without(trueEvents,searchTerm);
                let mixedEvents = _.shuffle(newArray);
                selection = _.first(mixedEvents);
              }

            let parameters = [];
            parameters.push(['keywords', selection]);
            parameters.push(['app_key', app_key]);
            parameters.push(['location', 'Austin,TX']);
            parameters.push(['date', 'This Week']);
            parameters.push(['sort_order', 'popularity']);
            parameters.push(['callback', 'cb']);


            let message = {
                'action': 'https://api.eventful.com/json/events/search?',
                'method': 'GET',
                'parameters': parameters,
            };

            let parameterMap = OAuth.getParameterMap(message.parameters);
            $.ajax({
                    'url': message.action,
                    'data': parameterMap,
                    'dataType': 'jsonp',
                    'cache': true,
                }).then((events) => {
                    let eventList = events.events.event.map((event) => {
                        let image;
                        if (event.image) {
                            image = event.image.medium.url;
                        }
                        return {
                            searchTerm: selection,
                            image: image,
                            title: event.title,
                            address: event.venue_address,
                            placeName: event.venue_name,
                            moreInfo: event.venue_url,
                            startTime: event.start_time,
                            endTime: event.end_time,
                            description: event.description
                        }
                    });

                    this.add(eventList);
                    browserHistory.push('eventresults');
                    resolve();

                })
                .fail(function(e) {
                    console.error('Eventful Data failed: ', e);
                    reject();
                });
        });
    }
});
