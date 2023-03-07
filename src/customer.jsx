import { useState, useEffect} from 'react';
import './MasterCss.css';
import axios from 'axios';

import {FaUserTie} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import {BiUser} from 'react-icons/bi';
import {FaUserFriends} from 'react-icons/fa';
import {GiMoneyStack} from 'react-icons/gi';
// import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Overlay from 'react-bootstrap/Overlay';

import Datatable from './components/datatable';
import Label from './components/label';
import Header from './components/Header';
import InputField from './components/InputField';

import Buttonn from './components/button';
import ListOfValue from './components/ListOfValues';

function Customer() {

  

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose= () =>setShow(false);
  
  const [customerName,setCustomerName] = useState("");
  const [customerID,setCustomerID] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [relationshipType,setRelationshipType] = useState("");
  const [branch,setBranch] = useState("");
  const [date,setDate] = useState("");
  const [chequeCategory,setChequeCategory] = useState("");
  const [IssuingBankCode,setIssuingBankCode] = useState("");
  const [code,setCode] = useState("");
  const [stateLOV, setStateLOV] = useState([])

  


  // useEffect(() => { 
  //       const getChequeCategory=()=>{ 
  //       return axios.post("http://localhost:9000/get-code-details", { 
  //       code: "CCC", 
  //       }); 
  //       } 

  //       const getIssuingBankCode=()=>{ 
  //       return axios.post("http://localhost:9000/get-code-details", { 
  //       code: "BNC", 
  //       }); 
  //       }
    
  //       Promise.all([ 
  //         getChequeCategory(), 
  //         getIssuingBankCode(), 
  //         ])
          
  //         .then((results)=> { 
  //         // get chequecategories
  //         const chequeCat = results[0].data; 
  //         localStorage.setItem("getChequeCategory", JSON.stringify(chequeCat)); 
    
  //         // get issuingBankCode
  //         const issuingBC = results[1].data; 
  //         localStorage.setItem("getIssuingBC", JSON.stringify(issuingBC)); 

  //       })

  //       {(() => { 
  //           var Bank = JSON.parse(localStorage.getItem("getIssuingBC")); 
  //           // console.log(Bank)
            
  //           for (var i = 0; i < Bank.length; i++) { 
  //             const actual_code = Bank[i]["actual_code"]; 
  //             const description = Bank[i]["description"]; 

  //             // console.log(actual_code)
  //             // console.log(description)
  //             // curr.push({actual_code, description})
  //             // curr.push(
  //             //   <div key={i} id={actual_code} data-value={description} className="optionToSelect"
  //             //   onClick={(e) => {setIssuingBankCode(e.target.getAttribute("data-value"));setCode(e.target.getAttribute("id"));}}> 
  //               //  {/* 
  //               //  {actual_code}- {description} */}
  //               //  {console.log(description)}
  //               //  {console.log(actual_code)}
  //               //   </div> 
  //               //   ); 
  //               curr.push(`${actual_code}-${description}`)
  //             }
              
  //           })()}
  //           console.log(curr , 'curr')
  //           setStateLOV(curr)
  //       },[]);

 
const handleInputs=()=>{
        axios.post("http://localhost:9000/get-account-details",
        {
          customerName:customerName,
          customerID:customerID,
          phoneNumber:phoneNumber,
          relationshipType:relationshipType,
          branch:branch,
          date:date
        })
        .then((response)=>{
        const dbAccountName = response.data[0][10];
        setCustomerName(dbAccountName);
       })
        
        .catch((error) =>{
         console.log(error)
        })
    }

return (
    <div className="motherContainer">
        <div style={{boxShadow:" rgba(0, 0, 0, 0.1) 0px 4px 12px",margin:"30px 0px 0px 0px",padding:"20px 0px 15px 90px",borderRadius:"3px"}}>
        <div className='row' style={{width:"50%"}} >
            <InputField  fullWidth={"50%"} label={"Customer ID"} labelWidth={"35%"} inputWidth={"65%"} className={"inputField"} disabled={"disabled"} />
            <InputField  fullWidth={"50%"} inputWidth={"100%"}  className={"inputFieldL"} disabled={"disabled"}/>
        </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",marginTop:"2%"}}>
           <div style={{marginRight:"10%"}}>
              <Buttonn icon={<BiUser size={18}/>} width={"100%"}/>
              <Label label={"Customer"}/>
           </div>
           <div>
              <Buttonn icon={<FaUserFriends size={18}/>} width={"100%"}/>
              <Label label={"Relations"}/>
           </div>
           <div style={{marginLeft:"10%"}}>
              <Buttonn icon={<GiMoneyStack size={18}/>} width={"100%"}/>
              <Label label={"Accounts"}/>
           </div>
        </div>
        <div className="body" style={{padding:"20px 25px 15px 25px"}}>
              <Header label={"Customer Details"}/>
                <div style={{display:"flex",marginTop:"10px",flex:1,gap:"1rem"}}>
                    <div style={{display:"flex",flex:0.7,padding:"20px 0px 0px 0px",justifyContent:"space-around",boxShadow:"rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"}}>
                      <div style={{flex:0.15}}></div>
                      <div style={{flex:0.8}}>
                        <div className='field'>
                          <InputField  fullWidth={"100%"} label={"Customer Name"} labelWidth={"20%"} inputWidth={"65%"} className={"inputFieldL"} disabled={"disabled"} />
                      </div>
                      <div className='field'>
                      <InputField  fullWidth={"100%"} label={"Customer Type"} labelWidth={"20%"} inputWidth={"65%"} className={"inputFieldL"} disabled={"disabled"} />
                      </div>
                      <div className='field'>
                      <InputField  fullWidth={"100%"} label={"Customer Category"} labelWidth={"20%"} inputWidth={"65%"} className={"inputFieldL"} disabled={"disabled"} />
                      </div>
                      <div className='field'>
                      <InputField  fullWidth={"100%"} label={"Segment"} labelWidth={"20%"} inputWidth={"65%"} className={"inputFieldL"} disabled={"disabled"} />
                      </div>
                      <div className='field'>
                      <InputField  fullWidth={"100%"} label={"Sub-Segment"} labelWidth={"20%"} inputWidth={"65%"} className={"inputFieldL"} disabled={"disabled"} />
                      </div>
                      <div className='field'>
                      <InputField  fullWidth={"100%"} label={"Sector"} labelWidth={"20%"} inputWidth={"65%"} className={"inputFieldL"} disabled={"disabled"} />
                      </div>
                      <div className='field'>
                      <InputField  fullWidth={"100%"} label={"Sub-Sector"} labelWidth={"20%"} inputWidth={"65%"} className={"inputFieldL"} disabled={"disabled"} />
                      </div>
                      </div>
                      <div style={{flex:0.05}}></div>
                    </div>
                    <div style={{padding:"20px 0px 0px 0px",display:"flex",flex:0.3,boxShadow:"rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"}}>
                          <div style={{flex:0.1}}></div>
                          <div style={{flex:0.8}}>
                              <div className='field' style={{marginBottom:"35px"}}>
                                <InputField fullWidth={"100%"} label={"Swift Code"} labelWidth={"50%"} inputWidth={"45%"} className={"inputField"} disabled={"disabled"} />
                              </div>
                              <div className='field' style={{marginBottom:"35px"}}>
                                <InputField fullWidth={"100%"} label={"Deceased"} labelWidth={"70%"} className={"radio"} type={"radio"} disabled={"disabled"}/>
                              </div>
                              <div className='field' style={{marginBottom:"35px"}}>
                                 <InputField fullWidth={"100%"} label={"Whereabouts Unknown"} labelWidth={"70%"} className={"radio"} type={"radio"} disabled={"disabled"}/>
                              </div>
                              <div className='field' style={{marginBottom:"35px"}}>
                                 <InputField fullWidth={"100%"} label={"Eligible For AR_AP Tracking"} labelWidth={"70%"} className={"radio"} type={"radio"} disabled={"disabled"}/>
                              </div>
                              <div className='field' style={{marginBottom:"35px"}}>
                                 <InputField fullWidth={"100%"} label={"MT920"} className={"radio"} labelWidth={"70%"} type={"radio"} disabled={"disabled"}/>
                              </div>
                              <div className='field' >
                                 <InputField fullWidth={"100%"} label={"MT940"} className={"radio"} labelWidth={"70%"} type={"radio"} disabled={"disabled"}/>
                              </div>
                          </div>
                          <div style={{flex:0.1}}></div>
                    </div>
                </div>
            
  </div>  
 </div>
  );

}

export default Customer;
