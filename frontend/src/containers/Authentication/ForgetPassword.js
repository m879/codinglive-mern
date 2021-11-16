import React from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import {useDispatch} from 'react-redux';
import { forgetPassword } from '../../redux/Actions/PasswordChange';

function ForgetPassword(){
  
    const dispatch = useDispatch();
    
    const handleClick=(event)=>{  
        dispatch(forgetPassword(event.target.email.value)); 
        event.preventDefault();     
    }
    return(
        <div className="container vh-height">
                <div className="row justify-content-center">
                    <Form className="col-11 col-md-7 border m-4 p-5 " onSubmit={handleClick}>
                    <div className="row mb-5 font-dark border-bottom">
                        <h3>Forget Password</h3>
                    </div>
                        <FormGroup className="row mb-4" >
                            <Label htmlFor="email">Your Registered Email : </Label>
                            <Input type="text" id="email" name="email"/>
                        </FormGroup>
                        <FormGroup className="row mb-4">
                            <Button className="col-4 btn-primary" >Confirm</Button>  
                        </FormGroup>    
                    </Form>
                </div>
        </div>
    );
}

export default ForgetPassword;