/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import {getapplicationlist,send_appl_status} from '../../redux/Actions/Admin';
import { Card, CardBody, CardText, CardTitle, CardSubtitle,CardHeader,CardFooter, Button} from 'reactstrap';

function ApplicationView(appl){
    const dispatch =useDispatch();
    return(
            <React.Fragment>
                <CardHeader className="h4 bgc-dark" >Company Application</CardHeader>     
                <CardBody >
                        <CardTitle className="h5">{appl.firstname} {appl.lastname}</CardTitle>
                        <CardSubtitle>{appl.username}</CardSubtitle>
                        <CardText className="mt-3">
                            Company   &nbsp;&nbsp;: <strong>{appl.companyname}</strong><br/>
                            Position  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <strong>{appl.position}</strong><br/>
                            Phone No  &nbsp;: <strong> {appl.phone} </strong>
                        </CardText>
                </CardBody>
                <CardFooter className="bg-white">
                    <Button className="btn-primary mr-4" onClick={()=>dispatch(send_appl_status(appl._id,true))} >Accept</Button>
                    <Button className="btn-primary mx-3" onClick={()=>dispatch(send_appl_status(appl._id,false))}>Reject </Button>
                </CardFooter>
            </React.Fragment>  
    );
}

function Applications(){
    const dispatch =useDispatch();
    const application_list = useSelector(state=>state.application_list);

    useEffect(()=>{
         dispatch(getapplicationlist());        
    },[])

    if(application_list.length!==0){
        const listview = application_list.map((application)=>{
            return(
                    <Card key={application._id} className="col-11 col-sm-8  col-md-7 col-lg-5 m-3 p-3" >  
                     {ApplicationView(application)}
                    </Card>       
            );
        })

        return(
            <div className="container" style={{paddingBottom:'50px'}}>
                <div className="row frh"></div>
                <h3 className="my-5 border-bottom font-dark">
                    Pending  Applications
                </h3>
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
                    There are no pending applications at the moment ....
                </h3>
            </div>
        </div>
     )
}

export default Applications;