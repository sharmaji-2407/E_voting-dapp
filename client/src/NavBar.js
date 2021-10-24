import React from 'react';
import './Nav.css';

const Navbar = (props) => {
    return (
        <div>
            
            <ul className="topnav">
                {/* <li><a href="Page1.html">Page1</a></li>
                <li><a href="Page2.html">Page2</a></li> */}
                <li className="right"><a href="">About</a></li>
                <li>Home</li>
                <li className="right"><a href="">{props.account}</a></li>
            </ul>

        </div>
    );
}

export default Navbar;
