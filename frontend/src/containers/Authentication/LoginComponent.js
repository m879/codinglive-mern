import React,{useState} from 'react';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import { loginUser } from '../../redux/Actions/Login';
import { Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import ClickNHold from 'react-click-n-hold';

function Login(){

    const dispatch = useDispatch();
    const[showPass,setPass] = useState("password");

    const auth = useSelector(state=>state.auth);
    
    const handleLogin=(event)=>{  
            dispatch(loginUser({ username: event.target.email.value, password: event.target.password.value}));      
            event.preventDefault();
    }

    return(
        
        <React.Fragment>
            {!auth.isAuthenticated?
                <div className="container mt-5">
                <div className="row justify-content-center ">
                    <Form className="col-11 col-md-7 border shadow m-4 p-5 " onSubmit={handleLogin}>
                    <div className="row mb-4 font-dark border-bottom">
                        <h3>Login</h3>
                    </div>
                        <FormGroup className="row mb-4" >
                            <Label htmlFor="email" className="p-0">Email</Label>
                            <Input type="text" id="email" name="email" className="mt-1"/>
                        </FormGroup>
                        <FormGroup className="row mb-4">
                            <Label htmlFor="password" className="col-12 p-0">Password</Label>
                            <div className='d-flex p-0'>
                            <Input type={showPass} id="password" name="password" className="mt-1"/>
                            <ClickNHold className="btn   col-2 col-lg-1" onStart={()=>setPass("text")} onEnd={()=>setPass("password")}>
                                <i className="fa fa-eye "></i>
                            </ClickNHold>
                            </div>
                        </FormGroup>
                        <FormGroup className="mb-4" style={{display:'flex',justifyContent:'space-between'}}>
                            <Button className=" btn-primary ml-0" type ="submit" value="submit" >Login</Button>
                            <div className="text-right p-0">  
                                <Link className=" font-dark text-decoration-none" to={`/forgetpassword`}>
                                    Forget Password
                                </Link>
                            </div>
                        </FormGroup>    
                    </Form>
                </div>
                </div>
                :
                <div>Login Success</div>
            }
       </React.Fragment>
    )        
}

export default Login;