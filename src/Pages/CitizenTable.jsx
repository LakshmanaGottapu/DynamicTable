import React, { useState } from 'react'
import SampleTable from '../Components/SampleTable'
function Citizens() {
    const columns = [
        { name: "id", title: "ID", isId: true, align: 'left', width:'75px' },
        { name: 'username', title: "UserName", editingEnabled: false, width: '20rem', align: 'left' },
        {   name: "age", 
            title: "Age", 
            // editor: (params) => {
            //     console.log(params)
            //     return (
            //         <input style={{ color: 'red' }}
            //             value={params.cellData}
            //             autoFocus
            //         />)
            // },
            align:'left',
            width:'100px'
        },
        { name: "occupation", title: "Occupation", align: 'left',
            editor: (params) => {
                return (
                    <select style={{ color: 'red'}}
                        value={params.cellData}
                        autoFocus
                    >
                        <option value={"Software Engineer"}>Software Engineer</option>
                        <option value={"Embedded Engineer"}>Embedded Engineer</option>
                        <option value={"Pilot"}>Pilot</option>
                        <option value={"Driving Instructor"}>Driving Instructor</option>
                    </select>
                )
            },
            align:'center',
            width:'200px'
        }
    ]
    const [rows, setRows] = useState([
        { id: 1, username: "Lakshman", age: 28, occupation: "Software Engineer" },
        { id: 2, username: "Prasanth", age: 28, occupation: "Driving Instructor" },
        { id: 4, username: "Premchand", age: 29, occupation: "Embedded Engineer" }
    ])
  return (
    
        <SampleTable columns={columns} rows={rows} setRows={setRows}/>
  )
}

export default Citizens
