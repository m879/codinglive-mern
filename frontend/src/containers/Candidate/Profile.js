import React,{useState,useEffect} from 'react';
import { Button ,Card,Container,Row,Col,Form,Modal} from 'react-bootstrap';
import {getProfile,addProject,addExperience,updateProfile} from '../../redux/Actions/Profile';
import { useSelector,useDispatch } from 'react-redux';


function Profile() {

    const dispatch = useDispatch();
    const profile = useSelector(state=>state.profile);  
    console.log(profile);

    const [showProject, setShowProject] = useState(false);
    const [showExperience, setShowExperience] = useState(false);

    
    const [formData, setFormData] = useState({
        firstname:'',
        lastname:'',
        phone:'',
        about:'',
        college:'',
        degree:'',
        passing_year:'',
        skills:'',
        projectTitle:'',
        projectDescription:'',
        link:'',
        position:'',
        company:'',
        description:'',
      });

    useEffect(()=>{
      dispatch(getProfile());
      if(profile){
        setFormData({
            firstname:profile.firstname,
            lastname:profile.lastname,
            phone:profile.phone,
            about:profile.about ,
            college:profile.college,
            degree:profile.degree,
            passing_year:profile.passing_year,
            skills:profile.skills 
        })
      }
    },[dispatch])


    const {firstname,lastname,phone,about,college,degree,passing_year,skills,
           position,company,description,projectTitle,projectDescription,link
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


    const handleSubmit=()=>{
        const newData={firstname,lastname,phone,about,college,degree,passing_year,skills};
        console.log(newData);
        updateProfile(newData);
    }


    const submitExperience=()=>{
        var experience={
            position:position,
            company:company,
            description:description,
          };
          console.log(experience);
          addExperience(experience);
          setShowExperience(false);
    }
      
    const submitProject=()=>{
        var projects={
            title:projectTitle,
            description:projectDescription,
            link:link
        };
        addProject(projects);
       setShowProject(false)
    }

    return (
        <div style={{marginTop:'100px',paddingBottom:"100px"}}>
            <Container>
                <div className='my-4'>
                   <h3>Edit Profile</h3>
                </div>
                <Row className='my-4'>
                    <Col>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" 
                            value={firstname} name='firstname'  onChange={e => onChange(e)}/>
                          </Form.Group>
                        
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" 
                            value={lastname} name='lastname'  onChange={e => onChange(e)}/>
                          </Form.Group>

                         

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>College</Form.Label>
                            <Form.Control type="text" placeholder="Enter College"  
                            value={college}  name="college"  onChange={e => onChange(e)}/>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Latest Degree</Form.Label>
                            <Form.Control type="text" placeholder="Enter degree"  
                            value={degree}  name="degree"  onChange={e => onChange(e)}/>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Year of Passing</Form.Label>
                            <Form.Control type="text" placeholder="Enter Passing Year"  
                            value={passing_year}  name="passing_year"  onChange={e => onChange(e)}/>
                          </Form.Group>

                    </Col>
                    <Col>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>About</Form.Label>
                            <Form.Control type="text" placeholder="About yourself" as='textarea' value={about} 
                             name="about"  onChange={e => onChange(e)}
                            style={{ height: '180px' }} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Skills</Form.Label>
                            <Form.Control type="text" placeholder="Enter Skills"  
                            value={skills}  name="skills"  onChange={e => onChange(e)}/>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Mobile Number"  
                            value={phone}  name="phone"  onChange={e => onChange(e)}/>
                          </Form.Group>

                          <div className='my-4'>
                              <Button style={{float:'right'}} variant="primary" onClick={()=>handleSubmit()}>Save</Button>
                          </div>
                    </Col>

                    <hr className='my-4'/>
                  
                    <Row className='my-4'>
                        <Col className='p-4'>
                            <div className='my-4 d-flex' style={{justifyContent:'space-between'}}>
                               <h3>Experience </h3>
                               <Button variant="primary" onClick={()=>setShowExperience(true)}>Add</Button>
                            </div>
                            <div>
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
                            <Modal show={showExperience} onHide={()=>setShowExperience(false)}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Add Experience</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Position</Form.Label>
                                <Form.Control type="text" placeholder="Enter position" 
                                value={position} name='position'  onChange={e => onChange(e)}/>
                              </Form.Group>
                            
                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="text" placeholder="Enter company" 
                                value={company} name='company'  onChange={e => onChange(e)}/>
                              </Form.Group>


                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Description" value={description} 
                                 name="description"  onChange={e => onChange(e)}
                                style={{ height: '180px' }}  as='textarea'  />
                              </Form.Group>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={()=>setShowExperience(false)}>Close</Button>
                                <Button variant="primary" onClick={()=>submitExperience()}>Save </Button>
                              </Modal.Footer>
                            </Modal>
                           
                        </Col>
                        <Col className='p-4'>
                           <div className='my-4 d-flex' style={{justifyContent:'space-between'}}>
                               <h3>Projects</h3>
                               <Button variant="primary" onClick={()=>setShowProject(true)}>Add</Button>
                            </div>
                            <div>
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
                            <Modal show={showProject} onHide={()=>setShowProject(false)}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Add Project</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Project Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Project Title" 
                                value={projectTitle} name='projectTitle'  onChange={e => onChange(e)}/>
                              </Form.Group>
                            
                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Project Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Project Description" 
                                value={projectDescription} name='projectDescription'  
                                style={{ height: '180px' }}  as='textarea' onChange={e => onChange(e)}/>
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Link</Form.Label>
                                <Form.Control type="text" placeholder="Link"  value={link} 
                                 name="link"  onChange={e => onChange(e)}/>
                              </Form.Group>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={()=>setShowProject(false)}>Close</Button>
                                <Button variant="primary" onClick={()=>submitProject()}>Save </Button>
                              </Modal.Footer>
                            </Modal>
                           
                        </Col>
                    </Row>
                </Row>

              
            </Container>
        </div>
    )
}

export default Profile;
