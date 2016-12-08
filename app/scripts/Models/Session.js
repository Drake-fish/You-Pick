import $ from 'jquery'
import Backbone from 'backbone';
import {
    browserHistory
} from 'react-router';
import store from '../store';



export default Backbone.Model.extend({
    initialize() {
        if (window.localStorage.getItem('user-token')) {
            this.set('user-token', window.localStorage.getItem('user-token'));
        }
    },
    url: `https://api.backendless.com/v1/data/foodPreferences/${window.localStorage.getItem('objectId')}`,
    idAttribute: 'objectId',

    validatePassword(password, confirmPassword) {
        if (password === confirmPassword) return true;
        return false;
    },
    register(name, email, password) {
        $.ajax({
            type: 'POST',
            url: 'https://api.backendless.com/v1/users/register',
            contentType: 'application/json',
            data: JSON.stringify({
                name,
                email,
                password,
                foodPreferences: [{
                    ___class: 'foodPreferences',
                    american: true
                }],
                eventPreferences: [{
                    ___class: 'eventPreferences',
                    music: true
                }],
                adventPreferences: [{
                    ___class: 'adventPreferences',
                    bowling: true
                }],
            }),
            success: () => {
                this.login(email, password);
            },
        });
    },
    login(email, password) {
        $.ajax({
            type: 'POST',
            url: 'https://api.backendless.com/v1/users/login',
            contentType: 'application/json',
            data: JSON.stringify({
                login: email,
                password
            }),
            success: (response) => {
                console.log(response);
                this.set({
                    prefs: response.foodPreferences[0],
                    events: response.eventPreferences[0],
                    adventure: response.adventPreferences[0],
                    likedSearches:response.likedSearches[0]
                });
                window.localStorage.setItem('foodObjectId', response.foodPreferences[0].objectId);
                window.localStorage.setItem('eventObjectId', response.eventPreferences[0].objectId);
                window.localStorage.setItem('adventureObjectId', response.adventPreferences[0].objectId);
                window.localStorage.setItem('user-objectId', response.objectId);
                window.localStorage.setItem('user-token', response['user-token']);
                window.localStorage.setItem('name', response.name);
                browserHistory.push('/preferences');
            },
        });
    },
    logout() {
        $.ajax({
            contentType: 'application/json',
            url: 'https://api.backendless.com/v1/users/logout',
            success: () => {
                window.localStorage.removeItem('user-token');
                window.localStorage.removeItem('name');
                window.localStorage.removeItem('adventureObjectId');
                window.localStorage.removeItem('eventObjectId');
                window.localStorage.removeItem('objectId');
                window.localStorage.removeItem('user-objectId');
                browserHistory.push('/');
            },
        });
    },
    forgotPassword(email){
      $.ajax({
        url:`https://api.backendless.com/v1/users/restorepassword/${email}`,
        success:(response)=>{
          console.log(response);
        }
      });
    },

    getWeather(latitude, longitude) {
        $.ajax({
            contentType: 'application/json',
            url: `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=3c8ee52f0049cbe14298f23d5ff9b7be&units=imperial`,
            success: (response) => {
                window.localStorage.setItem('temp', response.main.temp);
                window.localStorage.setItem('description', response.weather[0].description);
                window.localStorage.setItem('location', response.name);
            },
            dataType: 'jsonp'
        });
    },
    removeFood(value) {
        //this code is for inserting a variable as a key into an ajax request!
        let key = value;
        let className = '___class';
        let objectId = 'objectId';
        var obj = {};
        obj[key] = false;
        obj[className] = 'foodPreferences';
        obj[objectId] = window.localStorage.getItem('user-objectId');
        console.log(obj);
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: `https://api.backendless.com/v1/data/foodPreferences/${window.localStorage.getItem('foodObjectId')}`,
            data: JSON.stringify(obj),
            success: (response) => {
                this.set({
                    prefs: response
                });
            }
        });
    },

    addFood(value) {
        let key = value;
        let className = '___class';
        let objectId = 'objectId';
        var obj = {};
        obj[key] = true;
        obj[className] = 'foodPreferences';
        obj[objectId] = window.localStorage.getItem('user-objectId');

        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: `https://api.backendless.com/v1/data/foodPreferences/${window.localStorage.getItem('foodObjectId')}`,
            data: JSON.stringify(obj),
            success: (response) => {
                this.set({
                    prefs: response
                });
            }
        });
    },
    removeAdventure(value) {
        //this code is for inserting a variable as a key into an ajax request!
        let key = value;
        let className = '___class';
        let objectId = 'objectId';
        var obj = {};
        obj[key] = false;
        obj[className] = 'adventPreferences';
        obj[objectId] = window.localStorage.getItem('user-objectId');
        console.log(obj);
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: `https://api.backendless.com/v1/data/adventPreferences/${window.localStorage.getItem('adventureObjectId')}`,
            data: JSON.stringify(obj),
            success: (response) => {
                this.set({
                    adventure: response
                });
            }
        });
    },

    addAdventure(value) {
        let key = value;
        let className = '___class';
        let objectId = 'objectId';
        var obj = {};
        obj[key] = true;
        obj[className] = 'adventurePreferences';
        obj[objectId] = window.localStorage.getItem('user-objectId');

        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: `https://api.backendless.com/v1/data/adventPreferences/${window.localStorage.getItem('adventureObjectId')}`,
            data: JSON.stringify(obj),
            success: (response) => {
                this.set({
                    adventure: response
                });
            }
        });
    },
    addEvent(value) {
        let key = value;
        let className = '___class';
        let objectId = 'objectId';
        var obj = {};
        obj[key] = true;
        obj[className] = 'eventPreferences';
        obj[objectId] = window.localStorage.getItem('user-objectId');

        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: `https://api.backendless.com/v1/data/eventPreferences/${window.localStorage.getItem('eventObjectId')}`,
            data: JSON.stringify(obj),
            success: (response) => {
                this.set({
                    events: response
                });
            }
        });
    },
    removeEvent(value) {
        //this code is for inserting a variable as a key into an ajax request!
        let key = value;
        let className = '___class';
        let objectId = 'objectId';
        var obj = {};
        obj[key] = false;
        obj[className] = 'eventPreferences';
        obj[objectId] = window.localStorage.getItem('user-objectId');
        console.log(obj);
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: `https://api.backendless.com/v1/data/eventPreferences/${window.localStorage.getItem('eventObjectId')}`,
            data: JSON.stringify(obj),
            success: (response) => {
                this.set({
                    events: response
                });
            }
        });
    },
    addSearch(picture,title,address,phone,moreInfo,type){
      console.log(type);
      $.ajax({
        type:'POST',
        contentType:'application/json',
        url:`https://api.backendless.com/v1/data/${type}`,
        data:JSON.stringify({
          picture,
          title,
          address,
          phone,
          moreInfo,
        })
      });
    },
    getSavedSearches(type){
      console.log(type);
      $.ajax({
        url:`https://api.backendless.com/v1/data/${type}`,
        success:(response)=>{
          let searches=response.data.filter((search,i,arr)=>{
            if(search.ownerId===window.localStorage.getItem('user-objectId')){
              return search;
            }
          });
          this.set({
            savedSearches:searches
          });

        }
      });
    },
    deleteSearches(objectId,type){
      $.ajax({
        type:'DELETE',
        url:`https://api.backendless.com/v1/data/${type}/${objectId}`,
        success:()=>{
          this.getSavedSearches(type);
        }
    });
  }
});
