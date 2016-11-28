import $ from 'jquery'
import Backbone from 'backbone';
import { browserHistory } from 'react-router';


export default Backbone.Model.extend({
  initialize(){
    if(window.localStorage.getItem('user-token')){
      this.set('user-token',window.localStorage.getItem('user-token'));
    }
  },
  idAttribute:'objectId',
  defaults:{
    foodPreferences:['italian','french','pasta'],
    eventPreferences:['movies'],
    weather:''
  },
  validatePassword(password, confirmPassword){
    if(password===confirmPassword) return true;
    return false;
  },
  register(name,email,password){
    $.ajax({
      type:'POST',
      url:'https://api.backendless.com/v1/users/register',
      contentType:'application/json',
      data:JSON.stringify({
        name,
        email,
        password
      }),
      success:()=>{
        this.login(email,password);
      },
    });
  },
  login(email,password){
    $.ajax({
      type:'POST',
      url: 'https://api.backendless.com/v1/users/login',
      contentType:'application/json',
      data: JSON.stringify({
        login:email,
        password
      }),
      success:(response)=>{
        this.set(response);
        window.localStorage.setItem('user-token',response['user-token']);
        window.localStorage.setItem('name',response.name);
        browserHistory.push('/preferences');
      },
    });
  },
  logout(){
    $.ajax({
      contentType:'application/json',
      url:'https://api.backendless.com/v1/users/logout',
      success:()=>{
        this.clear();
        window.localStorage.clear();
        browserHistory.push('/');
      },
    });
  },
  getWeather(latitude,longitude){
    $.ajax({
      contentType:'application/json',
      url:`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=3c8ee52f0049cbe14298f23d5ff9b7be&units=imperial`,
      success:(response)=>{
        console.log(response);
        this.set({weather:response});
        window.localStorage.setItem('temp',response.main.temp);
        window.localStorage.setItem('description',response.weather[0].description);
        window.localStorage.setItem('location',response.name);
      },
      dataType:'jsonp'
    });
  }
});
