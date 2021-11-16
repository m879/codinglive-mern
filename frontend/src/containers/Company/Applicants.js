import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import { getapplicantlist } from '../../redux/Actions/Company';
import { Card, CardBody, CardText, CardTitle, CardSubtitle,CardHeader,CardFooter, Button} from 'reactstrap';
import {send_appl_status} from '../../redux/Actions/Company';

function ApplicantView(appl){
  const dispatch =useDispatch();
  const {id}=useParams();

  console.log("APPLICANT " ,appl);

  return(
          <React.Fragment>
              <CardHeader className="h4 bgc-dark" >Candidate Resume</CardHeader>     
              <CardBody >
                      <CardTitle className="h4">{appl.firstname} {appl.lastname}</CardTitle>
                      <CardSubtitle  className="my-2">{appl.username}</CardSubtitle>
                      <CardSubtitle  className="my-2">{appl.phone}</CardSubtitle>
                          <div>
                            <p><strong>About</strong></p>
                            <p>{appl.about}</p>
                          </div>
                          <hr/>
                          <p><strong>Mobile Number: </strong>{appl.phone}</p>
                          <hr/>
                          <div>
                            <p><strong>College</strong></p>
                            <p>{appl.college}</p>
                          </div>
                          <hr/>
                          <div>
                            <p><strong>Degree</strong></p>
                            <p>{appl.degree}</p>
                          </div>
                          <hr/>
                          <div>
                            <p><strong>Year of Passing</strong></p>
                            <p>{appl.passing_year}</p>
                          </div>
                          <hr/>
                          <div>
                            <p><strong>Skills</strong></p>
                            <p>{appl.skills}</p>
                          </div>
                          <hr/>
                          <div>
                            <p><strong>Projects</strong></p>
                            {
                                appl.projects.map((row)=>(
                                    <Card className='my-4'>
                                        <CardHeader className="p" >{row.title}</CardHeader> 
                                        <CardBody>
                                        <CardText>{row.description}</CardText>
                                        <CardTitle className="p">Link</CardTitle>
                                        </CardBody>    
                                    </Card>
                                ))
                            }
                          </div>
                          <hr/>
                          <div>
                            <p><strong>Experience</strong></p>
                            {
                                appl.experience.map((row)=>(
                                    <Card className='my-4'>
                                    <CardHeader className="p" >{row.position}</CardHeader> 
                                    <CardBody>
                                    <CardTitle className="p">{row.company}</CardTitle>
                                    <CardText>{row.description}</CardText>
                                    </CardBody>    
                                </Card>
                                ))
                            }
                          </div>
              </CardBody>
              <CardFooter className="bg-white">
                  <Button className="btn-primary mr-4" onClick={()=>dispatch(send_appl_status(id,appl._id,true))} >Accept</Button>
                  <Button className="btn-primary " onClick={()=>dispatch(send_appl_status(id,appl._id,false))}>Reject </Button>
              </CardFooter>
          </React.Fragment>  
  );
}


function Applicants(){
   
   const applicants_list= useSelector(state=>state.user_list);
   const dispatch = useDispatch();
   const {id}=useParams();

   useEffect(()=>{
     dispatch(getapplicantlist(id));
   },[dispatch, id])

   if(applicants_list.length!==0){
    const listview = applicants_list.map((applicant)=>{
        return(
                <Card key={applicant._id} className="col-11 m-5 p-3" >  
                 {ApplicantView(applicant)}
                </Card>       
        );
    })

    return(
        <div className="container">
            <div className="row frh"></div>
            <h1 className="mt-5 p-2 border-bottom font-dark">
                Short List Applicants
            </h1>
            <div className="row justify-content-around">
              {listview}
            </div>    
        </div>      
    )
}
else
 return(
    <div className="container vh-height">
        <div className="row frh"></div>
        <div className="row justify-content-center">
            <h3 className="my-5 col-10 p-4 text-center bgc-light">
                There are no pending applications ....
            </h3>
        </div>
    </div>
 )
}

export default Applicants; 