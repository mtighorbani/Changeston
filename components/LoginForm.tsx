"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { checkOtpCodeUrl, getOtpCodeUrl, userDetailsUrl } from "@/global/urls";
import { customNotification } from "./CustomNotification";
import {
  CheckOtpCodeCommand,
  CheckOtpCodeResponse,
  GetOtpCodeCommand,
  GetOtpCodeResponse,
  UserDetailResponse,
} from "@/models/models";
import { CountdownProps } from "antd/es/statistic/Countdown";
import { useEffect, useState } from "react";
import { useTokenContext } from "@/context/TokenContext";
import { useUserContext } from "@/context/UserContext";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LoginForm = () => {
  // ** Context
  const tokenContext = useTokenContext();
  const userContext = useUserContext();


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
  // get otp code
  const { mutate: mutateGetOtpCode, isPending: pendingGetOtpCode } =
    useMutation({
      mutationFn: async (data: GetOtpCodeCommand) =>
        (await axios.post(getOtpCodeUrl, data)).data,
      onSuccess: (res: GetOtpCodeResponse) => {
        if (res.success) {
          customNotification({
            api: api,
            type: "success",
            message: "رمز عبور موقت برای شما ارسال شد",
          });

          //TODO: remove below mutate
          mutateCheckOtpCode({
            phone_number: "09106738968",
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

  // check otp code
  const { mutate: mutateCheckOtpCode, isPending: pendingCheckOtpCode } =
    useMutation({
      mutationFn: async (data: CheckOtpCodeCommand) =>
        (await axios.post(checkOtpCodeUrl, data)).data,
      onSuccess: (res: CheckOtpCodeResponse) => {
        if (res.success) {
          //TODO: set OTP Context
          tokenContext?.setToken(res.access);
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

  //user detail
  const {
    data: userDetail,
    isFetching: isFetchingUserDetail,
    refetch: refetchUserDetail,
  } = useQuery<UserDetailResponse>({
    queryFn: async () =>
      (
        await axios.get(userDetailsUrl, {
          headers: { Authorization: `Bearer ${tokenContext?.token}` },
        })
      ).data,
    queryKey: ["userDetail"],
    enabled: false,
  });

  useEffect(() => {
    if (tokenContext?.token) {
      refetchUserDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenContext?.token]);

  useEffect(() => {
    if (userDetail?.success) {
      customNotification({
        api: api,
        type: "success",
        message: `عزیز خوش آمدید ${userDetail.full_name}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail]);

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
            <Input
              addonBefore={<span className="dark:text-white">+98</span>}
              defaultValue={"09106738968"}
            />
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
        {/*  {userContext?.userDetail?.phone_number}

        <Button
          className="w-[100%]   text-center pr-3  rounded-lg font-bold  "
          onClick={() => userContext?.setUserDetail({full_name: 'aloo',phone_number:'1461264514',month_limit: 4})}
        >
          set
        </Button>
        <Button
          className="w-[100%]   text-center pr-3  rounded-lg font-bold  "
          onClick={() => console.log(userContext?.userDetail?.phone_number)}
        >
          check
        </Button> */}
      </Form>
    </>
  );
};

export default LoginForm;
