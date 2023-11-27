import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Landing from './Landing'
import Messagges from './Messages'
import Channels from './Channels';
function App() {
  
  return (
    <div className="App">

<Router>
        {/* <Link to="/login">  <button> Login </button> </Link> */}
        {/* <Link to="/addPosts">  <button> Add Posts </button>   </Link> */}
         <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/messages" element={<Messagges/>}/>
          <Route path="/channels" element={<Channels/>}/> 
          <Route path="/channels/:channelid/:title" element={<Messagges/>} />
       
          </Routes>
        </Router>
    </div>
  );
}

export default App;
