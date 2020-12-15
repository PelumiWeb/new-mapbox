import './App.css';
import PlayerContainer from './Components/PlayerContainer/PlayerContainer'
import React, {useEffect, useState} from 'react'
import {StoreProvider} from './store/store'
import Testing from './Test'


function App() {
 return (

  <StoreProvider>
  <div className="App">
    <PlayerContainer/>
  </div>
  </StoreProvider>
 
  );
}

export default App;
