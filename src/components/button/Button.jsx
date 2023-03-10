import React from "react";

function Buttonn({buttonName,icon,width,onClick}) {
    // height should be in percentages and width should be in pixels
   
  return (
      <button style={{width:width}} onClick={onClick} >{buttonName} {icon}</button>
  );
}

export default Buttonn;
