import { useState, useEffect} from 'react';

import axios from 'axios';

import {FaUserTie} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import Modal from 'react-bootstrap/Modal';
import Popover from 'react-bootstrap/Popover';
import LoadingOverlay from 'react-loading-overlay';

import Label from '../components/label/Label';
import Header from '../components/header/Header';
import InputField from '../components/fields/InputField';
import Buttonn from '../components/button/Button';
import ListOfValue from '../components/fields/ListOfValue';
import SelectField from '../components/fields/SelectField';
import DataTable from '../components/data-table/Datatable';

function CustomerSearch() {
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

  const pageRefresh=()=>{
    window.location.reload();
  }
  
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
       const DB = JSON.parse(localStorage.getItem("getBranch"));
        for(let i = 0; i < DB.length; i++)
        {
            const branch = DB[i][0]
            const code = DB[i][1]
  
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
              <InputField label={"Customer Name"} fullWidth={"100%"} labelWidth={"35%"} inputWidth={"65%"} className={"inputFieldL"} onChange={(e)=>{setCustomerName(e.target.value) ; handleInputs()}} placeholder={"Please Enter Customer Name"}/>
            </div>
            <div></div>
            <div className='row'>
              <InputField label={"Customer ID"} fullWidth={"100%"} labelWidth={"35%"} inputWidth={"65%"} className={"inputField"} type={"number"} onChange={(e)=>{setCustomerID(e.target.value); handleInputs()}} placeholder={"Please Enter Customer ID"}/>
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
        <InputField label={"Phone Number"} fullWidth={"100%"} labelWidth={"35%"} inputWidth={"65%"} className={"inputField"} type={"number"} onChange={(e)=>{setPhoneNumber(e.target.value) ; handleInputs()}}  placeholder={"Enter Phone Number"} pattern="[0-9]{10}"/>
       </div>
      </div>  
      <div className="field" >
        <div className='row'>
          <ListOfValue label={"Branch"} fullWidth={"100%"} labelWidth={"35%"} lovWidth={"65%"} branch={branch} setBranch={setBranch} handleInputs={handleInputs} lovData={stateLOV}/>
        </div>
        <div></div>
        <div className='row'>
          <SelectField label={"Relationship Type"} fullWidth={"100%"} labelWidth={"35%"} selectWidth={"52.6%"} relationshipType={relationshipType} setRelationshipType={setRelationshipType} options={["SA - PERSONAL","SA - CORPORATE"]}  handleInputs={handleInputs}/>
       </div>
      </div>
    </div>  
    <div className='buttons'> 
        <Buttonn buttonName='Refresh' onClick={()=>pageRefresh()} width={"80px"}/>
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
        <DataTable Data={out}/>
        
    </div>
  </LoadingOverlay>
  </div>
    
  );
}

export default CustomerSearch;
