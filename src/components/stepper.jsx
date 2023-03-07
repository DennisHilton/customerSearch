// import React from "react";
// import { Stepper, Button, Group } from '@mantine/core';

// const [active, setActive] = useState(1);

//   const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
//   const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

//   <Stepper active={active} onStepClick={setActive} breakpoint="sm">
//             <Stepper.Step label="Customer" description="Customer Info">
//                 <Header label={"Customer Details"}/>
//                 <div style={{display:"flex",marginTop:"10px",flex:1,gap:"1rem"}}>
//                     <div style={{display:"flex",flex:0.7,boxShadow:"rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"}}>
//                       <div style={{flex:0.1}}></div>
//                       <div style={{padding:"20px 0px 0px 0px",flex:0.8}}>
                        
//                         <div className='field'>
//                             <InputField label={"Customer Name"} className={"inputField"}/>
//                           </div>
//                           <div className='field'>
//                             <InputField label={"Customer Type"} className={"inputField"}/>
//                           </div>
//                           <div className='field'>
//                             <InputField label={"Customer Category"} className={"inputField"}/>
//                           </div>
//                           <div className='field'>
//                             <InputField label={"Segment"} className={"inputField"}/>
//                           </div>
//                           <div className='field'>
//                             <InputField label={"Sub Segment"} className={"inputField"}/>
//                           </div>
//                           <div className='field'>
//                             <InputField label={"Sector"} className={"inputField"}/>
//                           </div>
//                           <div className='field'>
//                             <InputField label={"Sub Sector"} className={"inputField"}/>
//                           </div>
//                         </div>
//                       <div style={{flex:0.1}}></div>

//                     </div>
//                     <div style={{padding:"20px 0px 0px 0px",display:"flex",flex:0.3,boxShadow:"rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px"}}>
//                           <div style={{flex:0.1}}></div>
//                           <div style={{flex:0.8}}>
//                               <div className='field' style={{width:"100%",padding:"0px 0px 0px 0px"}}>
//                                  <InputField label={"Swift Code"} className={"inputFieldS"}/>
//                               </div>
//                               <div className='field' style={{width:"100%",padding:"0px 0px 0px 0px"}}>
//                                  <InputField label={"Deceased"} className={"radio"} type={"radio"}/>
//                               </div>
//                               <div className='field' style={{width:"100%",padding:"0px 0px 0px 0px"}}>
//                                  <InputField label={"Whereabouts Unknown"} className={"radio"} type={"radio"}/>
//                               </div>
//                               <div className='field' style={{width:"100%",padding:"0px 0px 0px 0px"}}>
//                                  <InputField label={"Eligible For AR_AP Tracking"} className={"radio"} type={"radio"}/>
//                               </div>
//                               <div className='field' style={{width:"100%",padding:"0px 0px 0px 0px"}}>
//                                  <InputField label={"MT920"} className={"radio"} type={"radio"}/>
//                               </div>
//                               <div className='field' style={{width:"100%",padding:"0px 0px 0px 0px"}}>
//                                  <InputField label={"MT940"} className={"radio"} type={"radio"}/>
//                               </div>
//                           </div>
//                           <div style={{flex:0.1}}></div>
//                     </div>
//                 </div>
//             </Stepper.Step>
//     <Stepper.Step label="Second step" description="Verify email">
//       Step 2 content: Verify email
//     </Stepper.Step>
//     <Stepper.Step label="Final step" description="Get full access">
//       Step 3 content: Get full access
//     </Stepper.Step>
//     <Stepper.Completed>
//       Completed, click back button to get to previous step
//     </Stepper.Completed>
//   </Stepper>

//   <Group position="center" mt="xl">
//     <Button variant="default" onClick={prevStep}>Back</Button>
//     <Button onClick={nextStep}>Next step</Button>
//   </Group>
