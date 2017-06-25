import React from 'react';
import {Link} from 'react-router';

import Weather from './weather';
export default React.createClass({
  render(){
    return(
      <footer>
        <span>&copy;Drake Fish 2016</span>
        <Link to="https://twitter.com/DrakeATX" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></Link>
        <Link to="https://www.linkedin.com/in/drake-fish-94a46694" target="_blank"><i className="fa fa-linkedin" aria-hidden="true"></i></Link>
        <Link to="https://www.github.com/drake-fish" target="_blank"><i className="fa fa-github" aria-hidden="true"></i></Link>
      </footer>
    );
  }
});
