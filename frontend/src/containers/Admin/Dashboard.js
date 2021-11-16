/* eslint-disable react-hooks/exhaustive-deps */

import React,{useEffect} from 'react';
import { Card,CardImg,CardHeader } from 'reactstrap';
import { Media } from 'reactstrap';
import userslogo from '../../shared/Users.PNG';
import companylogo from '../../shared/company.PNG';
import candidatelogo from '../../shared/candidate.PNG';
import adminlogo from '../../shared/Admin.PNG';
import testgraph from '../../shared/Testgraph.PNG'
import { get_report } from '../../redux/Actions/Admin';
import { useDispatch,useSelector} from 'react-redux';


const Dashboard = () =>{
 
 const dispatch = useDispatch();
 
 const user_report= useSelector(state=>state.user_report);
 
 useEffect(()=>{
   dispatch(get_report());
 },[])

  return (
      <div className="container-fluid my-5">
        <div className="row frh"></div>
        <div className="row justify-content-around"> {/*for top margin*/}
          
          <Card className="col-11 col-md-9 col-lg-7 col-xl-6 p-0 shadow">
            <CardHeader className="bgc-dark">Jobs Analytics</CardHeader>
            <CardImg  className="p-4" src={testgraph}/>
          </Card>

          <div className="row shadow justify-content-around m-5 m-lg-0 col-md-10 col-lg-4 col-xl-3 p-0">            
            
            <Media className=" p-3 border col-md-6 col-lg-12 d-flex justify-content-around align-items-center bgc-dark">
              <Media left middle className="col-4 col-lg-3 ">
                <Media className="frh" object src={userslogo} alt="users" />
              </Media>
              <Media body className="col-7 col-md-8 col-lg-8 text-right">
                <span className="h1">{user_report.users}</span>
                <span className="font-weight-bold"><br/>User Accounts</span>
              </Media>
            </Media>

            <Media className=" p-3 col-md-6 col-lg-12 justify-content-around d-flex align-items-center bgc-light">
              <Media left middle className="col-4 col-lg-3 ">
                <Media className="frh " object src={companylogo} alt="company" />
              </Media>
              <Media body className="col-7 col-md-8 col-lg-8 text-right">
                <span className="h1">{user_report.companies}</span>
                <span className="font-weight-bold"><br/>Company Accounts</span>
              </Media>
            </Media>

            <Media className=" p-3 col-md-6 col-lg-12  justify-content-around d-flex  align-items-center bgc-light">
              <Media left middle className="col-4 col-lg-3 ">
                <Media className="frh" object src={candidatelogo} alt="candidate" />
              </Media>
              <Media body className="col-7 col-md-8 col-lg-8 text-right">
                <span className="h1">{user_report.candidates}</span>
                <span className="font-weight-bold"><br/>Candidate Accounts</span>
              </Media>
            </Media>
            
            <Media className=" p-3 col-md-6 col-lg-12 justify-content-around d-flex  align-items-center bgc-light">
              <Media left middle className="col-4 col-lg-3 ">
                <Media className="frh" object src={adminlogo} alt="admin" />
              </Media>
              <Media body className="col-7 col-md-8 col-lg-8 text-right">
                <span className="h1">{user_report.admins}</span>
                <span className="font-weight-bold"><br/>Admin Accounts</span>
              </Media>
            </Media>
          </div>
        </div>     
      </div>
  )
}

export default Dashboard; 