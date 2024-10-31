import { useContext } from 'react';
import './App.css'
import Popup from './Components/Popup'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ShipmentContextProvider, ShipmentContext } from './ShipmentContext';
function App() {
  const {fromDate, setFromDate, toDate, setToDate, operator, popUpVisibility, setPopUpVisibility} = useContext(ShipmentContext);
  return (
    <ShipmentContextProvider>
      POC:
      <DatePicker selected = {fromDate} onChange={(date)=>setFromDate(date)}/>
      Operator: 
      <span>{operator}</span>
      <DatePicker selected = {toDate} onChange={(date)=>setToDate(date)}/>
      <button onClick={()=>setPopUpVisibility(true)}>link</button>
      { popUpVisibility && <Popup />}
    </ShipmentContextProvider>
  )
}

export default App
