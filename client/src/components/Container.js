import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import '../css/Container.css';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import back_arrow from "../media/Back_Arrow.png";
import chain_ani from "../media/connecting-blocks-unscreen.gif";

const Container = (props) => {

    // const card_width = props.width;
    const [active_form, setactive_form] = useState(false);
    //label is for activating label and when it is marked false form content will be activated
    const [label, setlabel] = useState("active");
    const [form, setform] = useState("inactive");
    

    

    const mount_form = (val) => {
        if(val === 'Get Registered')
        {
            setactive_form("registration_form");
            setlabel("inactive");
            setform("active");
            
        }
        else
        {
            setactive_form("login_form");
            setlabel("inactive");
            setform("active");
        }
            
    }

    const backBtn = () => {
        setlabel("active");
        setform("inactive");
    }
   

    return (
        <div>
        <div className='cont' id="cont_id">
        <img className="block_loading" src={chain_ani} alt="loaDING" 
        draggable="false" 
        onContextMenu={
            (e)=> e.preventDefault()} 
            title="Storing Data" />
               {label === "active" &&
                <div className='label'>
                    <h3>{props.title}</h3>
                    <h5>{props.content}</h5>
                    <Button className="main_btn mx-auto" onClick={()=>mount_form(props.button)}>{props.button}</Button>

                </div>
               } 

               {
                form === "active" && 
                    <div>
                    {active_form === "registration_form" &&
                        <div className='form'>
                        <img src={back_arrow} alt="back" className='back-btn' onClick={()=> backBtn() } />
                            <RegistrationForm />
                        </div>
                    }

                    {active_form === "login_form" && 
                        <div className='form'>
                        <img src={back_arrow} alt="back" className='back-btn' onClick={()=> backBtn() } />
                            <LoginForm />
                        </div>
                    }
                    </div>
               }
            



               </div>
               
            
        </div>
    );
}

export default Container;
