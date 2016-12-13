import React from 'react';


import store from '../store';

export default React.createClass({
  getInitialState(){
    return{
      session:store.session.toJSON(),
      places:store.places.toJSON()
    };
  },
  componentWillMount(){

  },
  componentWillUnmount(){

  },
  render(){
    return(
            <ul>
              <TopFoodItem places={this.state.places}/>
            </ul>

          );
  }
});
