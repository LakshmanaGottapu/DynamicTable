import { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ShipmentContext } from '../ShipmentContext';

function PopupSection({id}) {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [description, setDescription] = useState('');
    const {operatorMap} = useContext(ShipmentContext);
    return (
        <tr>
            <td>
                <input type="checkbox" name={`checkbox_${id}`}/>
            </td>
            <td>
                <select name={`operator_${id}`} onChange={(e)=>setDescription(operatorMap[e.target.value])}>
                    <option value="" defaultValue={""}>Select</option>
                    <option value="[]">[]</option>
                    <option value="<">{'<'}</option>
                    <option value=">">{'>'}</option>
                    <option value="<=">{'<='}</option>
                    <option value="=">{'='}</option>
                    <option value=">=">{'>='}</option>
                </select>
            </td>
            <td>            
                <DatePicker name={`fromDate_${id}`}
                    selected={fromDate}
                    onChange={(date)=>setFromDate(date)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select a date"
                />
            </td>
            <td style={{position:'relative'}}>
                <DatePicker name={`toDate_${id}`}
                    selected={toDate}
                    onChange={(date)=>setToDate(date)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select a date"
                />
            </td>
            <td>
                <p>{description}</p>
            </td>
        </tr>
    )
}

export default PopupSection
