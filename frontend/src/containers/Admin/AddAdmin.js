/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-pascal-case */
import React,{useState} from "react";
import { Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors,} from 'react-redux-form';
import {Button} from 'reactstrap'
import {useDispatch} from 'react-redux';
import { CheckAvailability } from '../../redux/Actions/Signup';
import { statusUpdate } from '../../redux/Actions/StatusUpdate'
import ClickNHold from 'react-click-n-hold';
import {add_admin} from '../../redux/Actions/Admin'

const required = (val) => val && val.length;
const minLength = (len) => (val) => !(val) || (val.length >= len);

function AddAdmin(){
   
    const dispatch= useDispatch();
    const[showPass,setPass] = useState("password");

    return(
        <div className="container vh-height">
            <div className="row justify-content-center mt-5">
            <div className="col-11 col-md-8 mt-5 border shadow p-5">
                    <div className=" mb-5">
                        <h3 className="border-bottom font-dark">Create Admin Account</h3>
                    </div>
                   <Form model="CreateInfo" 
                        onSubmit={(values) => dispatch(add_admin(values))}
                        validators={{
                           '':{ 
                            passwordsMatch: (vals)=>!(vals.c_password)||(vals.password === vals.c_password),
                            required:(vals) => vals.username && vals.username.length,
                            validEmail:(vals) => !(vals.username) || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(vals.username)
                          },
                        }}
                        //asyncValidateOn="change"
                    >
                        <Row className="form-group frh">
                                <Label htmlFor="username" md={4}>Email</Label>
                                <Col md={8}>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="Email"
                                        className="form-control"                                      
                                        asyncValidators={
                                            {
                                                available: (val,done)=> dispatch(CheckAvailability(val))
                                                           .then(response=>done(response.data.available))
                                                           .catch(error => dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText))),                                                          
                                            }
                                        }  
                                        asyncValidateOn="change"     
                                    />                        
                                    <Errors
                                        className="text-danger small"
                                        model="CreateInfo"
                                        component="li"
                                        messages={{
                                            validEmail: 'Invalid Email Format ',
                                            required: 'Required '
                                        }}
                                    />
                                    <Errors
                                        className="text-danger small"
                                        model=".username"
                                        component="li"
                                        messages={{                                           
                                            available: 'Email already exists ',                                            
                                        }}
                                    />    
                                </Col>
                            </Row>
                            <Row className="form-group frh">
                                <Label htmlFor="password" md={4}>Create Password</Label>
                                <Col md={8} >
                                    <div className="d-flex">
                                        <Control.text model=".password" type={showPass} id="password" name="password"
                                            placeholder="Password"
                                            className="form-control col-10 "
                                            validators={{
                                                required, minLength: minLength(8)
                                            }}
                                        />                                            
                                        <ClickNHold className="btn" onStart={()=>setPass("text")} onEnd={()=>setPass("password")}>
                                            <i className="fa fa-eye "></i>
                                        </ClickNHold>
                                    </div>
                                    <Errors 
                                        className="text-danger small "
                                        model=".password"
                                        component="li"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must contain atleast 8 Letters '
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group frh">
                                <Label htmlFor="c_password" md={4}>Confirm Password</Label>
                                <Col md={8}>
                                    <Control.text model=".c_password" type="password" id="c_password" name="c_password"
                                        placeholder="Confirm Password"
                                        className="form-control"
                                        validators={{
                                            required, 
                                        }}
                                         />
                                    <Errors
                                        className="text-danger small"
                                        model=".c_password"
                                        show={{focus: false}}

                                        component="li"
                                        messages={{
                                            required: 'Required ',
                                        }}
                                     />
                                     <Errors model="CreateInfo"
                                        className="text-danger small"
                                        show={{touched: true, focus: false}}
                                        component="li"
                                        messages={{
                                            passwordsMatch: 'Passwords Must Match'
                                        }}
                                     />  
                                </Col>
                            </Row>             
                            <Row className="form-group text-center">
                                <Col>
                                    <Button type="submit" className="col-6 btn-primary">
                                         Create
                                    </Button>
                                </Col>
                            </Row>     
                   </Form>     
               </div>
            </div>
        </div>
    )
}

export default AddAdmin;