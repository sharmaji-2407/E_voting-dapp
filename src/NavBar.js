import React from 'react';
import './Nav.css'
const Navbar = () => {
    return (
        <div>
            
            <ul className="topnav">
                <li><a className="active" href="Home.html">Home</a></li>
                <li><a href="Page1.html">Page1</a></li>
                <li><a href="Page2.html">Page2</a></li>
                <li className="right"><a href="About.html">About</a></li>
            </ul>

        </div>
    );
}

export default Navbar;
