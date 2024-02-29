'use client'
import React from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { Span } from 'next/dist/trace';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select  style={{ width: 70 }}>
        <option  value="98">+<span className=' dark:text-white dark:bg-black'>98</span>  </option>
      </Select>
    </Form.Item>
  );

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

const App: React.FC = () => (
  <Form
  dir='rtl'
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{ maxWidth: 600, minWidth:500 }}
    validateMessages={validateMessages}
    className=' max-sm:max-w-28'
  >
    <Form.Item name={['user', 'name']} label={<span className=' dark:text-white'>نام</span>} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'email']} label={<span className=' dark:text-white'>ایمیل</span>} rules={[{ type: 'email', message: 'ادرس ایمیل به صورت صحیح و ضروری باید وارد شود',required: true}]}>
      <Input />
    </Form.Item>
    <Form.Item
        name="phone"
        label={<span className=' dark:text-white'>شماره تماس</span>}
        
        rules={[{ required: true, message: 'شماره تماس ضروری و می بایست 10 رقم باشد',min:10 }]}
      >
        <Input addonBefore={<span className=' dark:text-white'>+98</span>} style={{ width: '100%' }} />
      </Form.Item>

    <Form.Item name={['user', 'introduction']} label={<span className=' dark:text-white'>متن پیام</span>} rules={[{required:true,message:'متن پیام می بایست مشخص شود'}]}>
      <Input.TextArea />
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button className="w-[40%]  h-10 text-center cursor-not-allowed text-white pr-3    rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  " htmlType="submit">
        ثبت درخواست
      </Button>
    </Form.Item>
  </Form>
);

export default App;