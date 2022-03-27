import React,{useState,useEffect,useRef} from 'react';
import {Form,FloatingLabel,Button} from 'react-bootstrap';
// import '../css/Container.css';
import Axios from 'axios';
import '../css/LoginForm.scss';


const LoginForm = () => {
  const [voterId, setvoterId] = useState('')
    
    const [voterPassword, setvoterPassword] = useState('')
    
    const submitData=()=>{
        Axios.post("http://localhost:3001/api/insert",{voterId: voterId,voterPassword: voterPassword}).then(()=>{
            alert("Sent");
        });
    };
  return (
    <div>

      <div className="loginform">

      <div id='field1'>
        <input type="text" id="text" className="form__input" autoComplete="off" placeholder=" " onChange={(e)=>{
          setvoterId(e.target.value) }}
        />
        <label htmlFor="email" className="form__label">Voter Id</label>
      </div>

      <div id='field2'> 
        <input type="text" id="password" className="form__input" autoComplete="off" placeholder=" " onChange={(e)=>{
          setvoterPassword(e.target.value) }}
        />
        <label htmlFor="password" className="form__label">Password</label>
      
      </div>
      
      
      </div>
      
      <Button  className='mx-auto main_btn' id="confirm_btn" onClick={submitData}>Confirm</Button>
      
      
  </div>
        
  )
}

export default LoginForm;