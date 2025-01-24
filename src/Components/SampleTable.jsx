import { useMemo, useState } from 'react'
import { EditingState, SortingState, TableInlineCellEditing, IntegratedSorting, DataTypeProvider } from "@devexpress/dx-react-grid";
import { Grid, Table, TableHeaderRow, TableEditRow } from "@devexpress/dx-react-grid-material-ui";

function SampleTable({columns, rows, setRows}) {
    const idColumn = useMemo(()=>columns.filter(column => column.name=='id' || column.isId)[0],[]);
    const getRowId = row => row[idColumn.name]
    const extensions = useMemo(() => columns.reduce((accumulator, column) => {
            accumulator.columnExtensions.push({columnName:column.name, align:column.align, width:column.width});
            accumulator.sortingStateColumnExtensions.push({columnName:column.name, sortingEnabled:Boolean(column.sortingEnabled)})
            accumulator.editColumnExtensions.push({columnName:column.name, editingEnabled:column.name==idColumn.name ? false : (column.editingEnabled==undefined ? true : Boolean(column.editingEnabled))})
            if(column.renderValue)
                accumulator.dataProviders.push(<DataTypeProvider formatterComponent={column.renderValue} for={[column.name]}/>)
            return accumulator;
        },{columnExtensions:[], sortingStateColumnExtensions:[], dataProviders:[], editColumnExtensions:[]})
    ,[])
    
    const [editingCells, setEditingCells] = useState([])
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
    const renderEditableCell = ({ children, row, column, value, editingEnabled, onValueChange, autoFocus, onFocus, onBlur, onKeyDown }) => {
        function commit() {
            onValueChange(cellData)
            setEditingCells([])
        }
        const [cellData, setCellData] = useState(value);
        if (column.editor)
            return (
                <Table.Cell style={{textAlign: column.align, border: '1px solid black' }}
                    onKeyDown={(e) => e.code == "Enter" ? commit() : null}
                    onBlur={commit}
                    onChange={(e) => setCellData(e.target.value)}
                    onFocus={onFocus}
                >
                    {column.editor(cellData)}
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
            return !col.isId && col.name!==idColumn.name && (col.editingEnabled == undefined ? true : col.editingEnabled)
        })
        if(newCells.length > 0)
            setEditingCells(newCells);
    }
    return (
        <Grid
            rows={rows}
            columns={columns}
            getRowId={getRowId}
        >
            {extensions.dataProviders}
            <SortingState 
                columnExtensions={extensions.sortingStateColumnExtensions}
            />
            <IntegratedSorting />
            <Table columnExtensions={extensions.columnExtensions} cellComponent={RenderCell}/>
            <TableHeaderRow showSortingControls/>
            <EditingState
                columnExtensions={extensions.editColumnExtensions}
                editingCells={editingCells}
                onEditingCellsChange={checkDisabledRows}
                createRowChange={rowChange}
            />
            <TableInlineCellEditing cellComponent={renderEditableCell} />
        </Grid>
    )
}

export default SampleTable

