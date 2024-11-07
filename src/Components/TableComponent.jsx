import {useState, useContext} from 'react'
import { Modal, Table, Form, Button, Select, DatePicker } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { ShipmentContext } from '../ShipmentContext';
function TableComponent() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [description, setDescription] = useState(new Map());
    const [form] = useForm();
    const SECTIONS_COUNT = 5;
    const sections = Array.from({length:SECTIONS_COUNT}, (_,i)=>i+1)
    const {popUpVisibility, setPopUpVisibility, setFromDate, setToDate, setOperator, formatDate, operatorMap} = useContext(ShipmentContext);

    const columns = [
        {
            title: 'Operator',
            dataIndex:'operator',
            render: (text, record, index)=> {
                return (
                <Form.Item
                    name={[index, 'operator']}
                >
                    <Select
                        onChange={(value) =>
                            setDescription(prev => {
                                const newMap = new Map(prev)
                                return newMap.set(index, operatorMap[value])
                            })
                        }
                    >
                        {
                            Object.keys(operatorMap).map((key, index) =>  <Select.Option key={index} value={key}>{key}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
            )}
        },
        {
            title: 'From Date',
            dataIndex:'fromDate',
            render: (text, record, index)=> (
                <Form.Item
                name={[index, 'fromDate']}
                >
                    <DatePicker
                        format = 'DD/MM/YYYY'
                        placeholder="Select a date"
                    />
                </Form.Item>
            )
        },
        {
            title: 'To Date',
            dataIndex:'toDate',
            render: (text, record, index)=> (
                <Form.Item
                name={[index, 'toDate']}
                >
                    <DatePicker
                        format = 'DD/MM/YYYY'
                        placeholder="Select a date"
                    />
                </Form.Item>
            )
        },
        {
            title: 'Description',
            dataIndex:'description',
            render: (text, record, index)=> (
                    <p>{description.get(index)}</p>
            )
        }
    ]
    const data = sections.map((section, i) => {
        return ({
            key: i,
            operator: ``,
            fromDate: ``,
            toDate: ``,
            description: ''
        })
    })
    
    async function handleOk(){
        // console.log(values);
        const smallestRowKey = selectedRowKeys.reduce((prev, current)=>{
            return prev < current ? prev : current
        }, Number.POSITIVE_INFINITY)
        await form.validateFields()
            .then(values => {
                const {operator, fromDate, toDate} = values[smallestRowKey];
                setFromDate(fromDate)
                setOperator(operator)
                setToDate(toDate)
            })
            form.resetFields();
            setSelectedRowKeys([]);
        setPopUpVisibility(false);
        
    }
    return (
        <Modal
            open = {popUpVisibility}
            onCancel = {()=>setPopUpVisibility(false)}
            onOk = {handleOk}
        >
            <Form form={form}>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowSelection={{selectedRowKeys, type:'checkbox', onChange:(selectedRowKeys)=>{
                        setSelectedRowKeys(selectedRowKeys);
                    }}}
                    pagination={false}
                >
                </Table>
            </Form>
        </Modal>
    )
}

export default TableComponent
