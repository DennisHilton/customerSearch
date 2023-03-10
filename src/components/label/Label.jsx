import React from 'react';


function Label(props) {
  return (
    <div className={props.className}>{props.label} {props.required === true ? <span style={{ color: "red" }}> *</span> : null}</div>
  )
}

export default Label;