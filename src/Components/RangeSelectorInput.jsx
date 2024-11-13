import { Form, Input, Modal, Tooltip, Button } from 'antd'
import moment from 'moment'
import { Row, Col, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import MomentDatePicker from './MomentDatePicker';
import { useEffect, useState } from 'react';
import DateEditor from './DateEditor';
import DynamicTable from './DynamicTable';

// import './RangeSelectorInput.css'

export default function RangeSelectorInput({ 
    onChange, 
    value, 
    label="Range Input:", 
    inputType="text", 
    dateDisplayFormat="MM/DD/YYYY", 
    dateSaveFormat="YYYY-MM-DD",
    styleClasses={
        mainLabel: "col-md-3 text-end",
        fromInput: "col-md-3",
        toLabel: "col-md-auto",
        toInput: "col-md-3",
        multiSelectButton: "col-md-2",
    }
}) {
    const [valueState, setValueState] = useState(value ? value : []);
    const [modalOpen, setModalOpen] = useState(false);
    const [fromTextInputVal, setFromTextInputVal] = useState((value && value[0] && value[0].length > 0) ? value[0][0] : "");
    const [toTextInputVal, setToTextInputVal] = useState((value && value[0] && value[0].length > 1) ? value[0][value[0].length-1] : "");

    useEffect(() => {
        const modalData = valueState!=undefined && valueState.map((arr, index) => {return {id: index, from:arr[0] ? arr[0] : undefined, to: arr.length > 1 ? arr[arr.length-1] : undefined}})
        if (modalData != undefined) {
            setModalData(modalData);
            setFromTextInputVal(modalData[0] && modalData[0].from!=undefined ? modalData[0].from : "");
            setToTextInputVal(modalData[0] && modalData[0].to!=undefined ? modalData[0].to : "");
        }
    }, [valueState])

    const convertDateRangeToStringArray = (from, to) => {
        if ((from==undefined || from=="") && (to==undefined || to=="")) return [];
        else if (from==undefined || from=="") return [to];
        else if (to==undefined || to=="") return [from];
        else {
            let daysCount = moment(from, dateSaveFormat).diff(to, 'days');
        
            const result = [];
            let start, end;
        
            if (daysCount < 0) {
                daysCount = Math.abs(daysCount);
                start = from;
                end = to;
            } else if (daysCount > 0) {
                start = to;
                end = from;
            } else {
                return [from];
            }
        
            for (let i=0; i<=daysCount; i++) {
                result.push(moment(start, dateSaveFormat).add(i, 'days').format(dateSaveFormat));
            }
        
            return result;
        } 
    }
    
    const convertTextRangeToStringArray = (from, to) => {
        if ((from==undefined || from=="") && (to==undefined || to=="")) return [];
        else if (from==undefined || from=="") return [to];
        else if (to==undefined || to=="") return [from];
        else {
            const isInt = (item) => !isNaN(item) && !item.includes('.') ;
        
            if (isInt(from) && isInt(to)) {
                const fromInt = parseInt(from);
                const toInt = parseInt(to);
        
                let start, end;
                if (fromInt < toInt) {
                    start=fromInt;
                    end=toInt;
                } else if (fromInt > toInt) {
                    start=toInt;
                    end=fromInt;
                } else {
                    return [from];
                }
        
                const result = [];
        
                for (let i=start; i<=end; i++) {
                    result.push("" + i);
                }
        
                return result;
            } else {
                return [from, to];
            }
        }
    }

    const modalColumns = [
        {
            title: "Row #",
            name: "id",
            isId: true,
            width: 100,
            getCellValue: (row) => row.id + 1,
        },
        {
            title: "From",
            name: "from",
            width: 150,
            editor: inputType=="date" ?  
            (params) => <DateEditor
                saveFormat={dateSaveFormat} 
                displayFormat={dateDisplayFormat}
                {...params} 
            /> : undefined,
            editorPasteValidator: inputType=="date" ? (newDate) => moment(newDate, ["M/DD/YYYY", "MM/D/YYYY", "M/D/YYYY", "MM/DD/YYYY"]).format("YYYY-MM-DD") : undefined,
            getCellValue: inputType=="date" ? 
            (row) => row.from ? moment(row.from, dateSaveFormat).format(dateDisplayFormat) : undefined 
            : undefined,
        },
        {
            title: "To",
            name: "to",
            width: 150,
            editor: inputType=="date" ?  
            (params) => <DateEditor
                saveFormat={dateSaveFormat} 
                displayFormat={dateDisplayFormat}
                {...params} 
            /> : undefined,
            editorPasteValidator: inputType=="date" ? (newDate) => moment(newDate, ["M/DD/YYYY", "MM/D/YYYY", "M/D/YYYY", "MM/DD/YYYY"]).format("YYYY-MM-DD") : undefined,
            getCellValue: inputType=="date" ? 
            (row) => 
                row.to ? moment(row.to, dateSaveFormat).format(dateDisplayFormat) : undefined 
            : undefined,
        },
        {
            title: "Range Length",
            getCellValue: (row) => (row && valueState[row.id]) ? valueState[row.id].length : 0,
            width: 200
        },
    ]

    const [modalData, setModalData] = useState(valueState!=undefined && valueState.map((arr, index) => {return {id: index, from:arr[0] ? arr[0] : undefined, to: arr.length > 1 ? arr[arr.length-1] : undefined}}))
    const handleModalDataChange = (changedData) => {
        const newValue = [...valueState];
        for (let change of changedData) {
            if(change.action == "deleted") {
                newValue.splice(change.item.id, 1);
            }
            if(change.action == "changed") {
                let updatedRange;
                if (inputType == "date") {
                    updatedRange = convertDateRangeToStringArray(change.item.from, change.item.to);
                } else {
                    updatedRange = convertTextRangeToStringArray(change.item.from, change.item.to);
                }
                newValue[change.item.id] = updatedRange;
            }
            setValueState(newValue);
            onChange?.(newValue);
        }
    }

    const addEmptyValueRow = () => {
        const newValue = [...valueState, []];
        setValueState(newValue);
        onChange?.(newValue);
    }
    return (
        <div className="RangeSelectorInput">
            <Row>
                <Col className={styleClasses.mainLabel}>
                    {label}
                </Col>
                <Col className={styleClasses.fromInput}>
                    {inputType=="date" ? 
                        <MomentDatePicker format={dateDisplayFormat} onChange={(newValue) => handleModalDataChange([{action: 'changed', item:{id:0, from:newValue==undefined?"":newValue.format(dateSaveFormat), to:(valueState[0] && valueState[0].length>1) ? valueState[0][valueState[0].length-1]:""}}])} value={(valueState && valueState[0] && valueState[0].length > 0) ? moment(valueState[0][0], dateSaveFormat) : undefined} /> : 
                        <Input value={fromTextInputVal} onChange={(e) => setFromTextInputVal(e.target.value)} onBlur={() => handleModalDataChange([{action: 'changed', item:{id:0, from:fromTextInputVal, to:(valueState[0] && valueState[0].length>1) ? valueState[0][valueState[0].length-1]:""}}])} />
                    }
                </Col>
                <Col className={styleClasses.toLabel}>
                    <span>To</span>
                </Col>
                <Col className={styleClasses.toInput}>
                    {inputType=="date" ? 
                        <MomentDatePicker format={dateDisplayFormat} onChange={(newValue) => handleModalDataChange([{action: 'changed', item:{id:0, from:(valueState[0] && valueState[0].length>=1) ? valueState[0][0] : "", to:newValue==undefined?"":newValue.format(dateSaveFormat)}}])} value={(valueState && valueState[0] && valueState[0].length > 1) ? moment(valueState[0][valueState[0].length-1], dateSaveFormat) : undefined} /> : 
                        <Input value={toTextInputVal} onChange={(e) => setToTextInputVal(e.target.value)} onBlur={() => handleModalDataChange([{action: 'changed', item:{id:0, from:(valueState[0] && valueState[0].length>=1) ? valueState[0][0] : "", to:toTextInputVal}}])} />
                    }
                </Col>
                <Col className={styleClasses.multiSelectButton}>
                    <Button icon={<FontAwesomeIcon color={valueState.length > 1 ? "#1677ff":"black"} icon={faArrowUpRightFromSquare} />} onClick={() => setModalOpen(true)}/>
                </Col>
            </Row>

            <Modal 
                open={modalOpen} 
                styles={{
                    body: {
                        height: 400,
                        "overflow-y": "scroll",
                        "overflow-x": "hidden"
                    },
                }}     
                title={
                    <div style={{ textAlign: "center", width: "100%" }}>
                        Multiple Input Selection
                    <hr
                        key="divider"
                        style={{
                            width: "100%",
                            margin: "0 0 10px 0",
                            backgroundColor: "#F5F5F5",
                            height: "2px",
                            opacity: 0.5,
                        }}
                    />
                    </div>
                }
                onCancel={() => setModalOpen(false)}
                footer={
                    <Container>
                        <Row>
                            <Col>
                                <span>Total Items Selected: {valueState.flat().length}</span>
                            </Col>
                            <Col className='col-md-8'>
                                <Button key="insert" type="primary" onClick={() => addEmptyValueRow()}>
                                    Insert New Row
                                </Button>
                                <Button className="ms-1" key="OK" type="primary" onClick={() => setModalOpen(false)}>
                                    OK
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                }
                width={800}
            >
                <div className="flex">
                    <DynamicTable 
                        columns={modalColumns}
                        data={modalData}
                        enableAdd={false}
                        enableEdit={true}
                        enableDelete={true}
                        enableToolbar={false}
                        onDataChange={handleModalDataChange}
                    />
                </div>
            </Modal>
        </div>
    )
}
