import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getProfile} from '../../redux/Actions/Profile';
import { Button ,Card,Container,Row,Col} from 'react-bootstrap';
import { CardHeader } from 'reactstrap';
import { get_report } from '../../redux/Actions/Admin';
import { Media } from 'reactstrap';
import {NavLink} from'react-router-dom';
import {getDashboardData} from '../../redux/Actions/Dashboard';


const Dashboard = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state=>state.profile);  
  console.log(profile);

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
  },
  {
    icon:'fa fa-pencil-square-o',
    title:'Jobs You Applied',
    color:'yellow',
    total:profile?profile.applied.length:0
  }
]



  return (
        <div style={{paddingBottom:'50px'}}>
          <div className ="row frh"></div>
          { !profile?
             <div className="vh-height"></div>
             :
             <div className="row m-5">
              <Container>
                 <Row>
                   {
                     dashboardDetails.map((row)=>(
                      <Col>
                          <Card className='my-2'  style={{ width: '100%',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',borderRadius:'10px'}}>
                            <CardHeader style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                              <div style={{width:'70%',height:'80px'}}>
                                 <a className='mx-2' style={{fontSize:'36px'}}><i className={`${row.icon} mt-2`} ></i></a>
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
                 </Row>
                  <Card  className='my-4'  style={{ width: '100%',boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',borderRadius:'20px'}}>
                        <Card.Body>
                        <Card.Title className='d-flex pt-4' style={{justifyContent:'space-between'}}>
                        <h1 className='text-primary text-center '>Profile</h1>
                          <NavLink to='/profile'><Button>Edit Profile</Button></NavLink>
                        </Card.Title>
                        <hr/>
                        <Row>
                         <Col lg={6}>
                          <p><strong>Full Name :</strong>  {profile.firstname} {profile.lastname }</p>
                          <hr/>
                          <div>
                            <p><strong>About</strong></p>
                            <p>{profile.about}</p>
                          </div>
                          <hr/>
                          <p><strong>Mobile Number: </strong>{profile.phone}</p>
                          <hr/>
                          <div>
                            <p><strong>College</strong></p>
                            <p>{profile.college}</p>
                          </div>
                          <hr/>
                          <div>
                            <p><strong>Degree</strong></p>
                            <p>{profile.degree}</p>
                          </div>
                          <hr/>
                          <div>
                            <p><strong>Year of Passing</strong></p>
                            <p>{profile.passing_year}</p>
                          </div>
                          <hr/>
                          <div>
                            <p><strong>Skills</strong></p>
                            <p>{profile.skills}</p>
                          </div>
                          <hr/>
                          </Col>
                          <Col lg={6}>

                          <div>
                            <p><strong>Experiences</strong></p>
                            {
                                 profile.experience.map((row)=>(
                                   <Card className='mt-4' style={{ width: '100%' }}>
                                    <Card.Body>
                                      <Card.Title><strong>Position : </strong>{row.position}</Card.Title>
                                      <hr/>
                                      <Card.Text>
                                          <h4><strong>Company : </strong>{row.company}</h4> 
                                          <p>{row.description}</p>   
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                 ))   
                                }
                          </div>
                          <hr/>
                          <div>
                            <p><strong>Projects</strong></p>
                            {
                                    profile.projects.map((row)=>(
                                        <Card className='mt-4' style={{ width: '100%' }}>
                                        <Card.Body>
                                          <Card.Title>{row.title}</Card.Title>
                                          <hr/>
                                          <Card.Text><p>{row.description}</p>   </Card.Text>
                                          <Card.Link href="#">{row.link}</Card.Link>
                                        </Card.Body>
                                      </Card>
                                    ))
                                }
                          </div>
                          </Col>
                         </Row>
                        </Card.Body>
                      </Card>
               </Container>
             </div>
          }
        </div>         
  )
}

export default Dashboard; 