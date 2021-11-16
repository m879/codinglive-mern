import React, { useRef ,useState,useEffect} from "react";
import {useParams,useHistory} from 'react-router-dom';
import ReactDOM from "react-dom";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router-dom';
import Editor from "@monaco-editor/react";

import {ListGroup, Navbar,Button,Form,Offcanvas,
    Container,Row,Col,Card,Tab,Tabs,Nav,Modal
   } from "react-bootstrap";

import {CompilerFxn} from './CompilerFxn';
import { useDispatch, useSelector } from 'react-redux';
// import {SubmitCode} from '../../redux/Actions/Test';
import {submitproblem, viewproblem} from '../../redux/Actions/Candidate'
import { getinterviewlist } from '../../redux/Actions/User';
import { statusUpdate } from '../../redux/Actions/StatusUpdate';


export default function Compiler() {

     const testId=useParams();



    var auth=useSelector(state=>state.auth);
    const dispatch = useDispatch();  

    console.log("AUTH VALUE ",auth);
    const [show, setShow] = useState(false);
    const [notification,setNotification]=useState(true);
    const [closetest,setClosetest]=useState(false);
    const [submitCode,setSubmitCode]=useState(false);
    
    // const [candidateProblem,setCandidateProblem]=useState(false);
    
    const problem = useSelector(state=>state.problem);  
    console.log("CNADIDATE PROBLEM",problem);
   

    useEffect(()=>{
      dispatch(viewproblem(testId.id));
    },[dispatch])

    
    useEffect(() => {
     
      if(auth.usertype=='company'){
        setShow(false);
        setNotification(false);
      }else{
        setShow(true);
        setNotification(true);
      }
     
    }, [])


    
    const [defaultValue, setdefaultValue] = useState(`#include<bits/stdc++.h>
using namespace std;
int main(){ 
  cout<<"Hello World";  
  //Code here    
  return 0;
}`)


    var candidateDetails;
    const interview_list= useSelector(state=>state.interview_list);
    if(auth.usertype=='company'){
      for(var i=0;i<interview_list.length;i++){
            if(interview_list[i]._id==testId.id){
              candidateDetails=interview_list[i];
              console.log("YOUR INTERVIEW LIST EDITOR",interview_list[i].code);
            }
          }
    }
    console.log("CANIDATE DETAILS" ,candidateDetails)

   

    useEffect(()=>{
      dispatch(getinterviewlist());
    },[dispatch])
 

    const editorRef = React.useRef(null);


    document.addEventListener('fullscreenchange', function() {
      var full_screen_element = document.fullscreenElement;
   
      if (full_screen_element !== null){
        console.log('Page has entered fullscreen mode');
        setTimeout(function(){ 
         setClosetest(true);
        }, problem.duration*60*1000);
      }
      else{
        console.log('Page has close fullscreen mode');
        setClosetest(true);
      }
    });





    const [language_id, setlanguage] = useState(localStorage.getItem("language_Id") || 54);
    const [input, setinput] = useState(localStorage.getItem("input") || ``);
    const [output, setoutput] = useState(``);
    const [user_input, setuser_input] = useState(``);
    const [editorLanguage, seteditorLanguage] = useState('cpp');


    const selectLanguage=(e)=>{
      setlanguage(e.target.value);
      console.log(e.target.value);
       if(e.target.value==54){
         seteditorLanguage('cpp');
       }else if(e.target.value==50){
         seteditorLanguage('c');
       }else if(e.target.value==62){
         seteditorLanguage('java');
       }else if(e.target.value==72){
         seteditorLanguage('python');
       }
    }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }
  
  function showValue() {
      CompilerFxn(language_id,input,user_input,editorRef);
      setShow(false);
  }


  var elem = document.documentElement;
  function openFullscreen() {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }

  const handleQuestionModal=()=>{
    if(auth.usertype=='company'){
      setShow(true);
      setNotification(false);
    }else{
      setNotification(false);
      setShow(true);
      openFullscreen();
    }
  }

  const handleCloseTest=()=>{
    closeFullscreen();
    var code=editorRef.current.getValue();
    var testID=testId.id;
    dispatch(submitproblem(code,testID))
    setClosetest(true);
  }

  if(closetest){
      var code=editorRef.current.getValue();
      var testID=testId.id;
      dispatch(submitproblem(code,testID))
      dispatch(statusUpdate(false,true,'Code has been submitted successfully'))
      closeFullscreen();
      return <Redirect to ='/dashboard' />
  }

  const handleSubmitCode=()=>{
    setSubmitCode(true);
    setShow(true);
  }

  


  return (
   <div className='bg-dark' style={{paddingTop:'75px',overflow:'hidden',height:'91vh'}}>
    <Navbar bg="dark" expand="lg" style={{borderBottom:'1px solid white'}}>
        <Container>
            <Navbar.Brand style={{color:'white',fontWeight:'bolder'}}>Coding Test</Navbar.Brand>
             <Nav className="me-auto">
                <div className='mx-4'>
                  <Form.Select aria-label="Default select example" name={language_id}  onClick={(e)=>selectLanguage(e)}>
                      <option value="54">C++</option>
                      <option value="50">C</option>
                      <option value="62">Java</option>
                      <option value="71">Python</option>
                 </Form.Select>
                </div>
                <Button className='mx-4' onClick={showValue} > <i class="fas fa-caret-right" style={{fontSize:'18px'}}></i> Run (F9)</Button>
             </Nav>
             <Nav>
                 <Button variant="warning" onClick={()=>handleQuestionModal()}>Problem</Button>
                 {
                    auth.usertype!=='company'?
                    <div>
                      {notification?null:
                      <Button variant="success" style={{color:'white',border:'1px solid white',marginLeft:'50px'}} onClick={()=>handleSubmitCode()}>Submit Code</Button>
                      }
                    </div>
                    :null
                 }
             </Nav>
        </Container>
    </Navbar>

    <Modal show={show} onHide={()=>setShow(false)}  centered      size="lg"> 
        <Modal.Header closeButton>
          <Modal.Title>{
          notification?
            <p>Notification</p>
            :<p>{submitCode?"Test Submission":'Test Question'}</p>} 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
          notification?
          <div>
            <p>This test will be automatically submitted after given duration and if candidate try to switch full screen
              then this test will automatically gets cancelled . So please keep it in mind.</p>
          </div>
          :
          <div>
             {
               submitCode?
                <div className='text-center'>
                  <h1>Are you sure want to submit code?</h1>
                  <div className='my-4'>
                     <Button variant="danger" style={{color:'white',border:'1px solid white',marginLeft:'50px'}} 
                     onClick={()=>handleCloseTest()}>Submit and Close</Button>
                  </div>
                </div>
               :
               <div>
                 {
                   auth.usertype=='company'?
                    <div>
                      <h3>{candidateDetails?candidateDetails.problem.title:null}</h3>
                         <hr/>
                      <p>{candidateDetails?candidateDetails.problem.statement:null}</p>
                      <hr/>
                      <div>
                        <p>Input</p>
                        <p>{candidateDetails?candidateDetails.problem.input:null}</p>
                      </div>
                      <hr/>
                      <div>
                        <p>Output</p>
                        <p>{candidateDetails?candidateDetails.problem.output:null}</p>
                      </div>
                      <hr/>
                      <div>
                        <p>Duration</p>
                        <p>{candidateDetails?candidateDetails.problem.duration:null} minutes</p>
                      </div>
                    </div>
                   :
                   <div>
                      <h3>{problem.title}</h3>
                      <hr/>
                      <p>{problem.statement}</p>
                      <hr/>
                      <div>
                        <p>Input</p>
                        <p>{problem.input}</p>
                      </div>
                      <hr/>
                      <div>
                        <p>Output</p>
                        <p>{problem.output}</p>
                      </div>
                      <hr/>
                      <div>
                        <p>Duration</p>
                        <p>{problem.duration} minutes</p>
                      </div>
                   </div>
                 }
               </div>
             }
          </div>
        }
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>setShow(false)}>
            Hide
          </Button>
        </Modal.Footer>
      </Modal>

    <Container fluid>
        <Row>
            <Col lg={8} style={{padding:0}}>
            <Editor
                  height="90vh"
                  theme="vs-dark"
                  defaultLanguage={editorLanguage}
                  defaultValue={candidateDetails?(auth.usertype=='company'?candidateDetails.code:defaultValue):defaultValue}
                  onMount={handleEditorDidMount}
                  options={{readOnly: auth.usertype=='company'?true:false}}
                />
            </Col>
            <Col lg={4} className="bg-dark">
                        <Form className='mt-4'>
                            <Form.Group className="mb-3">
                              <Form.Label className='text-primary' >Input</Form.Label>
                              <Form.Control as="textarea" id="input" rows={7} onChange={(e)=>setuser_input(e.target.value)} />
                            </Form.Group>
                        </Form> 
                    <Tabs defaultActiveKey="output" id="uncontrolled-tab-example" className="mb-3 bg-dark">
                        <Tab eventKey="output" title="OUTPUT" className="bg-dark" >
                           <Form className='mt-4'>    
                                <Form.Group className="mb-3">
                                  <Form.Control as="textarea" id="output" style={{fontWeight:'bolder',fontSize:'18px'}} 
                                  rows={5} 
                                  disabled/>
                                </Form.Group>
                            </Form>
                        </Tab>
                        <Tab eventKey="compiler" title="Compile">
                            <Form className='mt-4'>    
                                <Form.Group className="mb-3">
                                  <Form.Control as="textarea" id="compileresult" 
                                  style={{fontWeight:'bolder',fontSize:'18px'}} rows={6} 
                                  disabled/>
                                </Form.Group>
                            </Form>
                        </Tab>
                    </Tabs>
                    {/* </Col> */}
                {/* </Row> */}
            </Col>
        </Row>
    </Container>
     
   </div>
  );
}
