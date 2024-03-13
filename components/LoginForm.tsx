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
import { CountdownProps } from "antd/es/statistic/Countdown";
import { useEffect, useState } from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LoginForm = () => {
  // ** Notification
  const [api, contextHolder] = notification.useNotification();

  // ** Count Down
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(Number(timer));
  }, [counter]);

  // ** API Calls
  const { mutate: mutateGetOtpCode, isPending: pendingGetOtpCode } =
    useMutation({
      mutationFn: async (data: GetOtpCodeCommand) =>
        (await axios.post(getOtpCodeUrl, data)).data,
      onSuccess: (res: ResponseData) => {
        if (res.success) {
          customNotification({
            api: api,
            type: "success",
            message: "رمز عبور موقت برای شما ارسال شد",
          });
          mutateCheckOtpCode({
            phone_number: "09125806954",
            password: "12345",
          });
        } else {
          if (res.error?.code === 4) {
            customNotification({
              api: api,
              type: "error",
              message:
                "رمز عبور برای شما ارسال شده است، برای ارسال مجدد لطفا صبر کنید",
            });
            setCounter(res.error.wait_for || 0);
          } else {
            customNotification({
              api: api,
              type: "error",
              message:
                "متاسفانه ارسال رمز عبور موقت با خطا مواجه شد! لطفا مجددا تلاش کنید",
            });
          }
        }
      },
      onError: () => {
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
      onSuccess: (res: ResponseData) => {
        if (res.success) {
          customNotification({
            api: api,
            type: "success",
            message: "خوش آمدید",
          });
        } else {
          customNotification({
            api: api,
            type: "error",
            message: "متاسفانه دریافت اطلاعات کاربر با خطا مواجه شد!",
          });
        }
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

          <Form.Item label={<span></span>}>
            <Button
              loading={pendingGetOtpCode}
              className="w-[100%]  h-10 text-center  text-white pr-3  rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  "
              htmlType="submit"
              disabled={counter > 0}
            >
              {counter > 0 ? (
                <span>لطفا صبر کنید {counter}</span>
              ) : (
                <span>ورود</span>
              )}
            </Button>
          </Form.Item>
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
