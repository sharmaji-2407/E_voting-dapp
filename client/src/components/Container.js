import React,{useState} from 'react';
import { Button,Card } from 'react-bootstrap';
import '../css/Container.css';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';


const Container = (props) => {

    // const card_width = props.width;
    const [active_form, setactive_form] = useState(false);
    const [label, setlabel] = useState("active");
    

    const mount_form = (val) => {
        if(val === 'Get Registered') {
            setactive_form("registration_form");
            setlabel("inactive");
        
        }
        else 
        {
            setactive_form("login_form");
            setlabel("active");
        }
            
    }

    return (
        <div>
            
            <div className='cont' id="cont_id">
               {label === "active" &&
                <div className='label'>
                    <h3>{props.title}</h3>
                    <h5>{props.content}</h5>
                    <Button className="main_btn mx-auto" onClick={()=>mount_form(props.button)}>{props.button}</Button>

                </div>
               } 

               {active_form === "registration_form" &&
                <div className='form'>
                    <RegistrationForm />
                </div>
               }
               {active_form === "login_form" && 
               <div className='form'>
                    <LoginForm />
               </div>
               }
            
            </div>
            
        </div>
    );
}

export default Container;
