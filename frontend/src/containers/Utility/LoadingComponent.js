import React from 'react';
import LoadingOverlay from 'react-loading-overlay';
import RingLoader from 'react-spinners/RingLoader';
import {css} from "@emotion/react"
import {useSelector} from 'react-redux';


function Loading(){
    const override = css`
    display: block;
    margin-bottom: 20%; 
  `;
   var status=useSelector(state=>state.status); 

    return(
        <LoadingOverlay
             active={status.isLoading}     
             spinner = {<RingLoader color="white" css={override} size={100}/>} 
             styles={{
              content: (base) => ({
                ...base,
                position: 'fixed',
                left: '45%',
                top: '10%',
                color: 'rgb(169,169,169)'
              }),
              overlay: (base) => ({
                ...base,
                height: '100vh',
                position: 'fixed'
              })
             }}   
             text="Loading... "
       >
      </LoadingOverlay> 
    );
}

export default Loading;