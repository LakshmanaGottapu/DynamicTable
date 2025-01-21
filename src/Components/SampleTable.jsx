import {useState} from 'react'
import { DataTypeProvider, EditingState, TableInlineCellEditing } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
const columns = [
    { name: "id", title: "ID", isId: true },
    { name: 'username', title: "UserName", editingEnabled:false },
    { name: "age", title: "Age" },
    { name: "occupation", title: "Ocupation" }
]
const getRowId = row => row.id
function SampleTable() {
    const [rows, setRows] = useState([
        { id: 0, username: "Lakshman", age: 28, occupation: "Software Engineer" },
        { id: 2, username: "Prasanth", age: 28, occupation: "Driving Instructor" },
        { id: 4, username: "Premchand", age: 29, occupation: "Embedded Engineer" }
    ])
    
    const [editColumnExtensions, setEditColumnExtensions] = useState(columns.map(column => ({columnName:column.name, editingEnabled:column.editingEnabled})));
    function onCommitChanges({ added, changed, deleted }) {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length-1].id+1 : 0;
            changedRows = [...rows, ...added.map((row, index) => ({...row, id:startingAddedId+index}))] 
        }
        if (changed) 
            changedRows = rows.map( row => changed[row.id] ? {...row, ...changed[row.id]} : row)
        if (deleted) {
            changedRows = rows.filter( row => deleted.filter( deletedId => deletedId == row.id ).length == 0 )
        }
        console.log(changedRows);
        setRows(changedRows);
    }
    function rowChange(row, value, columnName){
        console.log({row, value, columnName});
    }
    return (
        <Grid
            rows={rows}
            columns={columns}
            getRowId={getRowId}
        // rootComponent={Root}
        >
            <Table />
            <TableHeaderRow />
            <EditingState 
                onCommitChanges={onCommitChanges} 
                // editingRowIds={[0]} 
                // createRowChange={rowChange}
                columnExtensions={editColumnExtensions}
            />
            <TableEditRow />
            <TableEditColumn
                showAddCommand
                showEditCommand
                showDeleteCommand
            />
            {/* <TableInlineCellEditing /> */}
        </Grid>
    )
}

export default SampleTable
