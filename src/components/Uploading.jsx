import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';

const Uploading = () => {
  return (
    <div className='App' >
        <h1 className='title' style={{textAlign: 'initial', margin: "0 0 1rem 0"}}>Uploading...</h1>
        <LinearProgress style={{height: "8px", borderRadius: "8px"}}/>
    </div>
  )
}

export default Uploading