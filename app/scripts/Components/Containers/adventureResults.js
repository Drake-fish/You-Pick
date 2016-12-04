import React from 'react';
import {browserHistory,Link} from 'react-router';
import _ from 'underscore';


import SearchList from '../../components/SearchList';
import store from '../../store';


export default React.createClass({
            getInitialState() {
                return {
                    places: store.places.toJSON(),
                    session: store.session.toJSON()
                }
            },
            componentWillMount() {
                store.session.on('change update', () => {
                        this.setState({
                            session: store.session.toJSON()
                        });
                    }),
                    store.places.on('change update', () => {
                        this.setState({
                            places: store.places.toJSON()
                        });
                    });
            },
            componentWillUnMount() {
                store.session.off('change update');
                store.places.off('change update');
            },

            render() {
                let searchDiv;
                let login = ( <h4 className = "login"> Want to make this more personal?<Link to ='login'>Login</Link></h4>);
                if (window.localStorage.getItem('user-token')) {
                    login = ( <h4> Want to make this more personal?<Link to ='preferences'> Update Preferences </Link></h4>);
                }
                if (this.state.places.length === 0) {
                    browserHistory.push('/');
                } else {
                    let searchTerm = this.state.places[0].searchTerm;
                    let results = this.state.places;
                    searchDiv = ( <div className = "search-results">
                                    <h3 className = "search-title"> How about {this.state.places[0].searchTerm}<span onClick = {this.research}> (Try Again)</span></h3>
                                    {login}
                                    <SearchList results = {results}/>
                                  </div>
                                );
                      }
                return (
                          <div>
                            {searchDiv}
                          </div>
                        );
                    },
                    research() {
                        let prefs = this.state.session.adventure;

                        if (prefs) {
                            let weather = window.localStorage.getItem('description');
                            let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
                            console.log('loggedin');
                            let trueAdventures = [];
                            if (weather.includes('rain')) {
                                console.log('its raining');
                                _.mapObject(prefs, function(val, key) {
                                    if (key.match(/^(arcades|Spas|Coffee|Bowling|escape|Aquariums|Lasertag|Movies|Bingo|shopping|Wineries|Breweries|Bookstores|Bars)$/) && val === true) {
                                        trueAdventures.push(key);
                                    }
                                });
                                let mixedAdventures = _.shuffle(trueAdventures);
                                let selection = _.first(mixedAdventures);
                                console.log('rain ' + selection);
                                store.places.searchAdventure(selection, coordinates);
                            } else {
                                _.mapObject(prefs, function(val, key) {
                                    if (val === true) {
                                        trueAdventures.push(key);
                                        console.log(key);
                                    }
                                });
                                let mixedAdventures = _.shuffle(trueAdventures);
                                let selection = _.first(mixedAdventures);
                                console.log('not raining ' + selection);
                                store.places.searchAdventure(selection, coordinates);
                            }
                        } else {
                            let weather = window.localStorage.getItem('description');
                            if (weather.includes('rain')) {
                                let trueAdventures = ['Arcades', 'Bars', 'Bingo', 'Bookstores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Aquariums', 'Breweries', 'GoKarts', 'Movies', 'Wineries'];
                                let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
                                let mixedAdventures = _.shuffle(trueAdventures);
                                let selection = _.first(mixedAdventures);
                                console.log(selection);
                                store.places.searchAdventure(selection, coordinates);
                            } else {
                                let trueAdventures = ['Arcades', 'Bars', 'Bingo', 'BookStores', 'Bowling', 'Coffee', 'Escape', 'LaserTag', 'Movies', 'Museums', 'Shopping', 'Spas', 'Trampolines', 'Amusement', 'Aquariums', 'BikeRentals', 'Breweries', 'Canoeing', 'GoKarts', 'Kayaking', 'Hiking', 'Minigolf', 'Movies', 'PaddleBoarding', 'Paintball', 'Tours', 'Swimming', 'Tubing', 'Ziplining', 'Zoos', 'Wineries', ];
                                let coordinates = [window.localStorage.getItem('latitude'), window.localStorage.getItem('longitude')];
                                let mixedAdventures = _.shuffle(trueAdventures);
                                let selection = _.first(mixedAdventures);
                                console.log(selection);
                                store.places.searchAdventure(selection, coordinates);
                            }
                        }
                    }

            });
