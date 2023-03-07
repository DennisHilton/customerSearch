import React from "react";
import '../MasterCss.css';

function Buttonn({buttonName,icon,width}) {
    // height should be in percentages and width should be in pixels
  return (
      <button style={{width:width}} >{buttonName} {icon}</button>
  );
}

export default Buttonn;
