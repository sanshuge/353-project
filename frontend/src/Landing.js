import React from 'react';
import { Link } from 'react-router-dom'; // 
import { useNavigate } from "react-router-dom";

import Login from './Login';
import"./Style.css"
export const Landing = (props) => {
    const { loggedIn, username } = props
    const navigate = useNavigate();


const handleClick=()=>{
    navigate("/login");

}

return (
    <div className='app'>
<p>
    this is the landing page for 353  
    <br></br> 
    step one : log in or register
    <br>
    </br>
     step two :go to channel you are interested in or create your own channel.
</p>
<div className="button">
            <input
                className="button"
                type="button"
                onClick={handleClick}
                value={loggedIn ? "Log out" : "Log in"} />
            {(loggedIn ? <div>
                Your username  is {username}
            </div> : <div/>)}
        </div>

<Link className='Link' to="/login">register here </Link>

</div>
);
}
export default Landing;