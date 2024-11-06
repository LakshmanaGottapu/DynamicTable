import { useState, useContext } from 'react';
import { Form, Input, DatePicker, Select } from 'antd';
import { ShipmentContext } from '../ShipmentContext';
function PopupSection({id}) {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [description, setDescription] = useState('');
    const {operatorMap} = useContext(ShipmentContext);
    return (
        <tr>
            <td style={{margin:'1rem', border:'1px solid black'}}>
                <Form.Item
                    name={`checkbox_${id}`}
                >
                    <Input type='checkbox'/>
                </Form.Item>
            </td>
            <td>
                <Form.Item 
                    name={`operator_${id}`}
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
            </td>
            <td>
                <Form.Item 
                    name={`fromDate_${id}`}
                >
                    <DatePicker 
                        value={fromDate}
                        onChange={(date)=>setFromDate(date)}
                        format = 'DD/MM/YYYY'
                        placeholder="Select a date"
                    />
                </Form.Item>
            </td>
            <td>
                <Form.Item 
                    name={`toDate_${id}`}
                >
                    <DatePicker
                        selected={toDate}
                        onChange={(  date)=>setToDate(date)}
                        format = 'DD/MM/YYYY'
                        placeholder="Select a date"
                    />
                </Form.Item>
            </td>
            <td>
                <div style={{display:'flex', flexDirection:'column'}}>
                    {description}
                </div>
            </td>
        </tr>
    )
}

export default PopupSection
