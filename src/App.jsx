import { useContext } from 'react';
import './App.css'
import Popup from './Components/Popup'
import {DatePicker} from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import { ShipmentContext } from './ShipmentContext';
function App() {
  const {fromDate, setFromDate, toDate, setToDate, operator, popUpVisibility, setPopUpVisibility, formatDate} = useContext(ShipmentContext);
  return (
      <div style={{display:'flex', flexDirection:'column'}}>
        <h3>POC:</h3>
        {/* <DatePicker selected = {fromDate} onChange={(date)=>setFromDate(date)}/> */}
        <DatePicker 
                    value={fromDate}
                    onChange={(_,date)=>setFromDate(formatDate(date))}
                    format = 'DD/MM/YYYY'
                    placeholder="Select a date"
                />
        <h3>Operator:</h3> 
        <p style={{minBlockSize:'1.5rem', border:'1px solid black', width:'3rem', padding:'0.25rem'}}>{operator}</p>
        <h3>ToDate:</h3>
        {/* <DatePicker selected = {toDate} onChange={(date)=>setToDate(date)}/> */}
        <DatePicker 
                    value={toDate}
                    onChange={(_,date)=>setToDate(formatDate(date))}
                    format = 'DD/MM/YYYY'
                    placeholder="Select a date"
                />
        <button style={{width:'2rem', marginBlock:'1rem'}} onClick={()=>{setPopUpVisibility(prev => !prev)}}>link</button>
        { popUpVisibility && <Popup />}
      </div>
  )
}

export default App
