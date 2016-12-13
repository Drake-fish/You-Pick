import React from 'react';
import {StickyContainer,Sticky} from 'react-sticky';
import Header from '../header';
import Nav from '../Nav';
import store from '../../store';
import Weather from '../weather';
import Home from './home';
import BottomNav from '../BottomNav';
import Footer from '../footer';

export default React.createClass({

render(){
  return(
    <StickyContainer>
    <div id="app">
        <Nav/>
        {this.props.children}
        <BottomNav/>
        <Footer/>
    </div>
    </StickyContainer>
  );

}
});
