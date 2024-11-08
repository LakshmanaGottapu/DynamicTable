import {useState, useMemo, useEffect} from 'react'
import { Modal, Table, Form, Select, DatePicker } from 'antd'
import { useForm } from 'antd/es/form/Form';
function Popupsection({setPopupData, popUpVisibility, setPopUpVisibility, operatorMap, fromDate, toDate, setFromDate, setToDate, setOperator, popupData}) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [description, setDescription] = useState(new Map());
    const [form] = useForm();
    const SECTIONS_COUNT = 5;
    const sections = Array.from({length:SECTIONS_COUNT}, (_,i)=>i+1)
    useEffect(()=>{
        console.log('modal mounted');
        console.log({popupData});
    },[popUpVisibility])
    const data = useMemo(sections.map((_, i) => {
        return ({
            key: i,
            operator: ``,
            fromDate: (popupData && popupData[i]) ? popupData[i].value[0] : '',
            toDate: (popupData && popupData[i]) ? popupData[i].value[1] : '',
            description: ''
        })
    }), [popupData]);
    const columns = [
        {
            title: 'Operator',
            dataIndex:'operator',
            render: (text, record, index)=> {
                return (
                <Form.Item
                    name={[index, 'operator']}
                    style={{ display: 'inline-block', textAlign: 'center', width: '100%', margin: 0 }}
                >
                    <Select
                        onChange={(value) => {
                                setDescription(prev => {
                                    const newMap = new Map(prev)
                                    return newMap.set(index, operatorMap[value])
                                })
                            }
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
            render: (text, record, index)=> {
                return (<Form.Item
                style={{ display: 'inline-block', textAlign: 'center', width: '100%', margin: 0 }}
                name={[index, 'fromDate']}
                >
                    <DatePicker
                        defaultPickerValue={text}
                        style ={{margin: 0, border: record.isActive ? '1px solid black' : 'none'}}
                        format = 'DD/MM/YYYY'
                        placeholder=""
                    />
                </Form.Item>)
            }
        },
        {
            title: 'To Date',
            dataIndex:'toDate',
            render: (text, record, index)=> {
                return(<Form.Item
                    name={[index, 'toDate']}
                    style={{ display: 'inline-block', textAlign: 'center', width: '100%', margin: 0 }}
                >
                    <DatePicker
                        defaultPickerValue={text}
                        style ={{border: record.isActive ? '1px solid black' : 'none'}}
                        format = 'DD/MM/YYYY'
                        placeholder=""
                    />
                </Form.Item>)
            }
        },
        {
            title: 'Description',
            dataIndex:'description',
            render: (_, record, index)=> (
                    <p style={{ display: 'inline-block', textAlign: 'center', margin: 0 }}>{description.get(index)}</p>
            )
        }
    ]
    
    
    async function handleOk(){
        await form.validateFields()
            .then(values => {
                const data = Object.values(values).filter(record => {
                    const {operator, fromDate, toDate} = record;
                    return (operator || fromDate || toDate)
                }).map(record => {
                    const {operator, fromDate, toDate} = record;
                    if(operator === '[]'){
                        return {
                            operator, value:[fromDate, toDate]
                        }
                    }
                    else{
                        return {
                            operator, value:[fromDate]
                        }
                    }
                })
                console.log({data});
                // console.log(data[0]);
                setPopupData(data);
            })
        setPopUpVisibility(false);
    }
    return (
        <Modal 
            width={900}
            open = {popUpVisibility}
            onCancel = {()=>setPopUpVisibility(false)}
            onOk = {handleOk}
        >
            <h2 className="text-center">
                Multi Selection
            </h2>
            <Form form={form} style={{marginBlock:'3rem'}}>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowSelection={{selectedRowKeys, type:'checkbox', onChange:(selectedRowKeys)=>{
                        setSelectedRowKeys(selectedRowKeys);
                    }}}
                    pagination={false}
                    bordered={true}
                >
                </Table>
            </Form>
        </Modal>
    )
}

export default Popupsection;
