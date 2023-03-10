import { useState, useEffect} from 'react';
import './MasterCss.css';
import axios from 'axios';

import {FaUserTie} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Overlay from 'react-bootstrap/Overlay';
import LoadingOverlay from 'react-loading-overlay';

import Datatable from './components/datatable';
import Label from './components/label';
import Header from './components/Header';
import InputField from './components/InputField';
import Buttonn from './components/button';
import ListOfValue from './components/ListOfValues';
import Selectt from './components/selectField';
import SelectField from './components/selectField';
import Loader from './components/spinner';


function LandingPage() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose= () =>setShow(false);
  
  const [customerName,setCustomerName] = useState("");
  const [customerID,setCustomerID] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [relationshipType,setRelationshipType] = useState("");
  const [branch,setBranch] = useState("");
  const [date,setDate] = useState("");
  const [out,setOuts] = useState([]);
  
  const [stateLOV, setStateLOV] = useState([])
  const [loader,setLoader] = useState(false);

  var curr = [];
  let output = []; 
  
  console.log(customerName)
    useEffect(()=> {
      const getBranch=()=>{
     return axios.get('http://localhost:8000/get-branch')
      };

      Promise.all([getBranch()])
  
      .then((results)=>{
          const branch = results[0].data;
          localStorage.setItem("getBranch",JSON.stringify(branch))
      });
  
      ( () => {
       const kena = JSON.parse(localStorage.getItem("getBranch"));
        for(let i = 0; i < kena.length; i++)
        {
            const branch = kena[i][0]
            const code = kena[i][1]
  
            curr.push({label:`${code} - ${branch}` , value :branch});
        }
       return
      }) ();
      
      setStateLOV(curr);
      console.log(stateLOV , branch , "hjhjj");
  },[])
  
    const handleInputs=()=>{
      setLoader(true)
        axios.post("http://localhost:8000/get-customer-details",
        {
          customerName:customerName,  
          customerID:customerID,
          phoneNumber:phoneNumber,
          branch:branch,
          relationshipType:relationshipType,
        }).then((response)=>{
          //  output.push(response.data[0]);
          //  console.log(output);
          let results = response.data;
          console.log(results, "yolooooo");

          for (let i=0;i<results.length;i++) {

            const res = results[i]

            output.push(res)
            console.log(output ,"out")
            setOuts(output);
            setLoader(false);

          }
          return
       })
        
        .catch((error) =>{
         console.log(error)
        })
    }
    // handleInputs();
  

  

  
  return (
  
  <div className="motherContainer">
    {/* <Header icon={<FaUserTie/>} label={"Customer Search Enquiry"} handleClose={handleClose}/> */}
    
    <div className="body">
        <div className="field" >
            <div className='row'>
              <InputField label={"Customer Name"} fullWidth={"100%"} labelWidth={"35%"} inputWidth={"65%"} className={"inputFieldL"} onBlur={(e)=>{setCustomerName(e.target.value) ; handleInputs()}} placeholder={"Please Enter Customer Name"}/>
            </div>
            <div></div>
            <div className='row'>
              <InputField label={"Customer ID"} fullWidth={"100%"} labelWidth={"35%"} inputWidth={"65%"} className={"inputField"} type={"number"} onBlur={(e)=>{setCustomerID(e.target.value); handleInputs()}} placeholder={"Please Enter Customer ID"}/>
            </div>
        </div>
        <div className="field" >
            <div className='row master_dates'>
              <InputField label={"Date Of Incorp/Birth"} fullWidth={"65%"} labelWidth={"54%"}  dateWidth={"43%"} type={"date"}/>
              <InputField label={"To:"} fullWidth={"35%"} labelWidth={"25%"} dateWidth={"75%"} type={"date"} />
         
          {/* <InputField type={"date"} width={"25%"}/> */}
            </div>  
        <div></div>
        <div className='row'>
        <InputField label={"Phone Number"} fullWidth={"100%"} labelWidth={"35%"} inputWidth={"65%"} className={"inputField"} type={"number"} onBlur={(e)=>{setPhoneNumber(e.target.value) ; handleInputs()}}  placeholder={"Enter Phone Number"} pattern="[0-9]{10}"/>
       </div>
      </div>  
      <div className="field" >
        <div className='row'>
          <ListOfValue label={"Branch"} fullWidth={"100%"} labelWidth={"35%"} lovWidth={"65%"} branch={branch} setBranch={setBranch} handleInputs={handleInputs} lovData={stateLOV}/>
        </div>
        <div></div>
        <div className='row'>
          <SelectField  label={"Relationship Type"} fullWidth={"100%"} labelWidth={"35%"} selectWidth={"52.6%"} relationshipType={relationshipType} setRelationshipType={setRelationshipType} options={["SA - PERSONAL","SA - CORPORATE"]}  handleInputs={handleInputs}/>
       </div>
      </div>
    </div>  
    <div className='buttons'> 
        <Buttonn buttonName='Refresh' width={"80px"}/>
      </div>
      <LoadingOverlay
    active={loader}
    spinner
    text='Loading your content...'
     styles={{
        overlay: (base) => ({
          ...base,
          background: 'rgba(235, 234, 234, 0.481)'
        }),
        spinner: (base) => ({
          ...base,
          width: '100px',
          '& svg circle': {
            stroke: 'rgb(21 163 183)'
          }
        }),
        text: (base) => ({
          ...base,
          background: 'rgb(21 163 183)'
        }),
        // wrapper: {
        //   width: '400px',
        //   height: '400px',
        //   overflow: active ? 'hidden' : 'scroll'
        // }

      }}
    >
    <div className='datatable'>
        <Datatable Data={out}/>
        
    </div>
  </LoadingOverlay>
  </div>
    
  );
}

export default LandingPage;
