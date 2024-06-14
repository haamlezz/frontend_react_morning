import React from "react";
import { Form, Input, Button, Alert, Select, message } from "antd";
import { useState } from "react";
import "./Contact.css"; // Create a CSS file for styling

const { TextArea } = Input;
const { Option } = Select;

function Contact() {
  const [form] = Form.useForm();
  const [formValid, setFormValid] = useState(true);

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("Your message has been sent");
    setFormValid(true);
    form.resetFields(); // Reset form fields after submission
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setFormValid(false);
  };

  return (
    <div className="contact-form-container">
      <Form
        form={form}
        name="contact_us"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        {!formValid && (
          <Alert message="Please complete all fields." type="error" showIcon />
        )}
        <Form.Item
          label="What can we help you with?"
          name="help"
          rules={[{ required: true, message: "Please select an option!" }]}
        >
          <Select placeholder="Select an option">
            <Option value="support">Support</Option>
            <Option value="sales">Sales</Option>
            <Option value="feedback">Feedback</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "The input is not valid E-mail!" },
            { max: 10, message: "ທ່ານປ້ອນກາຍ 10" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter your message!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "blue", borderColor: "blue" }}
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Contact;
