import React,{useState} from 'react';
import { Button,Card } from 'react-bootstrap';
import '../css/Container.css';
import RegistrationForm from './RegistrationForm';


const Container = (props) => {

    // const card_width = props.width;
    const [active_form, setactive_form] = useState(false)
    

    const mount_form = (val) => {
        if(val === 'Get Registered') {setactive_form("registration_form");}
        else {setactive_form("login_form");}
            
    }

    return (
        <div>
            {/* <div className="content">
            
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.content}
                
                </p>
                <a href="#" className="btn btn-primary">Register</a>  450px 520px
            </div>

            </div> */}
            
            <Card style={{ width: props.width, height : props.height }} className="" id="reg_card">
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                    <Card.Text>
                    {props.content}
                    </Card.Text>
                    <Button className="main_btn mx-auto" onClick={()=>mount_form(props.button)} >{props.button}</Button>
                    
                </Card.Body>
                <div className='form'>
                    {active_form === "registration_form" && <RegistrationForm />}
                </div>
            </Card>
            
        </div>
    );
}

export default Container;
