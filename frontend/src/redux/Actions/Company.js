import {statusUpdate} from './StatusUpdate';
import { user_list_update } from './Admin';
import axios from "axios";
import {actions} from 'react-redux-form'; 

const baseUrl =process.env.REACT_APP_BASE_URL;

export const postVacancy=(VacancyInfo,ProblemInfo)=>(dispatch)=>{
    dispatch(statusUpdate(true,null,''));
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    axios.post(baseUrl+"company/vacancy/create",{
        ProblemInfo,
        VacancyInfo
    },config )
    .then((response) => {
            dispatch(statusUpdate(false,true,response.data.msg)); 
            dispatch(actions.reset('VacancyInfo'));
            dispatch(actions.reset('ProblemInfo'));                        
    })
    .catch((error) =>{
        if(error.response) 
         dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
         else
        dispatch(statusUpdate(false,false,error.message));
    });
}

//Vacancy List Fetch action used from candidate


export const getapplicantlist = (vacancyId) => (dispatch) => {
    
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    dispatch(statusUpdate(true,null,''));
    axios.post(baseUrl+"company/applicant/list",{vacancyId},config)
    .then(response => {
            dispatch(user_list_update(response.data.applicants));
            dispatch(statusUpdate(false,null,''));
    })
    .catch((error) =>{
        if(error.response) 
         dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
         else
        dispatch(statusUpdate(false,false,error.message));
    });
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const send_appl_status=(vacancyId,applicantId,approve)=>(dispatch)=>{
    dispatch(statusUpdate(true,null,''));
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    axios.post(baseUrl+"company/application/approval",{vacancyId,applicantId,approve},config )
    .then(async (response) => {
            dispatch(statusUpdate(false,true,response.data.msg)); 
             await sleep(2000);
            dispatch(getapplicantlist(vacancyId));                            
    })
    .catch((error) =>{
        if(error.response) 
         dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
         else
        dispatch(statusUpdate(false,false,error.message));
    });
}


export const assess=(appointmentId,status)=>(dispatch)=>{
    dispatch(statusUpdate(true,null,''));
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    axios.post(baseUrl+"company/selection",{id:appointmentId,status},config )
    .then(async (response) => {
            dispatch(statusUpdate(false,true,response.data.msg));                             
    })
    .catch((error) =>{
        if(error.response) 
         dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
         else
        dispatch(statusUpdate(false,false,error.message));
    });
}