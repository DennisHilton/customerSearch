const express = require('express');
const index = express();
const {v4 : uuidv4} = require('uuid');
const oracledb = require("oracledb");
const cors = require("cors");
const axios = require("axios");
const mysql = require("mysql");
var bodyParser = require("body-parser");
var multer = require("multer");
var qs = require("qs");
var os = require("os");
var ip = require("ip");


index.use(cors({ origin: "*" }));
// parse application/x-www-form-urlencoded
index.use(bodyParser.urlencoded({ extended: true }));
// parse application/json

index.use(express.json());


try{
  oracledb.initOracleClient({libDir:'C:/instantclient_21_9'})
  console.log("hey");
}


catch(error){
  console.log('ooooops')
}

const port = process.env.PORT || 8000;

index.listen(port,()=> {
    console.log(`Running on port ${port}`);
});

index.get('/',(req, res)=> {
    res.send("Waguan");
})

index.post('/cbrequisition', (req, res)=>
 {
    async function cbrequisition() {
        const booksNumber = req.body.booksNumber;
        const leavesNumber = req.body.leavesNumber;
        const transactionCode =req.body.transactionCode;
        const scanDoc = req.body.scanDoc;
        const userName = req.body.userName;
        const date = req.body.date;
        const machineIp = req.body.ip;
        const sessionId = uuidv4();
        const accountLInk = req.body.accountLink;
        const terminal = req.body.terminal;
        const branch = req.body.branch;
        const deliveryChannel = req.body.deliverykllChannel;
        const globalBranch = req.body.globalBranch;
        const channel = req.body.channel;
        const formCode = req.body.formCode


        try { 
            con = await oracledb.getConnection({
              user: "BANKOWNER",
              password: "pass1234",
              connectString: "192.168.1.60:9534/UNSGP",
            });
            }
        catch(err){
                console.log("Error connecting to Oracle")
        }
        if(con) {
            res.send("I dey insideeeee");
        }
    con.execute("BEGIN PRC_CHEQUE_BK_REQT_v( :acct_link_V, :num_of_books_VVV, :leaves_no_V, :trans_code_V, :SCANDOC_V, :CHAN_V, :delivery_channel_V, :delivery_branch_V, :GLOBAL_BRA_V, :TERMINAL_V, :username_V, :DATE_V, :frmcode_V, :sess_id_V, :machine_ip_V :request_id_V, :RESPONSE_CODE OUT, :RESPONSE_MESS OUT); END;",
                  
    
                {
                acct_link_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: accountLInk,
                },
        
                num_of_books_VVV: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: booksNumber,
                },
        
                leaves_no_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: leavesNumber,
                },
        
                trans_code_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: transactionCode,
                },
        
                SCANDOC_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: scanDoc,
                },

                CHAN_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: channel,
                },

                delivery_channel_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: deliveryChannel,
                },
                
                delivery_branch_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: branch,
                },

                GLOBAL_BRA_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: globalBranch,
                }, 
                
                TERMINAL_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: terminal,
                },  
        
        
                username_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: userName,
                },
        
                DATE_V: {
                    type: oracledb.DATE,
                    dir: oracledb.BIND_IN,
                    val: date,
                },

                frmcode_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: formCode,
                  },
        
                sess_id_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: sessionId,
                },

                machine_ip_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_IN,
                    val: machineIp,
                },  
                
                request_id_V: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_OUT,
                },  
        
                RESPONSE_CODE: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_OUT,
                },
        
                RESPONSE_MESS: {
                    type: oracledb.STRING,
                    dir: oracledb.BIND_OUT,
                },
                },
        function (err, result) {
            if (err) {
                console.log(err)
            }
            if (result) 
            {
                // If cheque is successfully requested for
                if (result.outBinds.RESPONSE_CODE === 0o00 || result.outBinds.RESPONSE_CODE === "00") {
    
                  let responsecode = result.outBinds.RESPONSE_CODE;
                  let message = result.outBinds.RESPONSE_MESS;
    
                  response = {
                    success: true,
                    message: message,
                    responseCode : responsecode,
                    
                  };
    
                  res.send(response);
                } 
                else {
                  var message = result.outBinds.MESSAGE;
    
                  response = {
                    success: false,
                    message: message,
                             };
    
                  res.send(response);
                }
            }
            }
          );
        } 
        cbrequisition();
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
index.get('/get-branch', (req,res) => {
  async function getBranch(){
    let con;
      try { 
      
      con = await oracledb.getConnection({
        user : "BANKOWNER",
        password: "pass1234",
        connectString : "192.168.1.60:9534/UNSGP"
      });

      if (con){
        console.log("i dey inside");
      }

      const data = await con.execute(
        `SELECT BR_DESCRIPTION,BR_CODE FROM TB_BRANCH
         ORDER BY BR_CODE`);
      
        res.send(data.rows);

      // localStorage.setItem("codescs", data);
      // console.log(res)

      // localStorage.getItem("codescs");
      // console.log(data.rows)
      
      } catch (err){
       
        res.send(err);
      }
     }
     getBranch();
    }
);

index.post('/get-customer-details', (req,res) => {

  const customerName = req.body.customerName;
  const customerID = req.body.customerID;
  const phoneNumber = req.body.phoneNumber;
  const branch = req.body.branch;
  const relationshipType = req.body.relationshipType;

  console.log(branch , "branch")
  
  async function getDetails(){
    let con;
      try { 
      
      con = await oracledb.getConnection({
        user : "BANKOWNER",
        password: "pass1234",
        connectString : "192.168.1.60:9534/UNSGP"
      });

      if (con){
        console.log("i say i dey insidee");
      }

      let determinant = ""
    
      if(customerName){
       determinant = `ACCOUNT_DESCRP LIKE '%${customerName}%`
      }
      if(customerID){
       determinant = `CUSTOMER_NUMBER = '${customerID}`
      }
       if(phoneNumber){
       determinant = `PHONE LIKE '%${phoneNumber}%`
      }
      if(branch){   
        determinant = `BRANCH = '${branch}`
       }
      if(relationshipType){
        determinant = `PRODUCT = '${relationshipType}`
       }
       
      const data = await con.execute(
        `SELECT ACCOUNT_DESCRP,CUSTOMER_NUMBER,PHONE,BRANCH,PRODUCT FROM CASA_ACCT_LIST
        WHERE  ${determinant}' 
        `
        );
        // CUSTOMER_NUMBER = ${customerID}
        // PHONE = ${phoneNumber}
        // BRANCH = ${branch}
        // PRODUCT = ${relationshipType}   
         
        res.send(data.rows);

      // localStorage.setItem("codescs", data);
      // console.log(res)

      // localStorage.getItem("codescs");
      // console.log(data.rows)
        
      } catch (err){
       
        res.send(err);
      }
     }
     getDetails();
    }
    

);



index.get('/get-codescs', (req, res) => {
  async function getCodescs(){
    let con;
      try { 
      
      con = await oracledb.getConnection({
        user : "BANKOWNER",
        password: "pass1234",
        connectString : "192.168.1.60:9534/UNSGP"
      });

      
      
      const data = await con.execute(
        `SELECT * FROM CODE_DESC`);
      
      res.send(data.rows);

      // localStorage.setItem("codescs", data);
      // console.log(res)

      // localStorage.getItem("codescs");
      // console.log(data.rows)
      
      } catch (err){
       
        res.send(err);
      }
     }
     getCodescs();
    }
    

);



index.post('/get-codescs', (req, res) => {
    async function getCodescs(){
      let con;
      const accountNumber= "'" + req.body.accountNumber + "'";
        try { 
        
        con = await oracledb.getConnection({
          user : "BANKOWNER",
          password: "pass1234",
          connectString : "192.168.1.60:9534/UNSGP"
        })
        
        if (con){
          console.log("i dey insidee");
        };
      
        const data = await con.execute(
          `SELECT 
          ACCT_LINK, AV_BAL, BOOKBAL, 
             OD_LIM, POST_AV_BAL, POST_BOOKBAL, 
             POST_OD_LIM, SYSPOST_AV_BAL, UNCLEARED_BAL, 
             ACCOUNT_NUMBER, ACCOUNT_DESCRP, POST_ACCT_DESCRP, 
             BRANCH_CODE, BRDESC, STATUS_INDICATOR, 
             STATUS_DESC, CURRENCY_CODE, LFM_TEMP, 
             MAX_DEPO_AMT, DEPO_ALLOW, MAX_WITHD_AMT, 
             WITHD_ALLOW, PROD_CODE, UNAUTH_OD, -
             CHQ_ALLOWED, CHQ_DEPO_ALLOW, TYPE_OF_ACCT, 
             LEGAL_FORM, CUST_NO, CASH_FLAG, 
             CHQ_FLAG, ACR_CHG, ACR_PENAL, 
             ACR_INT, VIEW_FLAG
          FROM BANKOWNER.VW_CASA_LEDGER
          WHERE ACCT_LINK=${accountNumber}`
          );
        res.send(data.rows);
  
       
        
        } catch (err){
          throw err;
        }
       
      }      
        getCodescs();
  
  
  });


  // GET CODESC DETAILS
  
index.post('/get-code-details', (req, res) => {

  const code = "'"+req.body.code+"'";

  async function getCodeDetails(){

  let con;
  
  try { 
  
  con = await oracledb.getConnection({
    user : "BANKOWNER",
    password: "pass1234",
    connectString : "192.168.1.60:9534/UNSGP"
  });
  if (con){
    console.log("i dey inside");
  }
  
  const data = await con.execute(
    `SELECT description, actual_code, ltrim(rtrim(short_descrp,0)) short_descrp 
    FROM code_desc
    WHERE code_type = ${code}`,
   
  );
  
  if(data.rows){

    const arr = [];

    for (let i = 0; i < data.rows.length; i++) {

    const description = data.rows[i][0];
    const actual_code = data.rows[i][1];
    const short_descrp = data.rows[i][2];

    arr.push({
      description: description,
      actual_code: actual_code,
      short_descrp: short_descrp
    });

    }

    res.send(arr);

  } else {
      res.send(err);
      console.log(err);
  }
  
  } catch (err){
    res.send(err);
  }

  }
  
  getCodeDetails();

});


// GET ACCOUNT DETAILS BY BY ACCOUNT NUMBER
index.post('/get-account-details', (req, res) => {

  const accountNumber = "'"+req.body.accountNumber+"'";

  async function getAccountDetails(){

  let con;
  
  try { 
  
  con = await oracledb.getConnection({
    user : "BANKOWNER",
    password: "pass1234",
    connectString : "192.168.1.60:9534/UNSGP"
  });
  if (con){
    console.log("i dey inside");
  }
  
  const data = await con.execute(
    `SELECT 
    ACCT_LINK, AV_BAL, BOOKBAL, 
       OD_LIM, POST_AV_BAL, POST_BOOKBAL, 
       POST_OD_LIM, SYSPOST_AV_BAL, UNCLEARED_BAL, 
       ACCOUNT_NUMBER, ACCOUNT_DESCRP, POST_ACCT_DESCRP, 
       BRANCH_CODE, BRDESC, STATUS_INDICATOR, 
       STATUS_DESC, CURRENCY_CODE, GET_CURRDESC(CURRENCY_CODE) Currency, LFM_TEMP, 
       MAX_DEPO_AMT, DEPO_ALLOW, MAX_WITHD_AMT, 
       WITHD_ALLOW, PROD_CODE, UNAUTH_OD, 
       CHQ_ALLOWED, CHQ_DEPO_ALLOW, TYPE_OF_ACCT, 
       LEGAL_FORM, CUST_NO, CASH_FLAG, 
       CHQ_FLAG, ACR_CHG, ACR_PENAL, 
       ACR_INT, VIEW_FLAG
    FROM BANKOWNER.VW_CASA_LEDGER
    WHERE ACCT_LINK = ${accountNumber}`,
  );
  
  if(data.rows){

    const arr = [];

    for (let i = 0; i < data.rows.length; i++) {

    const ACCT_LINK = data.rows[i][0];
    const AV_BAL = data.rows[i][1];
    const BOOKBAL = data.rows[i][2];
    const OD_LIM = data.rows[i][3];
    const POST_AV_BAL = data.rows[i][4];
    const POST_BOOKBAL = data.rows[i][5];
    const POST_OD_LIM = data.rows[i][6];
    const SYSPOST_AV_BAL = data.rows[i][7];
    const UNCLEARED_BAL = data.rows[i][8];
    const ACCOUNT_NUMBER = data.rows[i][9];
    const ACCOUNT_DESCRP = data.rows[i][10];
    const POST_ACCT_DESCRP = data.rows[i][11];
    const BRANCH_CODE = data.rows[i][12];
    const BRDESC = data.rows[i][13];
    const STATUS_INDICATOR = data.rows[i][14];
    const STATUS_DESC = data.rows[i][15];
    const CURRENCY_CODE = data.rows[i][16];
    const Currency = data.rows[i][17];
    const LFM_TEMP = data.rows[i][18];
    const MAX_DEPO_AMT = data.rows[i][19];
    const DEPO_ALLOW = data.rows[i][20];
    const MAX_WITHD_AMT = data.rows[i][21];
    const WITHD_ALLOW = data.rows[i][22];
    const PROD_CODE = data.rows[i][23];
    const UNAUTH_OD = data.rows[i][24];
    const CHQ_ALLOWED = data.rows[i][25];
    const CHQ_DEPO_ALLOW = data.rows[i][26];
    const TYPE_OF_ACCT = data.rows[i][27];
    const LEGAL_FORM = data.rows[i][28];
    const CUST_NO = data.rows[i][29];
    const CASH_FLAG = data.rows[i][30];
    const CHQ_FLAG = data.rows[i][31];
    const ACR_CHG = data.rows[i][32];
    const ACR_PENAL = data.rows[i][33];
    const ACR_INT = data.rows[i][34];
    const VIEW_FLAG = data.rows[i][35];
      
    arr.push({
        ACCT_LINK: ACCT_LINK,
        AV_BAL: AV_BAL,
        BOOKBAL: BOOKBAL,
        OD_LIM: OD_LIM,
        POST_AV_BAL: POST_AV_BAL,
        POST_BOOKBAL: POST_BOOKBAL,
        POST_OD_LIM: POST_OD_LIM,
        SYSPOST_AV_BAL: SYSPOST_AV_BAL,
        UNCLEARED_BAL: UNCLEARED_BAL,
        ACCOUNT_NUMBER: ACCOUNT_NUMBER,
        ACCOUNT_DESCRP: ACCOUNT_DESCRP,
        POST_ACCT_DESCRP: POST_ACCT_DESCRP,
        BRANCH_CODE: BRANCH_CODE,
        BRDESC: BRDESC,
        STATUS_INDICATOR: STATUS_INDICATOR,
        STATUS_DESC: STATUS_DESC,
        CURRENCY_CODE: CURRENCY_CODE,
        Currency: Currency,
        LFM_TEMP: LFM_TEMP,
        MAX_DEPO_AMT: MAX_DEPO_AMT,
        DEPO_ALLOW: DEPO_ALLOW,
        MAX_WITHD_AMT: MAX_WITHD_AMT,
        WITHD_ALLOW: WITHD_ALLOW,
        PROD_CODE: PROD_CODE,
        UNAUTH_OD: UNAUTH_OD,
        CHQ_ALLOWED: CHQ_ALLOWED,
        CHQ_DEPO_ALLOW: CHQ_DEPO_ALLOW,
        TYPE_OF_ACCT: TYPE_OF_ACCT,
        LEGAL_FORM: LEGAL_FORM,
        CUST_NO: CUST_NO,
        CASH_FLAG: CASH_FLAG,
        CHQ_FLAG: CHQ_FLAG,
        ACR_CHG: ACR_CHG,
        ACR_PENAL: ACR_PENAL,
        ACR_INT: ACR_INT,
        VIEW_FLAG: VIEW_FLAG
     });

    }

    res.send(arr);

  } else {
      res.send(err);
      console.log(err);
  }
  
  } catch (err){
    res.send(err);
  }

  }
  
  getAccountDetails();

});

// GET ACCOUNT DETAILS BY BY ACCOUNT NUMBER
index.get('/get-facility-number', (req, res) => {

 

  async function getFacilityNumber(){

  let con;
  
  try { 
  
  con = await oracledb.getConnection({
    user : "BANKOWNER",
    password: "pass1234",
    connectString : "192.168.1.60:9534/UNSGP"
  });
  if (con){
  console.log("i dey inside");
  }
  
  const data = await con.execute(
    `SELECT * 
    FROM FACILITY 
    WHERE FACILITY_NO ='0000002008'
    `
    );
    
    
    
    
    
    
    const myArray = [];
    let arr = '';  
    for (let i = 0; i < data.rows.length; i++) {
      
      for (x = 0; x< data.metaData.length; x++){
        // return res.send(data.rows);
         arr = '"' + data.metaData[x].name + '":"' + data.rows[i][x] + '"';
        // return res.send(arr);
        // myArray.push( ' " ' + [data.metaData[x].name] + ' : ' + data.rows[i][x] + ' " ');
        myArray.push(arr)
        // res.send(arr)

      }
    }
    // res.send(myArray)
    const arr2=JSON.parse("{" + myArray + "}")
     res.send(arr2);


    // )
  //   const ACCT_LINK = data.rows[i][0];
  //   const AV_BAL = data.rows[i][1];
  //   const BOOKBAL = data.rows[i][2];
  //   const OD_LIM = data.rows[i][3];
  //   const POST_AV_BAL = data.rows[i][4];
  //   const POST_BOOKBAL = data.rows[i][5];
  //   const POST_OD_LIM = data.rows[i][6];
  //   const SYSPOST_AV_BAL = data.rows[i][7];
  //   const UNCLEARED_BAL = data.rows[i][8];
  //   const ACCOUNT_NUMBER = data.rows[i][9];
  //   const ACCOUNT_DESCRP = data.rows[i][10];
  //   const POST_ACCT_DESCRP = data.rows[i][11];
  //   const BRANCH_CODE = data.rows[i][12];
  //   const BRDESC = data.rows[i][13];
  //   const STATUS_INDICATOR = data.rows[i][14];
  //   const STATUS_DESC = data.rows[i][15];
  //   const CURRENCY_CODE = data.rows[i][16];
  //   const Currency = data.rows[i][17];
  //   const LFM_TEMP = data.rows[i][18];
  //   const MAX_DEPO_AMT = data.rows[i][19];
  //   const DEPO_ALLOW = data.rows[i][20];
  //   const MAX_WITHD_AMT = data.rows[i][21];
  //   const WITHD_ALLOW = data.rows[i][22];
  //   const PROD_CODE = data.rows[i][23];
  //   const UNAUTH_OD = data.rows[i][24];
  //   const CHQ_ALLOWED = data.rows[i][25];
  //   const CHQ_DEPO_ALLOW = data.rows[i][26];
  //   const TYPE_OF_ACCT = data.rows[i][27];
  //   const LEGAL_FORM = data.rows[i][28];
  //   const CUST_NO = data.rows[i][29];
  //   const CASH_FLAG = data.rows[i][30];
  //   const CHQ_FLAG = data.rows[i][31];
  //   const ACR_CHG = data.rows[i][32];
  //   const ACR_PENAL = data.rows[i][33];
  //   const ACR_INT = data.rows[i][34];
  //   const VIEW_FLAG = data.rows[i][35];
      
  //   arr.push({
  //       ACCT_LINK: ACCT_LINK,
  //       AV_BAL: AV_BAL,
  //       BOOKBAL: BOOKBAL,
  //       OD_LIM: OD_LIM,
  //       POST_AV_BAL: POST_AV_BAL,
  //       POST_BOOKBAL: POST_BOOKBAL,
  //       POST_OD_LIM: POST_OD_LIM,
  //       SYSPOST_AV_BAL: SYSPOST_AV_BAL,
  //       UNCLEARED_BAL: UNCLEARED_BAL,
  //       ACCOUNT_NUMBER: ACCOUNT_NUMBER,
  //       ACCOUNT_DESCRP: ACCOUNT_DESCRP,
  //       POST_ACCT_DESCRP: POST_ACCT_DESCRP,
  //       BRANCH_CODE: BRANCH_CODE,
  //       BRDESC: BRDESC,
  //       STATUS_INDICATOR: STATUS_INDICATOR,
  //       STATUS_DESC: STATUS_DESC,
  //       CURRENCY_CODE: CURRENCY_CODE,
  //       Currency: Currency,
  //       LFM_TEMP: LFM_TEMP,
  //       MAX_DEPO_AMT: MAX_DEPO_AMT,
  //       DEPO_ALLOW: DEPO_ALLOW,
  //       MAX_WITHD_AMT: MAX_WITHD_AMT,
  //       WITHD_ALLOW: WITHD_ALLOW,
  //       PROD_CODE: PROD_CODE,
  //       UNAUTH_OD: UNAUTH_OD,
  //       CHQ_ALLOWED: CHQ_ALLOWED,
  //       CHQ_DEPO_ALLOW: CHQ_DEPO_ALLOW,
  //       TYPE_OF_ACCT: TYPE_OF_ACCT,
  //       LEGAL_FORM: LEGAL_FORM,
  //       CUST_NO: CUST_NO,
  //       CASH_FLAG: CASH_FLAG,
  //       CHQ_FLAG: CHQ_FLAG,
  //       ACR_CHG: ACR_CHG,
  //       ACR_PENAL: ACR_PENAL,
  //       ACR_INT: ACR_INT,
  //       VIEW_FLAG: VIEW_FLAG
  //    });

  //   }

  res.send(data);

  // } else {
  //     res.send(err);
  //     console.log(err);
  // }
  
  } catch (err){
    res.send(err);
  }

  }
  
  getFacilityNumber();

});