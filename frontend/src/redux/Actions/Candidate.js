import * as ActionTypes from '../ActionTypes';
import {statusUpdate} from './StatusUpdate';
import axios from "axios";

const baseUrl =process.env.REACT_APP_BASE_URL;

export const vacancy_list_update= (vacancy_list) => {
    return {
        type: ActionTypes.VACANCY_LIST_UPDATE,
        vacancy_list
    }
}

export const application_list_update= (application_list) => {
    return {
        type: ActionTypes.APPLICATION_LIST_UPDATE,
        application_list
    }
}

export const problem_fetch=(problem)=>{
    return{
        type: ActionTypes.PROBLEM_UPDATE,
        problem
    }
}

export const getvacancylist = () => (dispatch) => {
    
    const token = localStorage.getItem('token');
    const usertype = localStorage.getItem('usertype');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    dispatch(statusUpdate(true,null,''));
    axios.get(baseUrl+usertype+"/vacancy/list",config)
    .then(response => {
            dispatch(vacancy_list_update(response.data.vacancies));
            dispatch(statusUpdate(false,null,''));
    })
    .catch((error) =>{
        if(error.response) 
         dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
         else
        dispatch(statusUpdate(false,false,error.message));
    });
};

export const applyforjob = (id) =>(dispatch)=>{
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    dispatch(statusUpdate(true,null,''));
    axios.post(baseUrl+"candidate/vacancy/apply",{vacancyId:id},config)
    .then(response => {
        dispatch(statusUpdate(false,true,response.data.msg));
    })
    .catch((error) =>{
        if(error.response) 
         dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
         else
        dispatch(statusUpdate(false,false,error.message));
    });
} 

export const getapplicationlist = () => (dispatch) => {
    
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    dispatch(statusUpdate(true,null,''));
    axios.get(baseUrl+"candidate/application/list",config )
    .then(response => {
            console.log(response.data.applied)
            dispatch(application_list_update(response.data.applied));
            dispatch(statusUpdate(false,null,''));
    })
    .catch((error) =>{
        if(error.response) 
         dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
         else
        dispatch(statusUpdate(false,false,error.message));
    });
};

export const viewproblem = (appointmentId) => (dispatch) => {

    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    dispatch(statusUpdate(true,null,''));
    axios.post(baseUrl+"candidate/interview/problem/view",{id:appointmentId},config )
    .then(response => {
            console.log(response);
            dispatch(problem_fetch(response.data));
            dispatch(statusUpdate(false,null,''));
    })
    .catch((error) =>{
        if(error.response) 
         dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
         else
        dispatch(statusUpdate(false,false,error.message));
    });
};

export const submitproblem = (code,appointmentId) => (dispatch) => {

    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    dispatch(statusUpdate(true,null,''));
    axios.post(baseUrl+"candidate/interview/problem/submit",{code,id:appointmentId},config )
    .then(response => {
            dispatch(statusUpdate(false,true,response.data.msg));
    })
    .catch((error) =>{
        if(error.response) 
         dispatch(statusUpdate(false,false,"Error "+error.response.status+" : "+error.response.statusText));
         else
        dispatch(statusUpdate(false,false,error.message));
    });
};
