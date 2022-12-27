import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from "react-router-dom";

export default function RegisterSucces() {

    const navigate = useNavigate();

  return (
   <div className='congrats-container'>
     <div className='congrats'>
     <img className='congrats-img' src='https://cdn.dribbble.com/users/2644713/screenshots/9068500/media/2ede313bd3f518e4cec6284501bc8f1f.jpg?compress=1&resize=800x600&vertical=top' alt='congrats'/>
      <h1 className='congrats-heading'>Congrats !! </h1>
      <p className='next-int'>You are now a wingrow member <br/> Please login to proceed</p>
      <hr className='divider'/>
      <Button className='next' onClick={()=>{navigate("/login");}}>Login</Button>
    </div>
   </div>
  )
}
