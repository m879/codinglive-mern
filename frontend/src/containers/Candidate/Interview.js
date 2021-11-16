import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button} from 'reactstrap';
import {Container,Row,Col} from 'react-bootstrap';
// import { getinterviewlist } from '../../redux/Actions/User';
import {getinterviewlist} from '../../redux/Actions/User';
import {submitproblem, viewproblem} from '../../redux/Actions/Candidate'

function InterviewView(intrv){
 const dispatch = useDispatch();

  var today = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  var examDate = new Date(intrv.vacancy.commencement).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    
  console.log("TODAY DATE ",today);
  console.log("EAXAM DATE ",examDate);
  
  console.log("CODE PATHASDFGHJHGFDS",intrv.code);

    
  return(
          <React.Fragment>     
              <div className="col-12 row m-0 p-3 col-md-10 " style={{width:'100%'}}>
                    <h2 className="col-12 m-0 "> INTERVIEW</h2>
                    <h3 className="col-12 mt-1 mb-4">{intrv.vacancy.companyname}</h3>
                    <div className="col-3 font-weight-bold">
                        For <br/> With <br/>Email <br/><br/><br/> On <br/> Duration 
                     </div>
                     <div className="col-9 font-italic">
                         {intrv.vacancy.position} Role <br/>
                         {intrv.company.firstname} {intrv.company.lastname}<br/>
                         {intrv.company.username} <br/><br/><br/>
                         {new Intl.DateTimeFormat('en-US', {timeStyle:"medium",dateStyle:"medium"}).format(new Date(Date.parse(intrv.vacancy.commencement)))} <br/>
                         {intrv.vacancy.duration} minutes
                     </div>
                     {
                         today>=examDate && intrv.code.length==0 ?
                         <Button className="btn-primary mt-5 " onClick={()=>{window.location=`/test/${intrv._id}`}}>Join on {new Intl.DateTimeFormat('en-US', {dateStyle:"medium"}).format(new Date(Date.parse(intrv.vacancy.commencement)))}</Button>
                         :null
                     }
              </div>
          </React.Fragment>  
  );
}


function Interview(){
   
   const interview_list= useSelector(state=>state.interview_list);
   const dispatch = useDispatch();

   console.log("INTERVIEW LIST = ",interview_list);

   useEffect(()=>{
     dispatch(getinterviewlist());
   },[dispatch])




   if(interview_list.length!==0){
    const listview = interview_list.map((interview)=>{
        return(
            <Col lg={6}>
                <div key={interview._id} className="shadow" >  
                    {InterviewView(interview)}
                </div>       
            </Col>
        );
    })

    return(
        <div className="container" style={{paddingTop:'10px',paddingBottom:'100px'}}> 
            <div className="row frh"></div>
            <h1 className="my-5 p-2">Scheduled Interviews</h1>
            <hr/>
            <Row className='my-5'>
            {listview}
            </Row>
        </div>      
    )
}
else
 return(
    <div className="container vh-height" style={{paddingTop:'10px',paddingBottom:'100px'}}>
        <div className="row frh"></div>
        <div className="row justify-content-center">
            <h3 className="my-5 col-10 p-4 text-center bgc-light">
                There are no scheduled Interviews ....
            </h3>
        </div>
    </div>
 )
}

export default Interview; 