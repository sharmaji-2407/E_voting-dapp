import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import Axios from 'axios';
import '../css/LoginForm.scss';
import show_pass_png from '../media/showPass.png';
import hide_pass_png from '../media/hidePass.png';



const LoginForm = (props) => {

  
  const [voterId, setvoterId] = useState('')
  const [voterPassword, setvoterPassword] = useState('')
  const [showPass, setshowPass] = useState("password");
  const [passwordPng, setpasswordPng] = useState(show_pass_png);
  
  const [logingStatus, setlogingStatus] = useState(false);
  
  

    const submitData = async ()=> {
      await Axios.post("http://localhost:3001/api/login",{voterId: voterId,voterPassword: voterPassword}).then((response)=>{
          console.log(response.data.voterId);
          if(!response.data.message){
            setlogingStatus(true);
          }  
      });
    };
    
  
  

  
  

    const sendLoginData = () => {

      props.sendLoginData(logingStatus);
      console.log(logingStatus);
    }

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
        <input type="text" id="text" className="form__input" autoComplete="off" placeholder=" " onChange={(e)=>{
          setvoterId(e.target.value) }}
        />
        <label htmlFor="email" className="form__label">Voter Id</label>
      </div>

      <div id='field2'> 
        <input type={showPass} id="password" className="form__input" autoComplete="off" placeholder=" " onChange={(e)=>{
          setvoterPassword(e.target.value) }}
        />
        <label htmlFor="password" className="form__label">Password</label>
        <img className='showpass' src={passwordPng} alt='Show Password' 
        onClick={()=>{changePassType(showPass)}}/>
      
      </div>
  
      
      </div>
      
      <Button  className='mx-auto main_btn' id="confirm_btn" onClick={() => { submitData(); sendLoginData(); } } >Confirm</Button>
      
      
  </div>
        
  )
}

export default LoginForm;