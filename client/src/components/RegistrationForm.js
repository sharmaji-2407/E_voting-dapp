import React,{useState,useEffect} from 'react';
import {Form,FloatingLabel,Button} from 'react-bootstrap';
import '../css/Container.css';
import Axios from 'axios';

const RegistrationForm = () => {

    const [voterPassword, setvoterPassword] = useState('')
    const [voterName, setvoterName] = useState('')
    const [voterId, setvoterId] = useState('')
    
    const submitData=()=>{
        Axios.post("http://localhost:3001/api/insert",{voterId: voterId,voterName: voterName,voterPassword: voterPassword}).then(()=>{
            alert("Sent");
        });
    };

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response)=>{
            console.log(response.data);
            console.log("yes");
        })
        
    }, []);

    return (
        <div>
            <div className="loginform">
                <div id='field1'> 
                    <input type="text" id="name" className="form__input" autoComplete="off" placeholder=" " onChange={(e)=>{
                        setvoterName(e.target.value) }}
                    />
                    <label htmlFor="text" className="form__label">Name</label>
                </div>
        
                <div id='field2'>
                    <input type="password" id="password" className="form__input" autoComplete="off" placeholder=" " onChange={(e)=>{
                    setvoterPassword(e.target.value) }}
                    />
                    <label htmlFor="text" className="form__label">Set Password</label>
                </div>

                
                <div id='field3'> 
                    <input type="text" id="Id" className="form__input" autoComplete="off" placeholder=" " onChange={(e)=>{
                        setvoterId(e.target.value) }}
                    />
                    <label htmlFor="text" className="form__label">Voter Id </label>
                </div>

            </div>

            
                <Button  className='mx-auto main_btn' id="confirm_btn" onClick={submitData} >Confirm</Button>
            
      
        </div>
    )
}

export default RegistrationForm;
