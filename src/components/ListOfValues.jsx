import React from "react";

import { IoMdSearch } from "react-icons/io";
import { FiFeather } from "react-icons/fi";
import {Select} from "@mantine/core";
import Label from "./label";
import '../MasterCss.css';

function ListOfValue({label,type,maxLength,required,labelWidth,fullWidth,lovWidth,lovData }) {
  console.log(lovData , "lovdata")
  
  const handleOpen = () => {
    var focusTrigger = document.getElementById("theField");
    focusTrigger.focus();
  };
  return (
    <div className="limpopo" style={{width:fullWidth,display: "flex",alignItems: "baseline",whiteSpace: "nowrap",color: "rgb(92, 92, 92)"}}>
    <div style={{width:labelWidth,whiteSpace: "nowrap"}}>
    <Label className ='label'  required={required} label={label}/>
    </div>
    
    <div className="lovField" style={{width:lovWidth}}>
      <Select
        placeholder="Select the Branch Name"
        style={{
          borderRadius: "3px",
          border: "none",
          fontsize: "90%",
          
        }}
        searchable
        size={"xs"}
        id="LoVField"
        rightSection={
          <IoMdSearch className="LoVIcon" size={18} color="grey" />
        }
        styles={{ rightSection: { pointerEvents:"none" } }}
        data={lovData}
      />
      </div>
    </div>
  );
}

export default ListOfValue;