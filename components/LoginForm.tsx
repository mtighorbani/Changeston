"use client";

import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { checkOtpCodeUrl, getOtpCodeUrl } from "@/global/urls";
import { customNotification } from "./CustomNotification";
import {
  CheckOtpCodeCommand,
  GetOtpCodeCommand,
  ResponseData,
} from "@/models/models";
import Countdown from "antd/es/statistic/Countdown";
import { useState } from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LoginForm = () => {
  // ** Notification
  const [api, contextHolder] = notification.useNotification();
  // ** Count Down
  const [waitForNewRequest, setWaitForNewRequest] = useState<number>(10);

  // ** API Calls
  const { mutate: mutateGetOtpCode, isPending: pendingGetOtpCode } =
    useMutation({
      mutationFn: async (data: GetOtpCodeCommand) =>
        (
          await axios.post(getOtpCodeUrl, data, {
            headers: {
              "Cache-Control": "no-cache",
              "Postman-Token": "<calculated when request is sent>",
              "Content-Type": "application/json",
              "Content-Length": "<calculated when request is sent>",
              Host: "<calculated when request is sent>",
              "User-Agent": "PostmanRuntime/7.36.3",
              Accept: "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              Connection: "keep-alive",
            },
          })
        ).data,
      onSuccess: (res: ResponseData) => {
        if (res.success) {
          customNotification({
            api: api,
            type: "success",
            message: "رمز عبور موقت برای شما ارسال شد",
          });
        } else {
          customNotification({
            api: api,
            type: "error",
            message:
              "متاسفانه ارسال رمز عبور موقت با خطا مواجه شد! لطفا مجددا تلاش کنید",
          });
        }
      },
      onError: () => {
        //TODO: Remove below line
        // setWaitForNewRequest(10);

        customNotification({
          api: api,
          type: "error",
          message:
            "متاسفانه ارسال رمز عبور موقت با خطا مواجه شد! لطفا مجددا تلاش کنید",
        });
      },
    });

  const { mutate: mutateCheckOtpCode, isPending: pendingCheckOtpCode } =
    useMutation({
      mutationFn: async (data: CheckOtpCodeCommand) =>
        (await axios.post(checkOtpCodeUrl, data)).data,
      onSuccess: () => {
        customNotification({
          api: api,
          type: "success",
          message: "خوش آمدید",
        });
      },
      onError: () => {
        customNotification({
          api: api,
          type: "error",
          message: "متاسفانه دریافت اطلاعات کاربر با خطا مواجه شد!",
        });
      },
    });

  // ** Handlers
  const onSubmitHandler = (data: GetOtpCodeCommand) => {
    console.log(data);
    mutateGetOtpCode(data);
  };

  /* // ** RegExp
  const phoneRegExp = /^(?:(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|9[0-4]|98)\d{7}|)$/ */

  return (
    <>
      {contextHolder}
      <Form
        dir="rtl"
        {...layout}
        name="login-data"
        onFinish={onSubmitHandler}
        style={{ maxWidth: 600, minWidth: 500 }}
        // validateMessages={validateMessages}
        className=" max-sm:max-w-28 ml-28"
      >
        <div>
          <Form.Item
            name="phone_number"
            label={<span className="dark:text-white">شماره موبایل</span>}
            rules={[
              {
                required: true,
                message: "شماره تماس ضروری و می بایست 10 رقم باشد",
                min: 10,
                // pattern: phoneRegExp
              },
            ]}
          >
            <Input addonBefore={<span className="dark:text-white">+98</span>} />
          </Form.Item>

          <Form.Item label={<span className="dark:text-white"></span>}>
            <Button
              loading={pendingGetOtpCode}
              className="w-[100%]  h-10 text-center  text-white pr-3  rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  "
              htmlType="submit"
              // disabled={waitForNewRequest > 0}
            >
              ورود
            </Button>
          </Form.Item>
          {/* {(Date.now() + waitForNewRequest * 1000) > 0 ??(
            <Countdown
              className="text-white"
              value={Date.now() + waitForNewRequest * 1000}
              format="ss"
            />
          )} */}
        </div>

        {/* <Button
        type="text"
        className="w-[100%]   text-center text-white pr-3  rounded-lg font-bold  "
      >
        ثبت نام
      </Button> */}
      </Form>
    </>
  );
};

export default LoginForm;