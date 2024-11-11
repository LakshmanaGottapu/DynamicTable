import { DatePicker, Form, Button } from "antd"
import { useForm } from "antd/es/form/Form"
import {useState} from 'react';
function Datepicker() {
    const [form] = useForm();
    const [date, setDate] = useState('');
    function handleFinish(){
        form.validateFields().then(values => {
            console.log(values.toDate.isValid);
            const date = new Date(values.toDate);
            setDate(date);
            // console.log(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`);
        })
    }
    return (
        <>
            <Form form={form} >
                <Form.Item name="toDate">
                    <DatePicker
                        onChange={(date) => {
                            form.setFieldValue('toDate', date)
                            // setDate(date);
                        }}
                        format="DD/MM/YYYY"
                        placeholder=""
                    />
                </Form.Item>
            </Form>
            <Button type="primary" onClick={handleFinish}>submit</Button>
            <DatePicker
                value={date}
                onChange={(date)=>{
                    setDate(date);
                }}
            />
        </>
    )
}

export default Datepicker
