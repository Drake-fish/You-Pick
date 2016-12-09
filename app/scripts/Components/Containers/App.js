import React from 'react';
import {StickyContainer,Sticky} from 'react-sticky';
import Header from '../header';
import Nav from '../Nav';
import store from '../../store';
import Weather from '../weather';
import Home from './home';

export default React.createClass({

render(){
  return(
    <StickyContainer>
    <div id="app">
          <Header/>
        {this.props.children}
    </div>
    </StickyContainer>
  );

}
});
