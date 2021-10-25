import React from 'react';
import {Button} from 'react-bootstrap'
const VoteButton = (prop) => {
    return (
        <div>
            <Button variant="primary">Vote for Candidate id : {prop.vote_id}</Button>
        </div>
    );
}

export default VoteButton;
