import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getProfile} from '../../redux/Actions/Profile';
import { Button ,Card,Container,Row,Col} from 'react-bootstrap';
import { CardHeader } from 'reactstrap';
import { get_report } from '../../redux/Actions/Admin';
import { Media } from 'reactstrap';
import {getDashboardData} from '../../redux/Actions/Dashboard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state=>state.profile);  
  console.log("PROFILE = ",profile);
  

  const [dashboardData,setDashboardData]=useState([]);

  useEffect(()=>{
    dispatch(getProfile());
  },[dispatch])
  
 
 useEffect(()=>{
   getDashboardData().then((data)=>{
     setDashboardData(data);
     console.log("DASHBAPRD = ",data);
   })
 },[])


 const dashboardDetails=[
   {
     icon:'fa fa-user',
     title:'Total Users',
     color:'darkviolet',
     total:dashboardData.allUser
   },
   {
     icon:'fa fa-handshake-o',
     title:'Total Company',
     color:'red',
     total:dashboardData.allCompany
   },
   {
     icon:'fa fa-server',
     title:'Total Job Created',
     color:'green',
     total:dashboardData.allVacancy
   }
 ]

 const companyDetails=[
  {
    icon:'fa fa-pencil-square-o',
    title:'Total Job Created by you',
    color:'yellow',
    total: profile?profile.vacancies.length:0
  },
  {
    icon:'fa fa-group',
    title:'Total Applicant',
    color:'blue',
    total:dashboardData.allAppointment
  },
]

  return (
        <div style={{paddingTop:'5vh',paddingBottom:'10vh'}}>
          <div className ="row frh"></div>
          { !profile?
             <div className="vh-height"></div>
             :
             <div className="row m-5">
               <Container>
                 <Row>
                   {
                     dashboardDetails.map((row)=>(
                      <Col lg={4} xs={12}>
                         <Card className='my-2'  style={{ width: '100%',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',borderRadius:'10px'}}>
                           <CardHeader style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                             <div style={{width:'70%',height:'80px'}}>
                                <a className='mx-2' style={{fontSize:'36px'}}><i className={`${row.icon}  mt-2`}></i></a>
                                <h3 className='mx-4' style={{marginTop:5}} className='text-primary'>{row.title}</h3>
                             </div>
                             <div style={{height:'60px',width:"60px",background:`${row.color}`,borderRadius:'100%',
                             display:'flex',justifyContent:'center',alignItems:'center'}}>
                               <h1>{row.total}</h1>
                             </div> 
                           </CardHeader>
                         </Card>
                      </Col>
                     ))
                   }
                  
                  {
                    companyDetails.map((row)=>(
                      <Col lg={6} xs={12}>
                        <Card className='my-4'  style={{ width: '100%',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',borderRadius:'10px'}}>
                           <CardHeader style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                             <div style={{width:'70%',height:'80px'}}>
                               <a className='mx-2' style={{fontSize:'36px'}}><i className={`${row.icon}  mt-2`}></i></a>
                                <h3 className='mx-4' style={{marginTop:5}} className='text-primary'>{row.title}</h3>
                             </div>
                             <div style={{height:'60px',width:"60px",background:`${row.color}`,borderRadius:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                               <h1>{row.total}</h1>
                             </div> 
                           </CardHeader>
                         </Card>
                      </Col>
                    ))
                  }
                 </Row>
                   <Card  className='my-4'  style={{ width: '100%',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',borderRadius:'20px'}}>
                        <CardHeader className='bg-warning'><h1 className='text-primary text-center '> {profile.companyname}</h1></CardHeader>
                        <Card.Body>
                          <p><strong>Full Name : </strong>{profile.firstname} {profile.lastname }</p>
                          <hr/>
                          <p><strong>Position : </strong>{profile.position}</p>
                          <hr/>
                          <p><strong>Mobile Number :</strong>{profile.phone}</p>
                          <hr/>
                          {/* <div>
                            <p><strong>About Company</strong></p>
                            <p>{profile.about}</p>
                          </div> */}
                        </Card.Body>
                      </Card>
               </Container>
             </div>
          }
        </div>         
  )
}

export default Dashboard; 