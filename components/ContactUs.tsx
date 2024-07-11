'use client';
import React from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
  console.log(values);
};

const ContactUs: React.FC = () => (
  <Form
    dir='rtl'
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ width: '100%' }}
    validateMessages={validateMessages}
    className='py-10'
  >
    <Form.Item name={['user', 'name']} label={<span className='dark:text-white'>نام</span>} rules={[{ required: true }]}>
      <Input type='string' />
    </Form.Item>
    <Form.Item name={['user', 'email']} label={<span className='dark:text-white'>ایمیل</span>} rules={[{ type: 'email', message: 'ادرس ایمیل به صورت صحیح و ضروری باید وارد شود', required: true }]}>
      <Input dir='ltr' />
    </Form.Item>
    <Form.Item
      name="phone"
      label={<span className='dark:text-white'>شماره تماس</span>}
      rules={[{ required: true, message: 'شماره تماس ضروری و می بایست 10 رقم باشد', min: 10 }]}
    >
      <Input dir='ltr' type='number' addonAfter={<span className='dark:text-white'>+98</span>} style={{ width: '100%' }} />
    </Form.Item>
    <Form.Item name={['user', 'introduction']} label={<span className='dark:text-white'>متن پیام</span>} rules={[{ required: true, message: 'متن پیام می بایست مشخص شود' }]}>
      <Input.TextArea />
    </Form.Item>
    <Form.Item wrapperCol={{ span: 24 }} className='text-center'>
      <Button className="w-full h-10 text-center text-white rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]" htmlType="submit">
        ثبت درخواست
      </Button>
    </Form.Item>
  </Form>
);

export default ContactUs;
