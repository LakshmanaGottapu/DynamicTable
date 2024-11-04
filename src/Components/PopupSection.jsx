import { useState, useContext } from 'react';
import { Form, Input, DatePicker } from 'antd';
import { ShipmentContext } from '../ShipmentContext';
function PopupSection({id}) {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [description, setDescription] = useState('');
    const {operatorMap} = useContext(ShipmentContext);
    return (
        <div style={{display:'flex'}}>
            <Form.Item
                name={`checkbox_${id}`}
                label="check"
            >
                <Input type='checkbox'/>
            </Form.Item>
            <Form.Item 
                name={`operator_${id}`}
                label="operator"
            >
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button className="dropdown-item" type="button">Action</button>
                        <button className="dropdown-item" type="button">Another action</button>
                        <button className="dropdown-item" type="button">Something else here</button>
                    </div>
                </div>
            </Form.Item>
            <Form.Item 
                name={`fromDate_${id}`}
                label="From Date"
            >
                <DatePicker 
                    value={fromDate}
                    onChange={(date)=>setFromDate(date)}
                    format = 'DD/MM/YYYY'
                    placeholder="Select a date"
                />
            </Form.Item>
            <Form.Item 
                name={`toDate_${id}`}
                label="To Date"
            >
                <DatePicker
                    selected={toDate}
                    onChange={(  date)=>setToDate(date)}
                    format = 'DD/MM/YYYY'
                    placeholder="Select a date"
                />
            </Form.Item>
        </div>
    )
}

export default PopupSection
