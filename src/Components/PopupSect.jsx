import { useState, useEffect, useMemo } from 'react';
import { Modal, Table, Form, Select, DatePicker } from 'antd';
import { useForm } from 'antd/es/form/Form';

function PopupSect({ setPopupData, popUpVisibility, setPopUpVisibility, operatorMap, popupData }) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [description, setDescription] = useState(new Map());
    const [form] = useForm();
    const SECTIONS_COUNT = 5;
    const sections = Array.from({ length: SECTIONS_COUNT }, (_, i) => i + 1);
    
    // Update form values whenever popupData changes
    // useEffect(() => {
    //     console.log(popupData)
    //     const {operator, value} =popupData[0];
    //     const fromDate = value[0];
    //     const toDate = value[1];
    //     // console.log(operator, fromDate, toDate);
    //     if (operator!=='' || toDate!=='' || fromDate!=='') {
    //         const initialFormValues = popupData.reduce((acc, item, index) => {
    //             acc[index] = {
    //                 operator: item.operator || '',
    //                 fromDate: item.value[0] || null,
    //                 toDate: item.value[1] || null
    //             };
    //             return acc;
    //         }, {});
    //         form.setFieldsValue(initialFormValues);
    //     }
    // }, [popupData]);
    async function handleOk() {
        await form.validateFields()
            .then(values => {
                const data = Object.values(values).filter(record => {
                    const { operator, fromDate, toDate } = record;
                    return operator || fromDate || toDate;
                }).map(record => {
                    const { operator, fromDate, toDate } = record;
                    if(operator === '[]')
                        return { operator, value: [fromDate, toDate] };
                    else
                        return {operator, value:[fromDate]};
                })
                setPopupData(data);
            })
            form.resetFields();
        setPopUpVisibility(false);
    }
    // Use form values to ensure data updates reflect in the table
    const data = useMemo(() => 
        sections.map((_, i) => ({
            key: i,
            operator: form.getFieldValue([i, 'operator']) || null,
            fromDate: form.getFieldValue([i, 'fromDate']) || null,
            toDate: form.getFieldValue([i, 'toDate']) || null,
            description: description.get(i) || ''
        })),
    [form, sections, description]);

    const columns = [
        {
            title: 'Operator',
            dataIndex: 'operator',
            render: (text, record, index) => (
                <Form.Item
                    name={[index, 'operator']}
                    style={{ display: 'inline-block', textAlign: 'center', width: '100%', margin: 0 }}
                >
                    <Select
                        allowClear  
                        onChange={(value) => {
                            setDescription(prev => {
                                const newMap = new Map(prev);
                                newMap.set(index, operatorMap[value]);
                                return newMap;
                            });
                        }}
                    >
                        {Object.keys(operatorMap).map((key) => (
                            <Select.Option key={key} value={key}>{key}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            )
        },
        {
            title: 'From Date',
            dataIndex: 'fromDate',
            render: (text, record, index) => (
                <Form.Item
                    name={[index, 'fromDate']}
                    style={{ display: 'inline-block', textAlign: 'center', width: '100%', margin: 0 }}
                >
                    <DatePicker
                        onChange={(date) => form.setFieldValue([index, 'fromDate'], date)}
                        format="DD/MM/YYYY"
                        placeholder=""
                    />
                </Form.Item>
            )
        },
        {
            title: 'To Date',
            dataIndex: 'toDate',
            render: (text, record, index) => (
                <Form.Item
                    name={[index, 'toDate']}
                    style={{ display: 'inline-block', textAlign: 'center', width: '100%', margin: 0 }}
                >
                    <DatePicker
                        onChange={(date) => form.setFieldValue([index, 'toDate'], date)}
                        format="DD/MM/YYYY"
                        placeholder=""
                    />
                </Form.Item>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (_, record, index) => (
                <p style={{ display: 'inline-block', textAlign: 'center', margin: 0 }}>
                    {description.get(index) || ''}
                </p>
            )
        }
    ];

    return (
        <Modal
            width={900}
            open={popUpVisibility}
            onCancel={() => setPopUpVisibility(false)}
            onOk={handleOk}
        >
            <h2 className="text-center">
                Multi Selection
            </h2>
            <p>{JSON.stringify(popupData)}</p>
            <Form form={form} style={{ marginBlock: '3rem' }}>
                <Table
                    dataSource={data}
                    columns={columns}
                    rowSelection={{
                        selectedRowKeys,
                        type: 'checkbox',
                        onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
                    }}
                    pagination={false}
                    bordered
                />
            </Form>
        </Modal>
    );
}

export default PopupSect;
