import './App.css';
import PlayerContainer from './Components/PlayerContainer/PlayerContainer'
// import React, {useEffect, useState} from 'react'
import ReactDOM  from 'react-dom'
import React from 'react' 

import {StoreProvider} from './store/store'
import Testing from './Test'
// import ReactWebComponent from "react-web-component"
import reactToWebComponent from "react-to-webcomponent";
import {BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom'
// import { useParams } from 'react-router-dom'




function App() {



 return (

  <StoreProvider>
    <Router>
      
  <div className="App">
  <Route path="/" >
    <div className="style_app">
    <PlayerContainer/>
    </div>
    </Route>
  </div>
  </Router>
  </StoreProvider>
 
  );
}

const webApp = reactToWebComponent(App, React, ReactDOM);

customElements.define("web-app", webApp);


export default App;
