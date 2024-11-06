import { useState, useContext } from 'react';
import { Form, Input, DatePicker, Select } from 'antd';
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
                <Select
                    onChange={(value) =>
                        setDescription(operatorMap[value])
                    }
                >
                    {
                        Object.keys(operatorMap).map((key, index) =>  <Select.Option key={index} value={key}>{key}</Select.Option>)
                    }
                </Select>
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
            <div style={{display:'flex', flexDirection:'column'}}>
                <strong>Description</strong>
                {description}
            </div>
        </div>
    )
}

export default PopupSection
