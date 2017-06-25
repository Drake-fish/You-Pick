import React from 'react';

import Header from '../header';
import BottomNav from '../BottomNav';
import Footer from '../footer';

export default React.createClass({

render(){
  return(
    <div id="app">
        <Header/>
        {this.props.children}
        <Footer/>
    </div>
  );

}
});
