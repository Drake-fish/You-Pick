import React from 'react';


import store from '../store';
export default React.createClass({
  render(){
    console.log(this.props);
    return(
      <li className="event-result">
          <i id="event-trash" onClick={this.delete} className="fa fa-trash-o" aria-hidden="true"></i>
          <div className="event-title">
            <h3 className="business-name">{this.props.search.title}</h3>
           </div>
            <img src={this.props.search.picture}/>
                <div className="event-contact">
                    <h4 className="event-name">{this.props.search.address}</h4>
                    <h4>{this.props.search.phone}</h4>
                    <a href={this.props.search.moreInfo} target="_blank"><img className="yelp-icon" src="https://s3-media2.fl.yelpcdn.com/assets/srv0/developer_pages/ebeb7fcf7307/assets/img/yelp-2c-outline.png"/></a>
                </div>
        </li>
    );
  },
  delete(){
    console.log('deleting');
    let objectId=this.props.search.objectId;
    store.session.deleteSearches(objectId,'likedAdventures');

  }
});
