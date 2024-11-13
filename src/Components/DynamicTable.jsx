import React, { useState, useRef, useCallback, useEffect } from 'react';
import { EditingState, SortingState, FilteringState, IntegratedSorting, IntegratedFiltering, SelectionState, DataTypeProvider, IntegratedSelection, GroupingState, SummaryState, IntegratedGrouping, IntegratedSummary } from '@devexpress/dx-react-grid';
import {
    Grid,
    TableHeaderRow,
    TableFilterRow,
    TableInlineCellEditing,
    Toolbar,
    ExportPanel,
    ColumnChooser,
    TableColumnVisibility,
    TableFixedColumns,
    TableSelection,
    TableEditRow,
    TableEditColumn,
    TableColumnResizing,
    VirtualTable,
    TableGroupRow,
    TableSummaryRow
} from '@devexpress/dx-react-grid-material-ui';
import { Plugin } from '@devexpress/dx-react-core';
import { GridExporter } from '@devexpress/dx-react-grid-export';
import saveAs from 'file-saver';

import "./DynamicTable.css"

const Root = props => <Grid.Root {...props} style={{height: '100%'}} />;

const onSave = (workbook) => {
    return workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ExportedResults.xlsx');
    });
};

const DynamicTable = ({ 
    columns, 
    data, 
    onDataChange, 
    leftColumns = [], 
    cellStyles =[], 
    disabledCells = [], 
    errorCells = [],
    grouping = [],
    groupSummaryItems = [],
    totalSummaryItems = [],
    onSelectedRowsChange = false, 
    selectedRows = false, 
    enableFilterRow = false, 
    enableEdit = false, 
    enableAdd = false, 
    enableDelete = false, 
    enableToolbar = true, 
    enableSortingControls = true 
}) => {

    if(onDataChange == undefined)  onDataChange = (changedRows) => {};

    const [rows, setRows] = useState(data);
    const [editingCells, setEditingCells] = useState([]);
    const [leftColumnValues, setLeftColumnValues] = useState([TableSelection.COLUMN_TYPE, TableEditColumn.COLUMN_TYPE, ...leftColumns]);
    const [selection, setSelection] = useState([]);
    const [idColumn, setIdColumn] = useState({});
    const [hiddenColumnNames, setHiddenColumnNames] = useState(columns.filter(col => col.visible == false).map(col => col.name));
    const [groups, setGroups] = useState(grouping);

    const exporterRef = useRef(null);
    const [columnsToExport, setColumnsToExport] = useState([]);

    const visibleColumns = (hiddenColumns) => {
        setHiddenColumnNames(hiddenColumns);
        const colsToExport = columns.map(column => {
            if (!hiddenColumns.includes(column.name)) {
                return { title: column.title, name: column.name };
            }
            return '';
        }).filter(column => column !== '');
        setColumnsToExport(colsToExport);
    };

    const checkDisabledRowIds = (cells) => {
        let newEditingCells = cells.filter(c => disabledCells.filter(dc => dc.columnName ? c.columnName == dc.columnName && c.rowId == dc.rowId : dc.rowId == c.rowId).length == 0);
        newEditingCells = newEditingCells.filter(cell => !columns.map(col => col.editingEnabled == false && col.name).includes(cell.columnName));
        setEditingCells(newEditingCells)
    }
    const isCellDisabled = ({ rowId, columnName }) => {
        return disabledCells.filter(dc => dc.columnName ? columnName == dc.columnName && rowId == dc.rowId : dc.rowId == rowId).length > 0 ||
                columns.filter(col => col.editingEnabled == false && col.name == columnName).length > 0
    }

    useEffect(() => {
        if (Array.isArray(selectedRows)){
            setSelection(selectedRows.map(r => r[idColumn.name]));
        }
    }, [selectedRows])

    useEffect(() => {
        setColumnsToExport(columns.filter(col => col.removeFromExport !== true));
        setIdColumn(columns.filter(col => col.isId == true)[0]);
    }, [columns]);

    useEffect(() => {
        setRows(data);
    }, [data]);

    let pasteData = null;
    const handlePasteEvent = (event) => {
        pasteData = event.clipboardData.getData("text");
        setTimeout(() => document.activeElement.blur(), 10);
    }

    const commitChanges = ({ added, changed, deleted }) => {
        let newRows;
        let changedRows = [];
        if (added) {
          newRows = [
            ...rows,
            ...added.map((row, index) => (row[idColumn.name] = new) && (changedRows.push({action:'added', item: row}) && {
              ...row,
            })),
          ];
        }
        if (changed) {
            const changedRowKeys = Object.keys(changed);
            const firstRowChanges = changedRowKeys[0] && changed[changedRowKeys[0]] ? Object.keys(changed[changedRowKeys[0]]) : [];

            if (
                pasteData && 
                (pasteData.includes("\n") || pasteData.includes("\t")) &&
                changedRowKeys.length == 1 &&
                (editingCells.length == 1 || firstRowChanges.length == 1)
            ) {
                if (editingCells.length == 1 && firstRowChanges.length == 0) {
                    changed[changedRowKeys[0]] = {};
                    changed[changedRowKeys[0]][editingCells[0].columnName] = "";
                }

                const changedRowIdValue = changedRowKeys[0];
                let rowIndex = rows.indexOf(rows.filter(row => row[idColumn.name]==changedRowIdValue)[0])
                let colName = Object.keys(changed[changedRowIdValue])[0];
                let startingColIndex = columnExtensions.indexOf(columnExtensions.filter(col => col.name == colName)[0])
                const newChangedValue = {};

                const pasteDataArray = pasteData.includes("\r\n") ? pasteData.split("\r\n") : pasteData.split("\n"); //split row changes by \r\n or \n depending on what is present in the pasteData
                const pasteDataMatrix = pasteDataArray.map(row => row.split("\t")); // split column changes by \t
                if(pasteData.slice(-1) == "\n") pasteDataMatrix.pop(); // remove last item if new line at the end excel adds an additional new line

                for (let rowChangeArray of pasteDataMatrix){
                    if (!rows[rowIndex]) break; // if row does not exist at index the following row will probably not exist either
                    const rowIdValue = rows[rowIndex][idColumn.name];
                    newChangedValue[rowIdValue] = {};
                    let colIndex = startingColIndex;
                    for (let columnValue of rowChangeArray) {
                        const rowColToChange = columnExtensions[colIndex];
                        if (rowColToChange && rowColToChange.editingEnabled && !isCellDisabled({ rowId: rowIdValue, columnName: rowColToChange.name })) { // non editable columns and columns are skipped from changes
                            if (rowColToChange.editor) {
                                if (rowColToChange.editorPasteValidator) {
                                    newChangedValue[rowIdValue][rowColToChange.name] = rowColToChange.editorPasteValidator(columnValue);
                                }
                            } else {
                                newChangedValue[rowIdValue][rowColToChange.name] = columnValue;
                            }
                        } 
                        colIndex++;
                    }
                    rowIndex++
                }
        
                changed = newChangedValue;
            }
            newRows = rows.map(row => (changed[row[idColumn.name]] ? changedRows.push({action:'changed', item:{...row, ...changed[row[idColumn.name]]}}) && { ...row, ...changed[row[idColumn.name]] } : row));
        }
        if (deleted) {
          const deletedSet = new Set(deleted);
          deleted.map(deletedId => changedRows.push({action:'deleted', item: rows.filter(row => row[idColumn.name] === deletedId)[0]}))
          newRows = rows.filter(row => !deletedSet.has(row[idColumn.name]));
        }
        setRows(newRows);
        onDataChange(changedRows);
        pasteData = null;
    };

    const RenderCell = ({ onClick, ...restProps }) => {        
        const isDisabled = restProps.row && restProps.column && restProps.column.name && isCellDisabled({rowId: getRowId(restProps.row), columnName:restProps.column.name});
        const isInError = restProps.row && restProps.column && restProps.column.name && errorCells.filter(ec => ec.columnName ? ec.columnName == restProps.column.name && ec.rowId == getRowId(restProps.row) : ec.rowId == getRowId(restProps.row)).length > 0;
        const filteredCellStyleObjs = restProps.row && restProps.column && restProps.column.name && cellStyles.filter(cs => cs.columnName ? cs.columnName == restProps.column.name && cs.rowId == getRowId(restProps.row) : cs.rowId == getRowId(restProps.row))

        const cellStyle = filteredCellStyleObjs && filteredCellStyleObjs.length > 0 && filteredCellStyleObjs[0].style ? filteredCellStyleObjs[0].style : {}
        return (
            <VirtualTable.Cell {...restProps} style={{ backgroundColor: isDisabled && enableEdit ? "#E6E6E6":"#FFFFFF", border: isInError ? "2px solid #FF0000" : undefined, ...cellStyle, ...restProps.style}} tabIndex={0} onFocus={onClick}>
                {restProps.column.renderValue ? restProps.column.renderValue(restProps.row) : restProps.value}
            </VirtualTable.Cell>
        )
    };

    const customizeExcelCell = (cell, row, column) => {
        const filteredStyleObjs = row && column && column.name && cellStyles.filter(cs => cs.columnName ? cs.columnName == column.name && cs.rowId == getRowId(row) : cs.rowId == getRowId(row));
        const cellStyleObjs = filteredStyleObjs.filter(obj => obj.columnName != null).map(obj => obj.style);
        const rowStyleObjs = filteredStyleObjs.filter(obj => obj.columnName == null).map(obj => obj.style);

        const cellStyle = cellStyleObjs.reduce((resultObj, currentObj) => { return {...resultObj, ...currentObj}}, {});
        const rowStyle = rowStyleObjs.reduce((resultObj, currentObj) => { return {...resultObj, ...currentObj}}, {});

        // Update Excel cell and row background styling.
        if (cellStyle.backgroundColor && cellStyle.backgroundColor[0] == '#') {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: cellStyle.backgroundColor.slice(1) }};
        }
        if (rowStyle.backgroundColor && rowStyle.backgroundColor[0] == '#') {
            cell._row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowStyle.backgroundColor.slice(1) }};
        }
    }

    const startExport = useCallback((options) => {
        exporterRef.current.exportGrid(options);
    }, [exporterRef]);

    const getRowId = row => {
        const idColumn = columns.filter(col => col.isId == true)[0];
        return idColumn ? row[idColumn.name] : row.id;
    };

    const columnExtensions = columns.map(column => ({
        columnName: column.name,
        editingEnabled: column.editingEnabled || !column.isId,
        togglingEnabled: column.visible,
        width: 100,
        ...column
    }));

    return (
        <div onPaste={handlePasteEvent} style={{height: '100%'}} className="DynamicTable card">
            <Grid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
                rootComponent={Root}
            >
                <SortingState />
                <GroupingState
                    grouping={groups}
                    onGroupingChange={setGroups}
                />
                <SummaryState 
                    totalItems={totalSummaryItems}
                    groupItems={groupSummaryItems}
                />
                {onSelectedRowsChange != false &&
                <SelectionState
                    selection={selection}
                    onSelectionChange={e => { if (selectedRows == false) setSelection(e); onSelectedRowsChange(rows.filter(r => e.includes(r[idColumn.name])));}}
                />}
                <FilteringState defaultFilters={[]} />
                <EditingState
                    onEditingCellsChange={(cells) => checkDisabledRowIds(cells)}
                    editingCells={editingCells}
                    columnExtensions={columnExtensions}
                    onCommitChanges={commitChanges}
                />
                {onSelectedRowsChange != false && <IntegratedSelection />}
                <IntegratedSorting />
                <IntegratedGrouping />
                <IntegratedSummary />
                <IntegratedFiltering />
                <Plugin name="providers">
                    {columns.map((col) => {
                        if (col.editor) {
                            return (<DataTypeProvider editorComponent={params => col.editor(params)} for={[col.name]} />)
                        }
                    })}
                </Plugin>
                <VirtualTable 
                    cellComponent={RenderCell}
                    height={"auto"} 
                />
                <TableColumnResizing
                    defaultColumnWidths={columnExtensions}
                />
                <TableHeaderRow showSortingControls={enableSortingControls} />
                {enableFilterRow && <TableFilterRow />}
                <TableEditRow />
                {onSelectedRowsChange != false && <TableSelection 
                    showSelectAll={true}
                />}
                <TableGroupRow 
                    showColumnsWhenGrouped={true}
                />
                <TableSummaryRow />
                {(enableAdd || enableDelete) && <>
                    <TableEditColumn
                        showAddCommand={enableAdd && true}
                        showDeleteCommand={enableDelete && true}
                        onExecute={({ id }) => setEditingRowIds([id])}
                    />
                </>}
                {enableEdit && <TableInlineCellEditing
                    startEditAction='click'
                    selectTextOnEditStart={true}
                />}
                <TableColumnVisibility
                    onHiddenColumnNamesChange={visibleColumns}
                    hiddenColumnNames={hiddenColumnNames}
                    columnExtensions={columnExtensions}
                />
                <TableFixedColumns leftColumns={leftColumnValues} />
                {enableToolbar && <Toolbar />}
                {enableToolbar && <ColumnChooser />}
                {enableToolbar && <ExportPanel startExport={startExport} />}
            </Grid>
            <GridExporter
                ref={exporterRef}
                rows={data}
                columns={columnsToExport}
                grouping={groups}
                selection={selection}
                groupSummaryItems={groupSummaryItems}
                totalSummaryItems={totalSummaryItems}
                showColumnsWhenGrouped={true}
                onSave={onSave}
                customizeCell={customizeExcelCell}
            />
        </div>
    );
};


export default DynamicTable;