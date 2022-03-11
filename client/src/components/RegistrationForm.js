import React,{useState,useEffect} from 'react';
import {Form,FloatingLabel,Button} from 'react-bootstrap';
import '../css/Container.css';
import Axios from 'axios';

const RegistrationForm = () => {

    const [voterId, setvoterId] = useState('')
    const [voterName, setvoterName] = useState('')
    const [voterAadhar, setvoterAadhar] = useState('')
    
    const submitData=()=>{
        Axios.post("http://localhost:3001/api/insert",{voterId: voterId,voterName: voterName,voterAadhar: voterAadhar}).then(()=>{
            alert("Sent");
        });
    };

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response)=>{
            console.log(response.data);
        })
        
    }, []);

    return (
        <div>
            <FloatingLabel controlId="floatingInput" label="Voter ID" className="mb-3">
                <Form.Control type="text" placeholder="xxxxxxxxxxxx" onChange={(e)=>{
                    setvoterId(e.target.value)
                }} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Voter Name"  className="mb-3">
                <Form.Control type="text" placeholder="Narendra Modi" onChange={(e)=>{
                    setvoterName(e.target.value)
                }} />
            </FloatingLabel> 

            <FloatingLabel controlId="floatingInput" label="Aadhar Number" className="mb-3">
                <Form.Control type="text" placeholder="xxxxxxxxxxxx" onChange={(e)=>{
                    setvoterAadhar(e.target.value)
                }} />
            </FloatingLabel>

            <Button className='mx-auto main_btn' id="confirm_btn" onClick={submitData}> Confirm </Button>
        </div>
    )
}

export default RegistrationForm;
