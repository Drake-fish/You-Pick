import React from 'react';

import store from '../store';

export default React.createClass({

render(){
    let weather=window.localStorage.getItem('description') || null;
    let temp=Math.round(window.localStorage.getItem('temp'));
    let location=window.localStorage.getItem('location');
    let weatherPic;

    if(weather===null || weather.includes('sun') || weather.includes('clear')){
      weatherPic=(
                  <div className="icon sunny">
                    <div className="sun">
                      <div className="rays"></div>
                    </div>
                  </div>
                 );

      }else if(weather.includes('rain') || weather.includes('mist') || weather.includes('drizzle')){
        weatherPic=(
                    <div className="icon rainy">
                        <div className="cloud"></div>
                        <div className="rain"></div>
                    </div>
                    );
      }else if(weather.includes('cloud') || weather.includes('haze')){
        weatherPic=(
                    <div className="icon cloudy">
                          <div className="cloud"></div>
                          <div className="cloud"></div>
                    </div>
                    );
      }else if(weather.includes('thunder') || weather.includes('storm') || weather.includes('lightning')){
        weatherPic=(
                    <div className="icon thunder-storm">
                      <div className="cloud"></div>
                      <div className="lightning">
                          <div className="bolt"></div>
                          <div className="bolt"></div>
                      </div>
                    </div>
                  );
        }

     return(
      <div className="weather">
        <div className="weather-icon">
          {weatherPic}
        </div>
        <div className="weather-info">
          <h3 className="current">Current Weather</h3>
          <h3>{weather}</h3>
        </div>
      </div>
    );
  }
});
