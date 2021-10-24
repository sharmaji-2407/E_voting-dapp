import React from 'react';
import Votecard from './VoteCard';
import './Container.css'

const Vote = (prop) => {
    return (
        <div className="vote">
            <div className="candidates">
                <Votecard party={prop.candidate1.party} name={prop.candidate1.name} id={prop.candidate1.id}/>
                <Votecard party={prop.candidate2.party} name={prop.candidate2.name} id={prop.candidate2.id}/>
                <Votecard party={prop.candidate3.party} name={prop.candidate3.name} id={prop.candidate3.id}/>
            </div>
        </div>
    );
}

export default Vote;
