import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Landing from './Landing'
import Channel from './Channel'
import Channels from './Channels';
function App(props) {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username,setUsername]= useState('')

  
  return (
    <div className="App">

<Router>
      
         <Routes>
          <Route exact path='/' element={<Landing  username = {username} loggedIn= {loggedIn} setLoggedIn={setLoggedIn}/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          {/* <Route path="/channel" element={<Channel username={username} />}/> */}
          <Route path="/channels" element={<Channels username={username}/>}/> 
          <Route path="/channels/:channelid/:title" element={<Channel  username={username}/>} />
       
          </Routes>
        </Router>
    </div>
  );
}

export default App;
