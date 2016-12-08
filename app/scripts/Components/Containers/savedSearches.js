import React from 'react';

import store from '../../store';
import SavedItem from '../SavedItem';

export default React.createClass({
  getInitialState(){
    return{
      session:store.session.toJSON()
    };
  },
  componentWillMount(){
    store.session.getSavedSearches();
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
    console.log(this.state);
    let savedSearches;
    if(!this.state.session.savedSearches|| this.state.session.savedSearches.length===0){
      console.log('returning div');
      savedSearches=(<div>
                      <h3 className="no-saved">No Searches Saved Yet!</h3>
                     </div>);
    }else{
      console.log('mapping');
     savedSearches=this.state.session.savedSearches.map((search,i,arr)=>{
      return <SavedItem key={i} search={search}/>;
    });
  }
    return(<ul className="saved-searches">
            {savedSearches}
           </ul>

    );
  }
});
