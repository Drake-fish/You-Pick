import React from 'react';

import store from '../store';

export default React.createClass({

render(){
    let weather=window.localStorage.getItem('description') || null;
    let temp=Math.round(window.localStorage.getItem('temp'));
    let location=window.localStorage.getItem('location');
    let weatherPic;
if(weather===null || weather.includes('sun')){
  weatherPic=(
<div className="icon sunny">
  <div className="sun">
    <div className="rays"></div>
  </div>
</div>
);
}
else if(weather.includes('rain') || weather.includes('mist')){
  weatherPic=(
  <div className="icon rainy">
      <div className="cloud"></div>
      <div className="rain"></div>
</div>
  );
}else if(weather.includes('cloud')){
  weatherPic=(
<div className="icon cloudy">
      <div className="cloud"></div>
      <div className="cloud"></div>
</div>
  );
}else if(weather.includes('thunder') || weather.includes('storm')){
  weatherPic=(
<div className="icon thunder-storm">
      <div className="cloud"></div>
      <div className="lightning">
        <div className="bolt"></div>
        <div className="bolt"></div>
      </div>
</div>
  )
}




    return(
      <div className="weather">
      <h3>Current Weather</h3>
      <h4>{location}</h4>
        {weatherPic}
      <div className="weather-info">
        <p className="temp">Temp: {temp}&deg;F</p>
        <p className="weather-description">{weather}</p>
      </div>
      </div>
    );
  }
});
