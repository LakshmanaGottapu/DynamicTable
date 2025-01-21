import {useState} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import ShopReportForm from './ShopReportForm.jsx'
import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form.js';
function ShopReport() {
    const [errorList, setErrorList] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [form] = useForm();
    async function handleFinish(values){
        setErrorList([]);
        setTableData([]);
        console.log({values});
        const requestBody = {};
        const errors = []
        if(values.site===undefined){
            errors.push(<span>{"site is a mandatory field"}</span>)
        }
        if(values.companycode===undefined){
            errors.push(<span>{"companycode is a mandatory field"}</span>)
        }
        if(errors.length>0)
            return setErrorList(errors);
        requestBody.site = values.site;
        requestBody.companycodes = values.companycode;
        const response = await fetch('./src/API/reports.json') // make the api call here to get the data
        const jsonResponse = await response.json();
        setTableData(jsonResponse);
    }
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Shopping with Mental Thanu</h1>
                </Col>
            </Row>
            <Row>
                {errorList.length>0? errorList.map((error, index) => <Col md={12} key={index}>{error}</Col>) : ''}
            </Row>
            <Row>
                <Col>
                    <Form form={form} onFinish={handleFinish}>
                        {<ShopReportForm/>}
                        <Button type='primary' htmltype="submit">Get Records</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {JSON.stringify(tableData)}
                </Col>
            </Row>
        </Container>
    )
}

export default ShopReport
