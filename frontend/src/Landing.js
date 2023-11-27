import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Login from './Login';
import"./Style.css"
export const Landing = () => {
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
<Link className='Link' to="/login">go to login page </Link>
</div>
);
}
export default Landing;