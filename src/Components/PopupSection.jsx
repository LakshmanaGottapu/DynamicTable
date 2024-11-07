import { useState, useContext } from 'react';
import { Form, Input, DatePicker, Select } from 'antd';
import { ShipmentContext } from '../ShipmentContext';
import styled from 'styled-components';
const StyledFormItem = styled(Form.Item)`
        .ant-form-item-control-input {
            border: none !important;
            box-sizing: border-box;
        }
        margin: 0;
        padding: 0;
        `;
function PopupSection({id}) {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [description, setDescription] = useState('');
    const {operatorMap} = useContext(ShipmentContext);
    
    return (
        <tr>
            <td style={{margin:'1rem', border:'1px solid black'}}>
                <StyledFormItem
                    name={`checkbox_${id}`}
                >
                    <Input type='checkbox'/>
                </StyledFormItem>
            </td>
            <td style={{border:'1px solid black', overflow:'hidden'}}>
                <StyledFormItem 
                    name={`operator_${id}`}
                >
                    <Select style={{transform:'translate(-40%,-10%)', transform:'scaleX(1.3)', transform:'scaleY(1.5)'}}
                        onChange={(value) =>
                            setDescription(operatorMap[value])
                        }
                    >
                        {
                            Object.keys(operatorMap).map((key, index) =>  <Select.Option key={index} value={key}>{key}</Select.Option>)
                        }
                    </Select>
                </StyledFormItem>
            </td>
            <td style={{border:'1px solid black', overflow:'hidden'}}>
                <StyledFormItem 
                    name={`fromDate_${id}`}
                >
                    <DatePicker style={{transform:'translate(-40%,-10%)', transform:'scale(1.2)'}}
                        value={fromDate}
                        onChange={(date)=>setFromDate(date)}
                        format = 'DD/MM/YYYY'
                        placeholder="Select a date"
                    />
                </StyledFormItem>
            </td>
            <td style={{border:'1px solid black', overflow:'hidden'}}>
                <StyledFormItem 
                    name={`toDate_${id}`}
                >
                    <DatePicker style={{transform:'translate(-40%,-10%)', transform:'scale(1.2)'}}
                        selected={toDate}
                        onChange={(  date)=>setToDate(date)}
                        format = 'DD/MM/YYYY'
                        placeholder="Select a date"
                    />
                </StyledFormItem>
            </td>
            <td style={{border:'1px solid black', overflow:'hidden'}}>
                <p style={{display:'flex', flexDirection:'column'}}>
                    {description}
                </p>
            </td>
        </tr>
    )
}

export default PopupSection
