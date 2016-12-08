import React from 'react';

import store from '../store';
export default React.createClass({
  render(){
    console.log(this.props);
    return(
            <li className="saved-search">
                <div className="picture">
                  <img src={this.props.search.Picture}/>
                </div>
                <div className="info">
                  <i id="trash" onClick={this.delete} className="fa fa-trash-o" aria-hidden="true"></i>
                  <h3>{this.props.search.title}</h3>
                  <h3>{this.props.search.address}</h3>
                  <h3>{this.props.search.phone}</h3>
                  <a href={this.props.search.moreInfo} target="_blank"><img className="yelp-icon" src="https://s3-media2.fl.yelpcdn.com/assets/srv0/developer_pages/ebeb7fcf7307/assets/img/yelp-2c-outline.png"/></a>
                </div>
            </li>
    );
  },
  delete(){
    console.log('deleting');
    let objectId=this.props.search.objectId;
    store.session.deleteSearches(objectId,'likedFood');

  }
});
