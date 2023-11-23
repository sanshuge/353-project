
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Login(props){
  const navigate = useNavigate();
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");


    // const handleRegister=()=>{
    //     fetch('http://localhost:3000/register', {
    //       method: 'POST', 
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //       },
    //       body: new URLSearchParams ({username:username,password:password}),
    //     })

    //     .then(response => {
    //       if (response.status === 400) {
    //           alert("user aleady exists, please log in")
    //       }
         
    //       if (response.status===200){
    //         alert("new user register successfully")
    //         setUsername("");
    //         setPassword("");
              
    //         navigate("/messages")
    //       }
    //   })
    //       .catch(err => console.error(err));
       
    //     }
    const handleRegister=()=>{
      fetch('http://localhost:3000/register', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams ({username:username,password:password}),
      })

      .then(response=>response.json())
      .then(alert("new users added"))
      .catch(err => console.error(err))
      setUsername("");
      setPassword("");
      navigate("/channels")
     
      }
        const handleLogIn = () => {
          fetch("http://localhost:3000/login", {
              method: "POST",
              body: new URLSearchParams({ username: username, password: password }),
              headers: { "Content-type": "application/x-www-form-urlencoded" }
          }).then(response => response.json())
          .then(alert("log in successfully"))
          .catch(err => console.error(err));
                            
               setUsername("");
                setPassword("");
                  
                navigate("/channels")
                         
             
      }

    return (<div className='p'>

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
