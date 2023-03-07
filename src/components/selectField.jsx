import React from "react";

import { BsChevronDown } from "react-icons/bs";
import {Select} from "@mantine/core";
import Label from "./label";
import '../MasterCss.css';

function SelectField({required,labelWidth,fullWidth,selectWidth,type, label, maxLength,options}) {
  
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
      />
      </div>
      </div>
    
  );
}

export default SelectField;
