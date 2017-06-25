import React from 'react';

import store from '../store';

export default React.createClass({

render(){
    let weather=window.localStorage.getItem('description') || null;
    let temp=Math.round(window.localStorage.getItem('temp'));
    let location=window.localStorage.getItem('location');
    let weatherPic;

    if(weather===null || weather.includes('sun') || weather.includes('clear')){
      weatherPic=(<img className="weather-icon" src="http://icons.iconarchive.com/icons/icons-land/weather/256/Sunny-icon.png"/>);


      }else if(weather.includes('rain') || weather.includes('mist') || weather.includes('drizzle')){
        weatherPic=(<img className="weather-icon" src="http://www.clipartkid.com/images/579/cloudy-rain-weather-free-cliparts-that-you-can-download-to-you-ay4F5Z-clipart.png"/>);

      }else if(weather.includes('cloud') || weather.includes('haze') || weather.includes('overcast')){
        weatherPic=(<img className="weather-icon" src="http://www.clker.com/cliparts/D/q/H/o/9/m/partly-sunny-weather-icon-md.png"/>);

      }else if(weather.includes('thunder') || weather.includes('storm') || weather.includes('lightning')){
        weatherPic=(<img className="weather-icon" src="http://icons.iconarchive.com/icons/jaan-jaak/weather/256/thunder-lightning-storm-icon.png"/>);

        }

     return(
      <div className="weather">
          <span>{Math.round(window.localStorage.getItem('temp'))}°</span>{weatherPic}

      </div>
    );
  }
});
