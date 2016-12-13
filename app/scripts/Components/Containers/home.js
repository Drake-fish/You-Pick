import React from 'react';
import _ from 'underscore';
import { browserHistory, Link } from 'react-router';
import store from '../../store';
import SearchOptions from './SearchOptions';
import MobileHome from './MobileHome';


export default React.createClass({
    getInitialState() {
        return {
            session: store.session.toJSON(),
            places: store.places.toJSON()
        }
    },
    componentWillMount() {
        navigator.geolocation.getCurrentPosition(function(position) {
            window.localStorage.setItem('latitude', position.coords.latitude);
            window.localStorage.setItem('longitude', position.coords.longitude);
            store.session.getWeather(position.coords.latitude, position.coords.longitude);
        });

        store.session.on('change update', this.updateSession);
        store.places.on('change update', this.updatePlaces);

    },
    componentWillUnmount(){
      store.session.off('change update', this.updateSession);
      store.places.off('change update', this.updatePlaces);

    },

    updateSession() {

        this.setState({
            session: store.session.toJSON()
        });
    },
    updatePlaces() {
        this.setState({
            places: store.places.toJSON(),
        });
    },

    componentWillUnMount() {
        store.session.off('change update', this.updateSession);
        store.places.off('change update',this.updatePlaces);
    },


    render() {

        return ( <div className = "home">
                  <SearchOptions/>
                  <MobileHome/>
                    <div className="top-pics">
                      <h1>Todays Top Food Picks<span className="see-more" onClick={this.searchFood}>see more<i className="fa fa-arrow-right" aria-hidden="true"></i></span></h1>
                      <ul>
                      <li>
                        <h2>BELLY UP</h2>
                        <img src="https://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png"/>
                        <img src="https://s3-media3.fl.yelpcdn.com/bphoto/vASKkDuOjvBphgUpr4a_zQ/ls.jpg"/>
                        <span><Link to="https://www.yelp.com/biz/belly-up-austin-2?osq=food" target="_blank">MORE INFO<i className="fa fa-arrow-right" aria-hidden="true"></i></Link></span>
                      </li>
                      <li>
                        <h2>HOT MESS</h2>
                        <img src="https://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png"/>
                        <img src="https://s3-media4.fl.yelpcdn.com/bphoto/3z0x1fC9mcsHzZ-aovchFA/ls.jpg"/>
                        <span><Link to="https://www.yelp.com/biz/hot-mess-austin-3?osq=food" target="_blank">MORE INFO<i className="fa fa-arrow-right" aria-hidden="true"></i></Link></span>
                      </li>
                      <li className="more-best">
                        <h2>LA BARBECUE</h2>
                        <img src="https://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png"/>
                        <img src="https://s3-media4.fl.yelpcdn.com/bphoto/ikhh2SEBOhuVOcv6Zmlu5w/ls.jpg"/>
                        <span><Link to="https://www.yelp.com/biz/la-barbecue-austin-3" target="_blank">MORE INFO<i className="fa fa-arrow-right" aria-hidden="true"></i></Link></span>
                      </li>

                      </ul>
                      <h1>Todays Top Adventure Picks<span className="see-more" onClick={this.searchAdventures}>see more<i className="fa fa-arrow-right" aria-hidden="true"></i></span></h1>
                      <ul>
                      <li>
                        <h2>AUSTIN BREWERY TOURS</h2>
                        <img src="https://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png"/>
                        <img src="https://s3-media2.fl.yelpcdn.com/bphoto/hP1nIodzRnBKj2J9WqOKLg/ls.jpg"/>
                        <span><Link to="https://www.yelp.com/biz/austin-brewery-tours-austin-4?osq=fun" target="_blank">MORE INFO<i className="fa fa-arrow-right" aria-hidden="true"></i></Link></span>
                      </li>
                      <li>
                        <h2>Blazer Tag</h2>
                        <img src="https://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png"/>
                        <img src="https://s3-media2.fl.yelpcdn.com/bphoto/gb3LnlMMxkc93s-PpRPs6A/ls.jpg"/>
                        <span><Link to="https://www.yelp.com/biz/blazer-tag-adventure-center-austin" target="_blank">MORE INFO<i className="fa fa-arrow-right" aria-hidden="true"></i></Link></span>
                      </li>
                      <li className="more-best">
                        <h2>ESTHERS FOLLIES</h2>
                        <img src="https://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png"/>
                        <img src="https://s3-media4.fl.yelpcdn.com/bphoto/HFlLOOS-Z12XqU-Ot94oBw/ls.jpg"/>
                        <span><Link to="https://www.yelp.com/biz/esthers-follies-austin-2" target="_blank">MORE INFO<i className="fa fa-arrow-right" aria-hidden="true"></i></Link></span>
                      </li>

                      </ul>
                      <h1>Todays Top Event Picks<span className="see-more" onClick={this.searchEvents}>see more<i className="fa fa-arrow-right" aria-hidden="true"></i></span></h1>
                      <ul>
                      <li>
                        <h2>THE MERRY MIX SHOW FT. TRAIN, FITZ AND THE TANTRUMS AND BLUE OCTOBER</h2>
                        <img src="https://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png"/>
                        <img src="https://s3-media1.fl.yelpcdn.com/ephoto/8dS3RgaL_gbcy2_GPumK2w/120s.jpg"/>
                        <span><Link to="https://www.yelp.com/events/cedar-park-mix-94-7-presents-the-merry-mix-show-2016-ft-train-fitz-and-the-tantrums-and-blue-october" target="_blank">MORE INFO<i className="fa fa-arrow-right" aria-hidden="true"></i></Link></span>
                      </li>
                      <li>
                        <h2>AUSTINS CARNAVAL BRASILERIRO</h2>
                        <img src="https://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png"/>
                        <img src="https://s3-media4.fl.yelpcdn.com/ephoto/1Rd0tzP80RC6iQM54FltzQ/300s.jpg"/>
                        <span><Link to="https://www.yelp.com/events/austin-austins-carnaval-brasileiro" target="_blank">MORE INFO<i className="fa fa-arrow-right" aria-hidden="true"></i></Link></span>
                      </li>
                      <li className="more-best">
                        <h2>BASKERVILLE, A SHERLOCK HOLMES MYSTERY</h2>
                        <img src="https://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png"/>
                        <img src="https://s3-media4.fl.yelpcdn.com/ephoto/ZkSPfdFA9iRaVaf3oRczng/300s.jpg"/>
                        <span><Link to="https://www.yelp.com/events/austin-baskerville-a-sherlock-holmes-mystery" target="_blank">MORE INFO<i className="fa fa-arrow-right" aria-hidden="true"></i></Link></span>
                      </li>

                      </ul>
                    </div>
                 </div>

              );
    },
    searchEvents() {
        let prefs = this.state.session.events;
        if (prefs) {
            let trueEvents = [];
            _.mapObject(prefs, function(val, key) {
                if (val === true) {
                    trueEvents.push(key);
                }
            });
            let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
            let mixedFood = _.shuffle(trueEvents);
            let selection = _.first(mixedFood);
            store.places.getEvents(selection);
        } else {
            let trueEvents = ['Attraction', 'Comedy', 'Festival', 'Holiday', 'Film', 'Music', 'Social', 'Sports'];
            let mixedEvents = _.shuffle(trueEvents);
            let selection = _.first(mixedEvents);
            store.places.getEvents(selection);
        }
    },
    searchFood() {

        let prefs = this.state.session.prefs;
        if (prefs) {
            let trueFoods = [];
            _.mapObject(prefs, function(val, key) {
                if (val === true) {
                    trueFoods.push(key);
                }
            });
            let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
            let mixedFood = _.shuffle(trueFoods);
            let selection = _.first(mixedFood);
            store.places.searchFood(selection, coordinates);
        } else {
          let trueFoods = ['American', 'BBQ', 'Burgers', 'Cafes', 'Chicken', 'Mexican', 'Chinese', 'Pizza', 'Italian', 'Deli', 'Diners', 'French', 'German', 'Greek', 'Asian', 'Indian', 'Tacos', 'Salad', 'Soup', 'Spanish', 'Texmex', 'Steakhouse', 'Foodtrucks'];
            let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
            let mixedFood = _.shuffle(trueFoods);
            let selection = _.first(mixedFood);
            store.places.searchFood(selection, coordinates);
        }
    },
    searchAdventures() {
        let prefs = this.state.session.adventure;

        if (prefs) {
            let weather = window.localStorage.getItem('description');
            let temp= window.localStorage.getItem('temp');
            let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
            let trueAdventures = [];
            if (weather.includes('rain') || temp<60) {
                _.mapObject(prefs, function(val, key) {
                    if (key.match(/^(arcades|Spas|Coffee|Bowling|escape|Aquariums|Lasertag|Movies|Bingo|shopping|Wineries|Breweries|Bookstores|Bars)$/) && val === true || temp<60) {
                        trueAdventures.push(key);
                    }
                });
                let mixedAdventures = _.shuffle(trueAdventures);
                let selection = _.first(mixedAdventures);
                store.places.searchAdventure(selection, coordinates);
            } else {
                _.mapObject(prefs, function(val, key) {
                    if (val === true) {
                        trueAdventures.push(key);
                    }
                });
                let mixedAdventures = _.shuffle(trueAdventures);
                let selection = _.first(mixedAdventures);
                store.places.searchAdventure(selection, coordinates);
            }
        } else {
          let weather=window.localStorage.getItem('description');
          let temp=window.localStorage.getItem('temp');
            if (weather.includes('rain')|| temp<60) {
                let trueAdventures = ['Arcades', 'Bars', 'Bingo', 'Bookstores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Aquariums', 'Breweries', 'GoKarts', 'Movies', 'Wineries'];
                let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
                let mixedAdventures = _.shuffle(trueAdventures);
                let selection = _.first(mixedAdventures);
                store.places.searchAdventure(selection, coordinates);
            } else {
                let trueAdventures = ['Arcades', 'Bars', 'Bingo', 'BookStores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Amusement', 'Aquariums', 'BikeRentals', 'Breweries', 'Canoeing', 'GoKarts', 'Kayaking', 'Hiking', 'Minigolf', 'Movies', 'PaddleBoarding', 'Paintball', 'Tours', 'Swimming', 'Tubing', 'Ziplining', 'Zoos', 'Wineries', ];
                let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
                let mixedAdventures = _.shuffle(trueAdventures);
                let selection = _.first(mixedAdventures);
                store.places.searchAdventure(selection, coordinates);
            }
        }
    }

});
