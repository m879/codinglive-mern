/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import dp from '../../shared/profile.jpg';
import {getuserlist} from '../../redux/Actions/Admin';
import { Card, CardText, CardTitle, CardSubtitle, CardImgOverlay, CardImg} from 'reactstrap';



function UserView(user){
    return(
            <React.Fragment>     
                <CardImgOverlay className="col-9">
                        {(user.usertype!=="admin")?
                        <CardTitle className="h5">{user.firstname}&nbsp;{user.lastname}</CardTitle>
                        :
                        <CardTitle className="h5">Admin&nbsp;Account</CardTitle>
                        }
                        <CardSubtitle className="font-dark">{user.usertype}</CardSubtitle>
                        <CardText className="mt-2 mt-md-4 font-short">
                            <div className="col-3 font-weight-bold">
                                Email<br/>Joined<br/>{(user.active)?<span className="font-dark">Active</span>:<span className="text-secondary">Inactive</span> }
                            </div>
                            <div className="col-9 font-italic">
                            {user.username}<br/>
                            {new Intl.DateTimeFormat('en-US', {timeStyle:"medium",dateStyle:"medium"}).format(new Date(Date.parse(user.createdAt)))}
                            </div>                                                      
                        </CardText>
                </CardImgOverlay>
                <CardImg className="rounded-circle offset-8 col-4 " src={dp} style={{height:'150px',width:'150px'}}/>
            </React.Fragment>  
    );
}

function Users(){
    const dispatch =useDispatch();
    const user_list = useSelector(state=>state.user_list);

    useEffect(()=>{
         dispatch(getuserlist());        
    },[])

    if(user_list.length!==0){
        const listview = user_list.map((user)=>{
            return(
                    <Card key={user._id} className=" col-11 p-3 col-sm-10 col-md-9 col-lg-7 col-xl-5 my-3 " 
                    style={{boxShadow:'rgba(0, 0, 0, 0.24) 0px 3px 8px',borderRadius:'10px'}}>  
                     {UserView(user)}
                    </Card>       
            );
        })

        return(
            <div className="container-fluid">
                <div className="row frh"></div>
                <div className="row justify-content-around mt-5">
                  {listview}
                </div>    
            </div>      
        )
    }
    else
     return(
         <div></div>
     )
}

export default Users;