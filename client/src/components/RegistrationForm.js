import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import '../css/Container.css';
import Axios from 'axios';
import show_pass_png from '../media/showPass.png';
import hide_pass_png from '../media/hidePass.png';



const RegistrationForm = () => {

    const [voterPassword, setvoterPassword] = useState('');
    const [voterName, setvoterName] = useState('');
    const [voterId, setvoterId] = useState('');
    const [showPass, setshowPass] = useState("password");
    const [passwordPng, setpasswordPng] = useState(show_pass_png);
    

    const submitData=()=>{
        Axios.post("http://localhost:3001/api/register",{voterId: voterId,voterName: voterName,voterPassword: voterPassword}).then(()=>{
            alert("Sent");
        });
    };


    const changePassType = (value) => {
        if(value === "password"){
          setshowPass("text");
          setpasswordPng(hide_pass_png);
        }
          else{
            setshowPass("password");
            setpasswordPng(show_pass_png);
          }
      }

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
                    <input type={showPass} id="password" className="form__input" autoComplete="off" placeholder=" " onChange={(e)=>{
                    setvoterPassword(e.target.value) }}
                    />
                    <label htmlFor="text" className="form__label">Set Password</label>
                    <img className='showpass' src={passwordPng} alt='Show Password' onClick={()=>{changePassType(showPass)}}/>
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
