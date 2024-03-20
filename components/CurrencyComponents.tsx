import React, { useState } from "react";
import CryptoPurchaseForm from "./CryptoPurchesForm";
import { Button, Form, Input, Select } from "antd";
import { PurchasePostData } from "@/models/models";
import { useRouter } from 'next/router'
import { Query } from "@tanstack/react-query";

const CurrencyComponents = ({ id }: any) => {
  const [purchasePage, setParchasePge] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<PurchasePostData >();
  
  
  const purchaseValueHnadler = (value:PurchasePostData)=>{
    setFormValues(value)
    id(3);
    setParchasePge(true);
  }
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

   const onFinish = (values: PurchasePostData) => {
    purchaseValueHnadler(values)
   console.log(formValues)
  };
  
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <>
      {!purchasePage ? (
        <div
          dir="rtl"
          className=" m-auto w-[50%] max-sm:w-full rounded-lg h-[450px] max-sm:h-[620px] dark:bg-black bg-[#EEEEEE] mt-24"
        >
          <h1 className=" font-bold text-2xl p-6">خرید ارز</h1>
          <Form
            dir="rtl"
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{ maxWidth: 600, minWidth: 500 }}
            validateMessages={validateMessages}
            className=" max-sm:max-w-28"
          >
            <Form.Item<PurchasePostData>
              name={["receiver_name"]}
              label={<span className=" dark:text-white">نام</span>}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["currency_type"]}
              label={<span className=" dark:text-white">نوع ارز</span>}
            >
              <Select<PurchasePostData>
                
                options={[
                  { value: "usd", label: "دلار" },
                  { value: "euro", label: "یورو" },
                ]}
              />
            </Form.Item>
            <Form.Item<PurchasePostData>
              name={["amount"]}
              label={<span className=" dark:text-white">مقدار ارز</span>}
            >
              <Input />
            </Form.Item>
            <Form.Item<PurchasePostData>
              name={["receiver_email"]}
              label={<span className=" dark:text-white">ایمیل</span>}
              rules={[
                {
                  type: "email",
                  message: "ادرس ایمیل به صورت صحیح و ضروری باید وارد شود",
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<PurchasePostData>
              name={["iban"]}
              label={<span className=" dark:text-white"> شناسه Iban</span>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button
                onClick={()=>purchaseValueHnadler}
                  className="w-[40%]  h-10 text-center  text-white pr-3    rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  "
                  htmlType="submit"
                >
                  ثبت درخواست
                </Button>
            </Form.Item>

          </Form>
        </div>
      ) : (
        <CryptoPurchaseForm
            iban={formValues?.iban || ''}
            currency_type={formValues?.currency_type || ''}
            receiver_email={formValues?.receiver_email || ''}
            receiver_name={formValues?.receiver_name || ''}
            amount={formValues?.amount || 0}
            group_id="4"
            payment_method="zibal"
        />
      )}
    </>
  );
};

export default CurrencyComponents;
