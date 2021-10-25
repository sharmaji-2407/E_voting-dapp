import React from 'react';
import {Card} from 'react-bootstrap';
import './Container.css';
const Votecard = (props) => {
    return (
        <div >
            <Card className="vote_card" style={{ width: '20rem', height : "12rem" }}>
                <Card.Body >
                    <Card.Title >Candidate ID : {props.id}</Card.Title>
                    <h2>{props.party} </h2>
                    {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                    <Card.Text>
                    {props.name}
                    
                    </Card.Text>
                    
                   
                </Card.Body>
            </Card>
        </div>
    );
}

export default Votecard;
