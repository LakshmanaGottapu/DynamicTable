import {useState} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PopupSection({id}) {
    const [isEnabled, setIsEnabled] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [errors, setErrors] = useState({toDate:null, fromDate:null});
    function handleCheckboxChange(){
        setIsEnabled(prev=>!prev);
        if(isEnabled){
            setDropdownValue("");
            setToDate("");
            setFromDate("");
        }
    }
    function handleDropdownChange(e){
        setDropdownValue(e.target.value);
    }
    function handleFromDateChange(date){
        setFromDate(date)
    }
    function handleToDateChange(date){
        setErrors(prev => ({...prev, toDate:null}))
        if(!fromDate)
            return setErrors(prev => {
                const newState = {...prev};
                newState["toDate"] = 'select from date first'
                return newState
            });
        const lowerlimit = fromDate.setHours(0, 0, 0, 0)
        if(date <= lowerlimit)
            return setErrors(prev => {
                const newState = {...prev};
                newState["toDate"] = 'from date cannot be older than todays date'
                return newState;
            })
        setToDate(date)
    }
    return (
        <>
        <tr>
            <td>
                <input type="checkbox" name={`checkbox_${id}`} onChange={handleCheckboxChange}/>
            </td>
            <td>
                <select name={`dropdown_${id}`} disabled={!isEnabled} value={dropdownValue} onChange={handleDropdownChange}>
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
                <div style={{display:'flex', flexDirection:'column'}}>
                    <DatePicker name={`fromDate_${id}`}
                        disabled={!isEnabled}
                        selected={fromDate}
                        onChange={handleFromDateChange}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select a date"
                    />
                    {<span style={{opacity: errors.fromDate? 1: 0, position:'absolute', width:'30vw', top:'40px', left:'0'}}>{errors.fromDate || 'error'}</span>}
                </div>
                
            </td>
            <td style={{position:'relative'}}>
                <DatePicker name={`toDate_${id}`}
                    disabled={!isEnabled}
                    selected={toDate}
                    onChange={handleToDateChange}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select a date"
                />
                {<span style={{color:'red', opacity: errors.toDate? 1: 0, position:'absolute', width:'30vw', top:'40px', left:'0'}}>{errors.toDate || 'error'}</span>}
            </td>
            <td>
                <p>description</p>
            </td>
        </tr>
            {/* {errors.length > 0 && <tr>{errors.map((error, index) => (<td key={index}>{error}</td>))}</tr>} */}
        </>
    )
}

export default PopupSection
