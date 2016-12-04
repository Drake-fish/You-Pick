import React from 'react';
import {browserHistory,Link} from 'react-router';
import _ from 'underscore';


import EventList from '../../components/EventList';
import store from '../../store';


export default React.createClass({
  getInitialState(){
    return{
      places: store.places.toJSON(),
      session: store.session.toJSON()
    }
  },
  componentWillMount(){
    store.session.on('change update',()=>{
      this.setState({session:store.session.toJSON()});
    }),
    store.places.on('change update', ()=>{
      this.setState({places:store.places.toJSON()});
    });
  },
  componentWillUnMount(){
    store.session.off('change update', ()=>{
      this.setState({session:store.session.toJSON()});
    });
    store.places.off('change update', ()=>{
      this.setState({places:store.places.toJSON()})
    });
  },

  render(){
    let login=(
      <h4 className="login">Want to make this more personal? <Link to='login'>Login</Link></h4>
    );
    if(window.localStorage.getItem('user-token')){
      login=(<h4>Want to make this more personal?<Link to='preferences'>Update Preferences</Link></h4>
    );
    }
    let searchDiv;
    console.log(this.state);
    if(this.state.places.length===0){
      searchDiv=(
        <div className="empty-search">
          <h3 className="search-title">Click an option above to get started!</h3>
        </div>
      );
    }else{
      let results=this.state.places;
      let searchTerm=this.state.places[0].searchTerm;
      if(searchTerm.includes('festivals')){
        searchTerm='Festival';
      }else if(searchTerm.includes('singles')){
        searchTerm='Night Life';
      }else if(searchTerm.includes('outdoors')){
        searchTerm="Outdoor";
      }else if(searchTerm.includes('movies')){
        searchTerm="Film";
      }
      searchDiv=(
        <div className="search-results">
          <h3 className="search-title">{searchTerm} Events going on This Week<span onClick={this.research}>(Nope)</span></h3>
          {login}
          <EventList results={results}/>
        </div>
      );
    }
      return (<div>
                {searchDiv}
             </div>);
    },
    research(){
      let prefs=this.state.session.events;
      if(prefs){
                let trueEvents=[];
              _.mapObject(prefs,function(val,key){
                if(val===true){
                  trueEvents.push(key);
                }
              });
              let coordinates=[window.localStorage.getItem('latitude'),window.localStorage.getItem('longitude')];
              let mixedFood=_.shuffle(trueEvents);
              let selection=_.first(mixedFood);
              console.log(selection);
              store.places.getEvents (selection);
      }else{
            let trueEvents=['Attraction','Comedy','Festival_Parades','Holiday','Film','Music','Singles_social','Sports'];
            let mixedEvents=_.shuffle(trueEvents);
            let selection=_.first(mixedEvents);
            console.log(selection);
            store.places.getEvents(selection);
          }
  }
});
