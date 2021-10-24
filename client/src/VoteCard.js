import React from 'react';
import { Button,Card } from 'react-bootstrap';

const Votecard = (props) => {
    return (
        <div>
            <Card style={{ width: '20rem', height : "12rem" }}>
                <Card.Body>
                    <Card.Title>Candidate ID : {props.id}</Card.Title>
                    <h2>{props.party} </h2>
                    {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                    <Card.Text>
                    
                    {props.name}
                    </Card.Text>
                    <Button variant="primary">Vote</Button>
                   
                </Card.Body>
            </Card>
        </div>
    );
}

export default Votecard;
