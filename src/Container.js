import React from 'react';

const Container = (props) => {
    return (
        <div className="container card" >
            <div className="content">
            
            <div className="card-body">
                <h5 className="card-title">Registration</h5>
                <p className="card-text">Get Registered to cast your vote.
                <ol>
                    <li> Your Adhhar Number *</li>
                    <li> Your Live Photo *</li>
                </ol>
                </p>
                <a href="#" className="btn btn-primary">Register</a>
            </div>

            </div>
        </div>
    );
}

export default Container;
