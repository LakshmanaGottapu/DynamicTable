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
      {id:0, username:"Lakshman", age:28, occupation:"Software Engineer"}
    ]
  return (
    <DynamicTable
      columns={columns}
      data={rows}
    />
  )
}

export default TableWrapper
