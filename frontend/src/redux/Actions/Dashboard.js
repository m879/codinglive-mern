import * as ActionTypes from '../ActionTypes';
import {statusUpdate} from './StatusUpdate';
import axios from "axios";
const baseUrl =process.env.REACT_APP_BASE_URL;

export const getDashboardData = () => {
    console.log("Dashbaord Calling");
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return axios.get(baseUrl+"company/dashboard",config)
    .then((response) => {
        console.log(response.data);
          return response.data;                      
    })
    .catch((err) =>{
       console.log(err);
    });    
}

