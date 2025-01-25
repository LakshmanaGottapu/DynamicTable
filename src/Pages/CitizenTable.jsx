import React, { useState } from 'react'
import SampleTable from '../Components/SampleTable'
function Citizens() {
    const columns = [
        { name: "id", title: "ID", align: 'left', width:'75px' },
        { name: 'username', title: "UserName", editingEnabled: false, width: '20rem', align: 'center' },
        {   name: "age", 
            title: "Age",
            sortingEnabled:true, 
            renderValue: (row) => {
                return (<span>{row.value} years</span>)
            },
            align:'center',
            width:'100px'
        },
        { name: "occupation", title: "Occupation", align: 'center',
            editor: (cellData) => {
                return (
                    <select style={{ color: 'red'}}
                        value={cellData}
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
    const rows = [
        { id: 1, username: "Lakshman", age: 30, occupation: "Software Engineer" },
        { id: 2, username: "Prasanth", age: 28, occupation: "Driving Instructor" },
        { id: 3, username: "Premchand", age: 29, occupation: "Embedded Engineer" },
        { id: 4, username: "Harish", age: 29, occupation: "Embedded Engineer" },
        { id: 5, username: "Sai kumar", age: 29, occupation: "Embedded Engineer" },
        { id: 6, username: "Faheem", age: 29, occupation: "Embedded Engineer" },
        { id: 7, username: "Naveen", age: 29, occupation: "Embedded Engineer" },
        { id: 8, username: "Bhaskar", age: 29, occupation: "Embedded Engineer" },
        { id: 9, username: "Gnaneswari", age: 29, occupation: "Embedded Engineer" },
        { id: 10, username: "Sushma", age: 29, occupation: "Embedded Engineer" },
        { id: 11, username: "Sravani", age: 29, occupation: "Embedded Engineer" },
        { id: 12, username: "Satya", age: 29, occupation: "Embedded Engineer" },
        { id: 13, username: "Priya", age: 29, occupation: "Embedded Engineer" },
        { id: 14, username: "Venu", age: 29, occupation: "Embedded Engineer" },
        { id: 15, username: "Madhuri", age: 29, occupation: "Embedded Engineer" },
        { id: 16, username: "Deepak", age: 29, occupation: "Embedded Engineer" },
        { id: 17, username: "Siva", age: 29, occupation: "Embedded Engineer" },
        { id: 18, username: "Krishna", age: 29, occupation: "Embedded Engineer" },
        { id: 19, username: "Prasad", age: 29, occupation: "Embedded Engineer" },
        { id: 20, username: "Dinesh", age: 29, occupation: "Embedded Engineer" },
        { id: 21, username: "Prasanna", age: 29, occupation: "Embedded Engineer" },
        { id: 22, username: "Arjun", age: 29, occupation: "Embedded Engineer" },
        { id: 23, username: "Shanthi", age: 29, occupation: "Embedded Engineer" },
        { id: 24, username: "Veena", age: 29, occupation: "Embedded Engineer" },
        { id: 25, username: "Sarath", age: 29, occupation: "Embedded Engineer" },
        { id: 26, username: "Vara", age: 29, occupation: "Embedded Engineer" },
        { id: 27, username: "Anjali", age: 29, occupation: "Embedded Engineer" },
        { id: 28, username: "Chandu", age: 29, occupation: "Embedded Engineer" },
        { id: 29, username: "Sravya", age: 29, occupation: "Embedded Engineer" },
        { id: 30, username: "Ravi", age: 29, occupation: "Embedded Engineer" },
    ]
  return (
        <SampleTable columns={columns} data={rows}/>
  )
}

export default Citizens
