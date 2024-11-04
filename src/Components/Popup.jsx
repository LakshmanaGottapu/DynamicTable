import { ShipmentContext } from "../ShipmentContext";
import PopupSection from "./PopupSection";
import {useContext} from 'react';
import {Modal, Form} from 'antd';
const Popup = ({sectionCount}) => {
    const SECTIONS_COUNT = sectionCount || 5;
    const sections = Array.from({length:SECTIONS_COUNT}, (_,i)=>i+1);
    const {popUpVisibility, setPopUpVisibility, setFromDate, setToDate, setOperator} = useContext(ShipmentContext);
    const [form] = Form.useForm();
    const handleOk = () => {     
        form
        .validateFields()
        .then(values => {
            console.log(values);
            if(Object.entries(values).length===0)
                return console.log('empty data')
            let smallestIndex = 0;
            for(let i=1; i<=SECTIONS_COUNT; i++){
                if(values[`checkbox_${i}`] !== undefined){
                    smallestIndex = i;
                    break;
                }
            }
            console.log('checkbox: ' + values[`checkbox_${smallestIndex}`]);
            console.log('fromDate: ' + formatDate(values[`fromDate_${smallestIndex}`]));
            console.log('toDate: ' + formatDate(values[`toDate_${smallestIndex}`]));
            setFromDate(`formData[fromDate_${smallestIndex}]`);
            setToDate(toDate);
            setOperator(operator);
            setPopUpVisibility(false);
            // onClose(); // Close the modal
        })
        .catch(errorInfo => {
            console.error('Validation Failed:', errorInfo);
        });
    };
    

    return (
        <Modal className="popup" style={{ width: '900px' }}
            open = {popUpVisibility}
            onCancel = {()=>setPopUpVisibility(false)}
            onOk = {handleOk}
        >
            <h2>MultipleSelection</h2>
            <Form form={form} layout="vertical">
                {  
                    sections.map(value => (
                        <PopupSection key={value} id={value}/>
                    ))      
                }
            </Form>
        </Modal>
    );
};

export default Popup;
