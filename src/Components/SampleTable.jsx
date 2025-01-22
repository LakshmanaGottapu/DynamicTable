import { useState } from 'react'
import { DataTypeProvider, EditingState, TableInlineCellEditing } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
import { Select } from 'antd';
const columns = [
    { name: "id", title: "ID", isId: true, align: 'center' },
    { name: 'username', title: "UserName", editingEnabled: false, width: '20rem', align: 'center' },
    { name: "age", title: "Age", align: 'center' },
    { name: "occupation", title: "Occupation", align: 'center' }
]
const getRowId = row => row.id
function SampleTable() {
    const [rows, setRows] = useState([
        { id: 1, username: "Lakshman", age: 28, occupation: "Software Engineer" },
        { id: 2, username: "Prasanth", age: 28, occupation: "Driving Instructor" },
        { id: 4, username: "Premchand", age: 29, occupation: "Embedded Engineer" }
    ])
    const [columnExtensions] = useState(columns.map(column => ({ columnName: column.name, width: column.width, align: column.align, wordWrapEnabled: column.wordWrapEnabled })))
    const [editColumnExtensions] = useState(columns.map(column => ({ columnName: column.name, editingEnabled: column.editingEnabled })));
    function onCommitChanges({ added, changed, deleted }) {
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [...rows, ...added.map((row, index) => ({ ...row, id: startingAddedId + index }))]
        }
        if (changed)
            changedRows = rows.map(row => changed[row.id] ? { ...row, ...changed[row.id] } : row)
        if (deleted)
            changedRows = rows.filter(row => deleted.filter(deletedId => deletedId == row.id).length == 0)
        setRows(changedRows);
    }
    function rowChange(row, value, columnName) {
        let newRows;
        newRows = rows.map(r => r.id === row.id ? { ...r, [columnName]: value } : r)
        console.log(newRows);
        setRows(newRows);
    }
    // const editableCell;
    const renderEditableCell = ({ row, column, value, editingEnabled, onValueChange, autoFocus, onFocus, onBlur, onKeyDown }) => {
        console.log(onValueChange);
        return (
            <input key={row.id}
                type="text"
                value={value || ""}
                onChange={(e) => onValueChange(e.target.value)}
            // autoFocus={autoFocus}
            // style={{border:'none'}}
            // onBlur={(e)=>console.log(e)}
            />
        )
    }
    const OccupationFormatter = (formatObject) => {
        // console.log({ formatObject })
        const { column, row, value } = formatObject
        return (<span style={{color:'green'}}>{value}</span>)
    }
    const OccupationEditor = (editObject) => {
        const { value, onValueChange, autoFocus, row, column, disabled, onBlur, onFocus,onKeyDown, } = editObject
        console.log({editObject})
        return (
            <Select defaultValue={value} 
                onChange={onValueChange}
            >
                <Select.Option value={"software engineer"}>software engineer</Select.Option>
                <Select.Option value={"banker"}>banker</Select.Option>
                <Select.Option value={"pilot"}>pilot</Select.Option>
            </Select>
        )
    }
    const OccupationDataTypeProvider = (props) => {
        // console.log({props})
        return (
            <DataTypeProvider formatterComponent={OccupationFormatter} editorComponent={OccupationEditor} {...props} />
        )
    }
    function RenderCell({ children, row, value, column }) {
        console.log({children})
        return (
            <Table.Cell style={{ backgroundColor: column.editingEnabled ? 'lightgray' : 'white', textAlign: column.align }} >
                {children || value}
            </Table.Cell>
        )
    }
    return (
        <Grid
            rows={rows}
            columns={columns}
            getRowId={getRowId}
        // rootComponent={Root}
        >
            <Table
                cellComponent={RenderCell}
                columnExtensions={columnExtensions}
            />
            <OccupationDataTypeProvider for={['occupation']} />
            <TableHeaderRow />
            <EditingState
                onCommitChanges={onCommitChanges}
                // editingRowIds={[0]} 
                // createRowChange={rowChange}
                columnExtensions={editColumnExtensions}
            />
            <TableEditRow />
            <TableEditColumn showDeleteCommand showEditCommand />
            {/* <TableInlineCellEditing 
                startEditAction='click'
                selectTextOnEditStart={true}
                cellComponent={renderEditableCell}
            /> */}
        </Grid>
    )
}

export default SampleTable

