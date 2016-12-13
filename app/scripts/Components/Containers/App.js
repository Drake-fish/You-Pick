import React from 'react';
import {StickyContainer,Sticky} from 'react-sticky';

import Nav from '../Nav';
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
