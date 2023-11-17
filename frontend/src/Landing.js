import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Login from './Login';

export const Landing = () => {
return (
    <div>
<h3> Landing </h3>
<p>
    this is the landing page for 353 
    <br></br>
    <Link to="/login">go to login </Link>
</p>
</div>
);
}
export default Landing;