import React from 'react';
import '../css/Counter.css';

const VoteCounter = (prop) => {
    return (
        <div className="counter">
            <h1>Vote</h1>
            <p> {prop.candidate1.party} : {prop.candidate1.voteCount} </p>
            <p> {prop.candidate2.party} : {prop.candidate2.voteCount}</p>
            <p> {prop.candidate3.party} : {prop.candidate3.voteCount}</p>


        </div>
    );
}

export default VoteCounter;
