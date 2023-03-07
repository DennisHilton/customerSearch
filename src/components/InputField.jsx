import React from "react";
import Label from "./label";
import '../MasterCss.css';
import { IoCalendarOutline } from "react-icons/io5";
import { DatePicker } from "@mantine/dates";

function InputField({label,placeholder,type,colorr,maxLength,disabled,required,fullWidth,inputWidth,labelWidth,dateWidth,onChange,value,className}) 
{
  // disabled & required should be true or false, width should be in percentages, type: tel, number, text
 
  return (
  <div className="limpopo" style={{width:fullWidth,display: "flex",alignItems: "baseline",whiteSpace: "nowrap"}}>
    <div className="ll" style={{width:labelWidth,whiteSpace: "nowrap"}}>
    <Label className ='label' required={required} label={label}/>
    </div>  
    {type === "date" ? (
      <div className="dateField" style={{width:dateWidth}}>
        <DatePicker
          variant="unstyled"
          style={{color:"rgb(92, 92, 92)"}}
          // inputFormat="DD/MM/YYYY"
          placeholder="Pick a date"
          id="dateField"
          rightSection={<IoCalendarOutline size={18} color="grey" />}
          styles={{ rightSection: { pointerEvents: "none" } }}
        />
        </div>
      ) : (
    <div className="ii" style={{width:inputWidth}}>
      <input
        type={type}
        className={className}
        maxLength={maxLength}
        min={type === "number" && 0}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        
    />
    <div className='errorMessage' >
    </div>
    </div>)}
    
  </div>

   
    
    
  );
  
}

export default InputField;
