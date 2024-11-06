import { ShipmentContext } from "../ShipmentContext";
import PopupSection from "./PopupSection";
import {useContext} from 'react';
import {Modal, Form} from 'antd';
const Popup = ({sectionCount}) => {
    const SECTIONS_COUNT = sectionCount || 5;
    const sections = Array.from({length:SECTIONS_COUNT}, (_,i)=>i+1);
    const {popUpVisibility, setPopUpVisibility, setFromDate, setToDate, setOperator, formatDate} = useContext(ShipmentContext);
    const [form] = Form.useForm();
    const handleOk = () => {     
        form
        .validateFields()
        .then(values => {
            console.log(values);
            if (Object.entries(values).length === 0) {
                return console.log('empty data');
            }
            let smallestIndex = 0;
            for (let i = 1; i <= SECTIONS_COUNT; i++) {
                if (values[`checkbox_${i}`] !== undefined && values[`checkbox_${i}`] === "") { // Use && for logical AND
                    smallestIndex = i;
                    break;
                }
            }
            console.log({ smallestIndex });
            console.log('checkbox: ' + values[`checkbox_${smallestIndex}`]);
            console.log('fromDate: ' + formatDate(values[`fromDate_${smallestIndex}`]));
            console.log('toDate: ' + formatDate(values[`toDate_${smallestIndex}`]));
            if(smallestIndex>0 && smallestIndex<=SECTIONS_COUNT){
                setFromDate(values[`fromDate_${smallestIndex}`]);
                setOperator(values[`operator_${smallestIndex}`]);
                setToDate(values[`toDate_${smallestIndex}`]);
            }
            // Uncomment to close the modal
            setPopUpVisibility(false);
        })
        .catch(errorInfo => {
            console.error('Validation Failed:', errorInfo);
        });
    };
    

    return (
        <Modal className="popup" 
            open = {popUpVisibility}
            onCancel = {()=>setPopUpVisibility(false)}
            onOk = {handleOk}
        >
            <h2>MultipleSelection</h2>
            <Form form={form} layout="vertical">
                <table style={{textAlign:'center'}}>
                    <thead>
                        <th>checkbox</th>
                        <th>operator</th>
                        <th>from date</th>
                        <th>to date</th>
                        <th>description</th>
                    </thead>
                    <tbody>
                        {  
                            sections.map(value => (
                                <PopupSection key={value} id={value}/>
                            ))      
                        }
                    </tbody>
                </table>
            </Form>
        </Modal>
    );
};

export default Popup;
