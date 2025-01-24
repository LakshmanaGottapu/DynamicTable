import { useState } from 'react'
import { EditingState, SortingState, TableInlineCellEditing, IntegratedSorting } from "@devexpress/dx-react-grid";
import { Grid, Table, TableHeaderRow, TableEditRow } from "@devexpress/dx-react-grid-material-ui";

const getRowId = row => row.id
function SampleTable({columns, rows, setRows}) {
    const [editingCells, setEditingCells] = useState([])
    // const [sortingState, setSortingState] = useState([])
    const [sortingStateColumnExtensions] = useState(columns.map(column => ({columnName:column.name, sortingEnabled:Boolean(column.sortingEnabled)})))
    // console.log(sortingStateColumnExtensions);
    // const [sortingStateColumnExtensions] = useState([{columnName:'age', sortingEnabled:!(!column.sortingEnabled)}])
    function rowChange(row, value, columnName) {
        const newRows = rows.map(r => r.id === row.id ? { ...r, [columnName]: value } : r)
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
        >
            <SortingState 
                // sorting={sortingState} 
                // onSortingChange={setSortingState}
                columnExtensions={sortingStateColumnExtensions}
            />
            <IntegratedSorting />
            <Table cellComponent={RenderCell} />
            <TableHeaderRow showSortingControls/>
            <EditingState
                editingCells={editingCells}
                onEditingCellsChange={checkDisabledRows}
                createRowChange={rowChange}
            />
            <TableInlineCellEditing cellComponent={renderEditableCell} />
        </Grid>
    )
}

export default SampleTable

