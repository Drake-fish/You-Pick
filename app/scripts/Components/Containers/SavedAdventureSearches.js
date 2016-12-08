import React from 'react';

import store from '../../store';
import SavedAdventureItem from '../SavedAdventureItem';
import SaveTabs from './SaveTabs';

export default React.createClass({
  getInitialState(){
    return{
      session:store.session.toJSON(),
    };
  },
  componentWillMount(){
    store.session.getSavedSearches('likedAdventures');
    store.session.on('update change',this.updateSession);
  },
  componentWillUnmount(){
    store.session.off('update change', this.updateSession);
  },
  updateSession(){
    this.setState({
      session:store.session.toJSON()
    });
  },
  render(){
    console.log('adventures mounted');
    let savedSearches;
    if(!this.state.session.savedSearches || this.state.session.savedSearches.length===0){
      savedSearches=<h3 className="no-saved">No Searches Saved Yet!</h3>;

    }else{
      console.log('mapping');
     savedSearches=this.state.session.savedSearches.map((search,i,arr)=>{
      return <SavedAdventureItem key={i} search={search}/>;
    });

  }
    return(
          <div className="searches-container">
              {savedSearches}
          </div>

    );
  }
});
