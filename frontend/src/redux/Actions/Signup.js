import { loginUser } from "./Login";
import { statusUpdate } from "./StatusUpdate";
import { actions } from "react-redux-form";
import axios from "axios";
const baseUrl =process.env.REACT_APP_BASE_URL;

export const CheckAvailability = (username) => (dispatch) => { 
  console.log("CHECK AVAILafdgdsadfg");
  return axios.post(baseUrl + 'user/signup/searchemail', {
      username:username
  })
};



export const Signup = (SignUpInfo) => (dispatch) => { 
    dispatch(statusUpdate(true,null,''));
    axios.post(baseUrl + 'user/signup/candidate', {
        SignUpInfo
    })
    .then(response => {
        dispatch(actions.reset('SignUpInfo'));
        dispatch(statusUpdate(true,true,response.data.msg))
        setTimeout(()=>{dispatch(loginUser( {username: SignUpInfo.username,password: SignUpInfo.password}))},2000); 
      } 
    )
    .catch((error) =>{
      if(error.response) 
       dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
      else
        dispatch(statusUpdate(false,false,error.message));
    });
};



export const Apply = (ApplyInfo) => (dispatch) => { 
  dispatch(statusUpdate(true,null,''));
  axios.post(baseUrl + 'user/apply/company', {
      ApplyInfo
  })
  .then(response => {
      dispatch(actions.reset('ApplyInfo'));
      dispatch(statusUpdate(false,true,response.data.msg))
    } 
  )
  .catch((error) =>{
    if(error.response) 
     dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
     else
    dispatch(statusUpdate(false,false,error.message));
  });
}
