import React from "react";
import MUIDataTable from "mui-datatables";

function DataTable({ title,rowsPerPage,Data}) {
  const arr = [];

  Data.map((i)=>{
    arr.push([i[1] , null , i[0] , i[2] , null , i[3] , null , i[4] ])
  })

  const columns = ["Customer ID", "Relation No", "Customer Name", "Phone", "Date Of Birth", "Branch", "Created By", "Relationship Type"]
  const options = {
                    filterType: "checkbox",
                    rowsPerPage: rowsPerPage, 
                  };
  const data =   arr
                   console.log(data)
  
  return (
    <div>
      <MUIDataTable
        title={title}
        data={data} // example: ["James Houston", "Test Corp", "Dallas", "TX"],
        columns={columns} // example: ["Name", "Company", "City", "State"]
        options={options}
      />
    </div>
  );
}

export default DataTable;
