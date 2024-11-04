import { useState, useContext } from 'react';
// import { ShipmentContext } from '../ShipmentContext';
import { Form, Input, DatePicker } from 'antd';

function PopupSection({id}) {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    // const [description, setDescription] = useState('');
    // const {operatorMap} = useContext(ShipmentContext);
    return (
        <div style={{display:'flex'}}>
            <Form.Item
                name={`checkbox_${id}`}
                label="check"
                // rules={[{ required: true, message: 'Please enter your username' }]}
                >
                <Input type='checkbox'/>
            </Form.Item>
            <Form.Item 
                name={`fromDate_${id}`}
                label="From Date"
                // rules={[{ required: true, message: 'Please enter your username' }]}
            >
                <DatePicker 
                    value={fromDate}
                    onChange={(_,date)=>setFromDate(date)}
                    format = 'DD/MM/YYYY'
                    placeholder="Select a date"
                />
            </Form.Item>
            <Form.Item 
                name={`toDate_${id}`}
                label="To Date"
                // rules={[{ required: true, message: 'Please enter your username' }]}
            >
                <DatePicker
                    selected={toDate}
                    onChange={(_,date)=>setToDate(date)}
                    format = 'DD/MM/YYYY'
                    placeholder="Select a date"
                />
            </Form.Item>
        </div>
    )
}

export default PopupSection
