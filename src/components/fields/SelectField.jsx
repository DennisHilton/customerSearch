import React from "react";

import { BsChevronDown } from "react-icons/bs";
import {Select} from "@mantine/core";
import Label from "../label/Label";


function SelectField({labelWidth,selectWidth,label,required,fullWidth,type,maxLength,options,relationshipType,setRelationshipType,handleInputs}) {

  
  const handleOpen = () => {
    var focusTrigger = document.getElementById("theField");
    focusTrigger.focus();
  };
  return (
    <div className="limpopo"
      style={{width:fullWidth,display: "flex",alignItems: "baseline",whiteSpace: "nowrap",color: "rgb(92, 92, 92)"}}
    >
    <div style={{width:labelWidth,whiteSpace: "nowrap"}}>
    <Label className ='label'  required={required} label={label}/>
    </div>

    <div  className="selectField" style={{width:selectWidth}}>
      
    <Select
        placeholder=""
        style={{
          borderRadius: "3px",
          border: "none",
          fontsize: "90%",
        }}
      size={"xs"}
        id="selectField"
        rightSection={
          <BsChevronDown className="DownIcon" size={15} color="grey" />
        }
        styles={{ rightSection: { pointerEvents:"none" } }}
        data={options}
        // onClick={(e)=>{setRelationshipType(e.target.value)}}
        onChange={(e)=>{setRelationshipType(e) ; handleInputs()}}
      />
      </div>
      </div>
    
  );
}

export default SelectField;
