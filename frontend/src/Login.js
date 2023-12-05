
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Login(props){
  const navigate = useNavigate();
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");

    const handleRegister=()=>{
      fetch('http://localhost:3000/register', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams ({username:username,password:password}),
      })

      .then(response=>response.json())
      .then(data => {
        if (data.status === 'user_exists') {
          alert('User already exists, please log in.');
          
        } else if (data.status === 'success') {
          alert('New user registered successfully');
          console.log(username)
          props.setLoggedIn(true)
          props.setUsername(username)
          navigate("/channels");

        }
      })
      
     
      .catch(err => console.error(err))

      
     
      }
        const handleLogIn = () => {
          fetch("http://localhost:3000/login", {
              method: "POST",
              body: new URLSearchParams({ username: username, password: password }),
              headers: { "Content-type": "application/x-www-form-urlencoded" }
          }).then(response => response.json())
          .then(data=>{
            if (data.status === "user_not_found")
            {alert(
            "user does not exist, please register first"
            )}
            else if (data.status === 'incorrect_password') {
              alert('Incorrect password. Please try again.');
            } else if (data.status === 'success') {
              alert('Log in successfully'); 
              setUsername("");
              setPassword("");
              props.setLoggedIn(true)
                props.setUsername(username)
              navigate("/channels");
              console.log(username)

            }

          })

          .catch(err => console.error(err));
                            
              
                 
            
                         
             
      }

    return (<div className='app'>

<>
        <h3> Log in </h3>
        <div>
        
        <input className="input"type="text" placeholder="username" value={username} 
        onChange={e => setUsername(e.target.value)} /><br/>
        <input className="input" type="text" placeholder="password" value={password} 
        onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="button" onClick={handleRegister}>register</button>
        <button className="button" onClick={handleLogIn}>log in</button>      
    </>

    </div>
    
    
    );
}
export default Login;
