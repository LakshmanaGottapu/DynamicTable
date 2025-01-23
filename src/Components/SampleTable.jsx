import { useRef, useState } from 'react'
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
    { name: "id", title: "ID", isId: true, align: 'left' },
    { name: 'username', title: "UserName", editingEnabled: false, width: '20rem', align: 'left' },
    {   name: "age", 
        title: "Age", 
        editor: (params) => {
            console.log(params)
            return (
                <input style={{ color: 'red' }}
                    value={params.cellData}
                    autoFocus
                />)
        },
        align:'left'
    },
    { name: "occupation", title: "Occupation", align: 'left',
        editor: (params) => {
            // console.log(params)
            return (
                <select style={{ color: 'red' }}
                    value={params.cellData}
                    autoFocus
                >
                    <option value={"Software Engineer"}>Software Engineer</option>
                    <option value={"Embedded Engineer"}>Embedded Engineer</option>
                    <option value={"Pilot"}>Pilot</option>
                </select>
            )
        },
    }
]
const getRowId = row => row.id
function SampleTable() {
    const [rows, setRows] = useState([
        { id: 1, username: "Lakshman", age: 28, occupation: "Software Engineer" },
        { id: 2, username: "Prasanth", age: 28, occupation: "Driving Instructor" },
        { id: 4, username: "Premchand", age: 29, occupation: "Embedded Engineer" }
    ])
    // const [columnExtensions] = useState(columns.map(column => ({ columnName: column.name, width: column.width, align: column.align, wordWrapEnabled: column.wordWrapEnabled })))
    // const [editColumnExtensions] = useState(columns.map(column => ({ columnName: column.name, editingEnabled: column.editingEnabled })));
    const [editingCells, setEditingCells] = useState([])
    function commitChanges({ added, changed, deleted }) {
        console.log(changed)
        console.log('onCommitChanges method called')
        let changedRows;
        if (added) {
            const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
            changedRows = [...rows, ...added.map((row, index) => ({ ...row, id: startingAddedId + index }))]
        }
        if (changed)
            changedRows = rows.map(row => changed[row.id] ? { ...row, ...changed[row.id] } : row)
        if (deleted)
            changedRows = rows.filter(row => deleted.filter(deletedId => deletedId == row.id).length == 0)
        console.log(changedRows);
        setRows(changedRows);
    }
    function rowChange(row, value, columnName) {
        console.log('row change')
        let newRows;
        newRows = rows.map(r => r.id === row.id ? { ...r, [columnName]: value } : r)
        console.log(newRows);
        setRows(newRows);
    }
    function RenderCell(obj) {
        const { children, row, value, column, onClick } = obj
        const editable = !column.isId && (column.editingEnabled == undefined ? true : column.editingEnabled)
        return (
            <Table.Cell style={{ backgroundColor: editable ? '' : 'lightgray', cursor: editable ? 'pointer' : '', textAlign: column.align, border: '1px solid black' }} tabIndex={0} onFocus={onClick}>
                {children || value}
            </Table.Cell>
        )
    }
    const renderEditableCell = ({ row, column, value, editingEnabled, onValueChange, autoFocus, onFocus, onBlur, onKeyDown }) => {
        function commit() {
            onValueChange(cellData)
            setEditingCells([])
        }
        const [cellData, setCellData] = useState(value);
        if (column.editor)
            return (
                <Table.Cell 
                    onKeyDown={(e) => e.code == "Enter" ? commit() : null}
                    onBlur={commit}
                    onChange={(e) => setCellData(e.target.value)}
                    onFocus={onFocus}
                >
                    {column.editor({row, cellData, autoFocus})}
                </Table.Cell>
            )
        return (
            <TableEditRow.Cell style={{ textAlign: column.align }}
                row={row} column={column} value={cellData} editingEnabled={editingEnabled}
                onChange={(e) => setCellData(e.target.value)}
                autoFocus
                onFocus={onFocus}
                onBlur={commit}
                onKeyDown={(e) => e.code == "Enter" ? commit() : null}
            />
        )
    }
    const OccupationFormatter = (formatObject) => {
        const { column, row, value } = formatObject
        return (<span style={{ color: 'green' }}>{value}</span>)
    }
    const OccupationEditor = (editObject) => {
        const { value, onValueChange, autoFocus, row, column, disabled, onBlur, onFocus, onKeyDown, } = editObject
        // console.log({editObject})
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
        return (
            <DataTypeProvider formatterComponent={OccupationFormatter} editorComponent={OccupationEditor} {...props} />
        )
    }
    function checkDisabledRows(cells) {
        const newCells = cells.filter(cell => {
            const col = columns.filter(column => column.name == cell.columnName)[0]
            return !col.isId && (col.editingEnabled == undefined ? true : col.editingEnabled)
        })
        setEditingCells(newCells);
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
            // columnExtensions={columnExtensions}
            />
            <OccupationDataTypeProvider for={['occupation']} />
            <TableHeaderRow />
            <EditingState
                onCommitChanges={commitChanges}
                editingCells={editingCells}
                onEditingCellsChange={checkDisabledRows}
                createRowChange={rowChange}
            // columnExtensions={editColumnExtensions}
            />
            {/* <TableEditRow />
            <TableEditColumn /> */}
            <TableInlineCellEditing
                startEditAction='click'
                cellComponent={renderEditableCell}
            />
        </Grid>
    )
}

export default SampleTable

