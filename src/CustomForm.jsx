import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const MyFormModal = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();

  // Handle the "OK" button click
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        console.log('Form Data:', values);
        // Process the form data here
        onClose(); // Close the modal
      })
      .catch(errorInfo => {
        console.error('Validation Failed:', errorInfo);
      });
  };

  return (
    <Modal
      title="My Form Modal"
      visible={isVisible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please enter your email' }]}
        >
          <Input />
        </Form.Item>
        {/* Add more form items as needed */}
      </Form>
    </Modal>
  );
};

export default MyFormModal;
