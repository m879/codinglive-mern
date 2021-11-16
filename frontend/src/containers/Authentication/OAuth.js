import React from 'react';
import { Button} from 'reactstrap';
import {statusUpdate} from '../../redux/Actions/StatusUpdate'
import {useDispatch} from 'react-redux'
const baseUrl =process.env.REACT_APP_BASE_URL;

function OAuth(){
  
   const dispatch=useDispatch();

   const handleGoogleConnect=()=>{
      dispatch(statusUpdate(true,null,''));
      window.location.href=baseUrl+'user/auth/google';
    }
   
    const handleFBConnect=()=>{
        dispatch(statusUpdate(true,null,''));
        window.location.href=baseUrl+'user/auth/facebook';
    }
   

    return(
        <React.Fragment >
            <div className="container text-center mb-5 border-top">
                <h4 className="mt-3">Or Join Using</h4>
                <div className="d-flex justify-content-center m-3">
                    <Button  onClick={handleGoogleConnect} className="col-4 col-md-3 mr-3 btn-primary mx-3">
                        <i className="fa fa-google"></i>
                    </Button>
                    <Button  onClick={handleFBConnect} className="col-4 col-md-3 btn-primary mx-3">
                        <i className="fa fa-facebook"></i>
                    </Button>
                </div>
            </div>
        </React.Fragment>
    )        
}

export default OAuth;