import {statusUpdate} from './StatusUpdate';
import axios from "axios";
const baseUrl =process.env.REACT_APP_BASE_URL;

export const forgetPassword =(username)=>(dispatch)=>{
 dispatch(statusUpdate(true,null,''));
 axios.post(baseUrl+"user/forgetpassword", {
   username: username
 })
 .then(response=>{
     dispatch(statusUpdate(false,true,response.data.msg))
    })
    .catch((error) =>{
      if(error.response) 
       dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
       else
      dispatch(statusUpdate(false,false,error.message));
    });
};

export const resetPassword =(token,userId,password)=>async (dispatch)=>{
  dispatch(statusUpdate(true,null,''));
  axios.post(baseUrl+"user/resetpassword", {
    token: token,
    userId: userId,
    password: password
  })
  .then(response=>{
      dispatch(statusUpdate(false,true,response.data.msg))     
     })
     .catch((error) =>{
      if(error.response) 
       dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
       else
      dispatch(statusUpdate(false,false,error.message));
    });
 };