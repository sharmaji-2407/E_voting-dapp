import React from 'react';
import {Button} from 'react-bootstrap'
const VoteButton = (prop) => {

    const cast_vote = (e) => {
        e.preventDefault();
        if(prop.vote_id !==0 ) prop.castVote(Number(prop.vote_id))
        else window.alert('There is an error in submission.')
    }

    return (
        <div>
            <Button variant="primary" onClick={cast_vote}>Vote for Candidate id : {prop.vote_id}</Button>
        </div>
    );
}

export default VoteButton;
