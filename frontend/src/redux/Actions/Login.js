import * as ActionTypes from '../ActionTypes';
import {statusUpdate} from './StatusUpdate';
import axios from "axios";
const baseUrl =process.env.REACT_APP_BASE_URL; //No need to add dotenv in react if all variable have REACT_APP suffix

//This is the action creator which sets the parameter as such
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
    }
}
 

export const receiveLogin = (response,creds) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token,
        usertype: response.usertype, 
        creds
    }
}
  
export const loginError = () => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
    }
}

export const loginUser = (creds) => async (dispatch) => {
    try{
         dispatch(requestLogin());
         dispatch(statusUpdate(true,null,''));
        const response = await axios.post(baseUrl+"user/login", {
            username:creds.username,
            password:creds.password
        })
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('creds', (creds.username));
        localStorage.setItem('usertype',response.data.usertype);
         dispatch(receiveLogin(response.data,creds.username));
         dispatch(statusUpdate(false,true,response.data.msg));
         
    }  
    catch(error){
        dispatch(loginError());
        if(error.response) 
         dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
        else
         dispatch(statusUpdate(false,false,error.message));
    }
};



export const OAuthConnect = (url) => (dispatch) => {
            dispatch(statusUpdate(true,null,''));
            var success=url.searchParams.get("success");            
            dispatch(requestLogin());
            if(success==="true"){
                var token=url.searchParams.get("token");
                var creds=url.searchParams.get("username");
                var usertype=url.searchParams.get("usertype");
                localStorage.setItem('token', token);
                localStorage.setItem('creds', creds);
                localStorage.setItem('usertype',usertype);
                var response={
                    token: token,
                    usertype: usertype
                }
                dispatch(receiveLogin(response,creds));
                dispatch(statusUpdate(false,true,'Login Successfull!!'));
            }
            else{
                var errmsg=url.searchParams.get("errmsg");
                dispatch(loginError());
                dispatch(statusUpdate(false,false,"Error "+errmsg))   
            }
            // We dispatch requestLogin to kickoff the call to the API;   
}