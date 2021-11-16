import * as ActionTypes from '../ActionTypes';
import {statusUpdate} from './StatusUpdate';
import axios from "axios";
const baseUrl =process.env.REACT_APP_BASE_URL;

export const profile_update= (profile) => {
    return {
        type: ActionTypes.PROFILE_UPDATE,
        profile
    }
}


export const getProfile = ()=> (dispatch) => {
    dispatch(statusUpdate(true,null,''));
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    axios.get(baseUrl+"user/profile",config)
    .then(async (response) => {
            localStorage.setItem('profile',JSON.stringify(response.data));
            dispatch(profile_update(response.data));
            dispatch(statusUpdate(false,null,''));                      
    })
    .catch((error) =>{
        if(error.response) 
        dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
        else
        dispatch(statusUpdate(false,false,error.message));
    });    
}

export const updateProfile=(userdata)=>{
    console.log("Profile Update = ",userdata);
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    axios.put(baseUrl+"user/profile/update",userdata,config)
    .then((response) => {
       console.log(response.data);   
    })
    .catch((error) =>{
        console.log(error);
    });  
}

export const addProject=(projectData)=>{
    console.log("ADD PROJECTS = ",projectData);
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    axios.post(baseUrl+"user/profile/addProject",projectData,config)
    .then((response) => {
       console.log(response.data);   
    })
    .catch((error) =>{
        console.log(error);
    });    
}

export const addExperience=(savedata)=>{
    console.log("ADD Expreience = ",savedata);
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    axios.post(baseUrl+"user/profile/addExperience",savedata,config)
    .then((response) => {
       console.log(response.data);   
    })
    .catch((error) =>{
        console.log(error);
    });  
}