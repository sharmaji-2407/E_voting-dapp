import React from 'react';
import {Form,FloatingLabel} from 'react-bootstrap';
import '../css/Container.css';
const RegistrationForm = () => {
    return (
        <div>
            <FloatingLabel controlId="floatingInput" label="Voter ID" className="mb-3">
                <Form.Control type="text" placeholder="xxxxxxxxxxxx" />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Voter Name">
                <Form.Control type="text" placeholder="Narendra Modi" />
            </FloatingLabel> 
        </div>
    )
}

export default RegistrationForm;
