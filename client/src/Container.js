import React from 'react';
import { Button,Card } from 'react-bootstrap';
import './Container.css';


const Container = (props) => {
    return (
        <div>
            {/* <div className="content">
            
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.content}
                
                </p>
                <a href="#" className="btn btn-primary">Register</a>
            </div>

            </div> */}
            <Card style={{ width: '20rem', height : "20rem" }} className="mx-auto">
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                    <Card.Text>
                    {props.content}
                    </Card.Text>
                    <Button variant="primary">{props.button}</Button>
                   
                </Card.Body>
            </Card>
        </div>
    );
}

export default Container;
