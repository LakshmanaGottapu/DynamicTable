import { ShipmentContext } from "../ShipmentContext";
import PopupSection from "./PopupSection";
import {useContext} from 'react';
const Popup = ({sectionCount}) => {
    const SECTIONS_COUNT = sectionCount || 5;
    const sections = Array.from({length:SECTIONS_COUNT}, (_,i)=>i+1);
    const {setPopUpVisibility, setFromDate, setToDate, setOperator} = useContext(ShipmentContext);
    const handleOk = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formObj = {};
        formData.entries().forEach(entry => formObj[entry[0]] = entry[1])
        if(Object.entries(formObj).length===0)
            return console.log('empty data')
        const data = {};
        let smallestIndex = Number.POSITIVE_INFINITY;
        for(let key in formObj){
            const keys = key.split('_');
            if(keys[0] === 'checkbox')
            smallestIndex = smallestIndex > keys[1] ? keys[1] : smallestIndex;
            data[keys[1]] = {...data[keys[1]], [keys[0]]:formObj[key]};
        }
        const finalData = data[smallestIndex];
        if(!finalData)
            return setPopUpVisibility(false)
        const {fromDate, toDate, operator} = finalData;
        setFromDate(fromDate);
        setToDate(toDate);
        setOperator(operator);
        setPopUpVisibility(false);
    };

    return (
        <div className="popup" style={{ width: '900px' }}>
            <h2>MultipleSelection</h2>
            <form  onSubmit={handleOk}>
                <table>
                    <thead>
                        <tr>
                            <th>Checkbox</th>
                            <th>Option</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sections.map(value => (
                                <PopupSection key={value} id={value}/>
                            ))      
                        }
                    </tbody>
                </table>
                <button type="submit">Ok</button>
            </form>
            <button type="button" onClick={()=>setPopUpVisibility(false)}>cancel</button>
        </div>
    );
};

export default Popup;
