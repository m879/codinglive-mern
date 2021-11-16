import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button} from 'reactstrap';
import { getinterviewlist } from '../../redux/Actions/User';
import {Container,Row,Col} from 'react-bootstrap';
import {assess} from '../../redux/Actions/Company';

function InterviewView(intrv){
    const dispatch = useDispatch();

    // console.log("USERS SUBMITTED CODE = ",intrv.code);

  return(
          <React.Fragment>     
              <div className="col-12 row m-0 p-3 col-md-10">
                    <h2 className="col-12 m-0 "> INTERVIEW</h2>
                    <h3 className="col-12 mt-1 mb-4">{intrv.vacancy.companyname}</h3>
                    <div className="col-3 font-weight-bold">
                        For <br/> With <br/>Email <br/><br/><br/> On <br/> Duration 
                     </div>
                     <div className="col-9 font-italic">
                        {intrv.vacancy.position} Role <br/>
                        {intrv.candidate.firstname} {intrv.candidate.lastname}<br/>
                        {intrv.candidate.username} <br/><br/><br/>
                        {new Intl.DateTimeFormat('en-US', {timeStyle:"medium",dateStyle:"medium"}).format(new Date(Date.parse(intrv.vacancy.commencement)))} <br/>
                        {intrv.vacancy.duration} minutes
                    </div>
                    <hr className='mt-4'/>
                    <h3 className="my-1"> {intrv.status}</h3>     
                    {
                       intrv.code&&  intrv.code.length>0?
                        <div className='text-center'>
                             <div style={{display:'flex',justifyContent:'space-around',marginTop:'30px'}}>
                             {/* <Button className="btn-primary mx-2 mx-md-0 my-md-1"  onClick={()=>console.log("TECNOCAL QUESTION SUBMITTED = ",intrv.problem,intrv.code)}>View </Button>                    */}
                             <Button className="btn-primary mx-2 mx-md-0 my-md-1" 
                                onClick={()=>dispatch(assess(intrv._id,"Selected"))}>Accept</Button>  
                             <Button className="btn-primary mx-2 mx-md-0 my-md-1" 
                                onClick={()=>dispatch(assess(intrv._id,"Not Selected"))}>Reject</Button> 
                            <Button className="btn-primary mx-2 mx-md-0 my-md-1" onClick={()=>{window.location=`/test/${intrv._id}`}}>View Sumitted Code</Button>     
                            </div>
                        </div>
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
            <Col lg={6} className='mt-4 p-4' >
                <div key={interview._id} className="row shadow border" >  
                    {InterviewView(interview)}
                </div>       
            </Col>
        );
    })

    return(
        <div className="container" style={{paddingTop:'10px',paddingBottom:'100px'}}> 
            <div className="row frh"></div>
            <h1 className="my-5 p-2 border-bottom">Scheduled Interviews</h1>
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