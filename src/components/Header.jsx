import React from 'react';
import '../MasterCss.css'
import Label from './label';

import {AiOutlineClose} from 'react-icons/ai';


function Header({icon,label,handleClose}) {
  return (
    <div className='header'>
      <div style={{display:"flex",alignItems:"center"}}>
       <>{icon}</> 
      <Label className ='headerLabel' label={label}/>
      </div>
      <div style={{marginRight:"30px"}} onClick={handleClose}></div>
    </div>
  )
}

export default Header;