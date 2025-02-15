import React from 'react'
import DynamicTable from "./DynamicTable";
function TableWrapper() {
    const columns = [
      {name:"id", title:"ID", isId:true},
      {name:'username', title:"UserName"},
      {name:"age", title:"Age"},
      {name:"occupation", title:"Ocupation"}
    ]
    const rows = [
      {id:0, username:"Lakshman", age:28, occupation:"Software Engineer"},
      { id: 2, username: "Prasanth", age: 28, occupation: "Driving Instructor" },
      { id: 4, username: "Premchand", age: 29, occupation: "Embedded Engineer" }
    ]

  return (
    <DynamicTable
      columns={columns}
      data={rows}
      enableEdit={true}
      radioSelection={true}
    />
  )
}

export default TableWrapper
