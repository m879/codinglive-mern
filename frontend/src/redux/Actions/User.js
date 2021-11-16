//Contain actions common to all users

import * as ActionTypes from '../ActionTypes';
import {statusUpdate} from './StatusUpdate';
import axios from "axios"; 

const baseUrl =process.env.REACT_APP_BASE_URL;

export const interview_list_update= (interview_list) => {
    return {
        type: ActionTypes.INTERVIEW_LIST_UPDATE,
        interview_list
    }
}

export const getinterviewlist = () => (dispatch) => {
    
    const token = localStorage.getItem('token');
    const usertype = localStorage.getItem('usertype');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    dispatch(statusUpdate(true,null,''));
    axios.get(baseUrl+usertype+"/interview/list",config)
    .then(response => {
            console.log("ACTION COMPANY INTERVIEW LIST",response.data);
            dispatch(interview_list_update(response.data));
            dispatch(statusUpdate(false,null,''));
    })
    .catch((error) =>{
        if(error.response) 
         dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
         else
        dispatch(statusUpdate(false,false,error.message));
    });
};