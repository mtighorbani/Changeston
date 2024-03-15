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
import { InputOTP } from "antd-input-otp";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/ModalContext";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LoginForm = () => {
  // ** Context
  const tokenContext = useTokenContext();
  const modalContext = useModalContext();
  const userContext = useUserContext();
  const [phoneNumberForm] = Form.useForm();
  const [otpForm] = Form.useForm();

  // ** Handlers
  const handleResetPhoneNumberForm = () => {
    phoneNumberForm.resetFields();
  };

  const handleResetOtpForm = () => {
    otpForm.resetFields();
  };

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [firstLoginStep, setFirstLoginStep] = useState<boolean>(true);

  // const router = useRouter();

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
          setFirstLoginStep(false);
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
        //TODO: handle exceptions
        if (res.success) {
          tokenContext?.setToken(res.access);
          tokenContext?.setRefreshToken(res.refresh);
          modalContext?.setIsLoginModalOpen(false);
          handleResetOtpForm();
          setFirstLoginStep(true);
        } else {
          handleResetOtpForm();

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
      /* customNotification({
        api: api,
        type: "success",
        message: `عزیز خوش آمدید ${userDetail.full_name}`,
      }); */
      userContext?.setUserDetail({
        full_name: userDetail.full_name,
        month_limit: userDetail.month_limit,
        phone_number: userDetail.phone_number,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail]);

  // ** Handlers
  const onGetOtpHandler = (data: GetOtpCodeCommand) => {
    setPhoneNumber(data.phone_number);
    mutateGetOtpCode(data);
  };

  const onSubmitOtpHandler = (data: any) => {
    console.log(data.password);
    let tempOtp = "";
    //TODO: FIX this
    tempOtp =
      data.password[0] +
      data.password[1] +
      data.password[2] +
      data.password[3] +
      data.password[4];
    console.log(tempOtp);
    mutateCheckOtpCode({
      phone_number: phoneNumber,
      password: tempOtp,
    });
  };

  // ** RegExp
  const phoneRegExp =
    /^(?:(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|9[0-4]|98)\d{7}|)$/;

  return (
    <>
      {contextHolder}
      <Button
        style={{
          display: `${firstLoginStep ? "none" : "block"}`,
        }}
        type="link"
        onClick={() => {
          setFirstLoginStep(true);
        }}
      >
        تغییر شماره تلفن
      </Button>

      <Form
        dir="ltr"
        {...layout}
        name="login-data"
        onFinish={onGetOtpHandler}
        style={{
          maxWidth: 600,
          minWidth: 500,
          display: `${!firstLoginStep ? "none" : "block"}`,
        }}
        className=" max-sm:max-w-28 "
      >
        <Form.Item
          name="phone_number"
          // label={<span className="dark:text-white">شماره موبایل</span>}
          rules={[
            {
              required: true,
              message: "شماره تلفن وارد شده نا معتبر است",
              pattern: phoneRegExp,
            },
          ]}
        >
          <Input
            maxLength={11}
            placeholder="شماره موبایل خود را وارد کنید (مثال:09123456789)"
          />
        </Form.Item>

        <Form.Item>
          <Button
            loading={pendingGetOtpCode}
            className="w-[100%]  h-10 text-center  text-white pr-3  rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  "
            htmlType="submit"
            disabled={counter > 0}
          >
            {counter > 0 ? (
              <span>لطفا صبر کنید {counter}</span>
            ) : (
              <span>تایید و دریافت کد</span>
            )}
          </Button>
        </Form.Item>
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
      <Form
        {...layout}
        name="otp-data"
        dir="ltr"
        onFinish={onSubmitOtpHandler}
        style={{
          maxWidth: 600,
          minWidth: 500,
          display: `${firstLoginStep ? "none" : "block"}`,
        }}
        className=" max-sm:max-w-28 "
      >
        <Form.Item name="password">
          <InputOTP autoFocus={true} length={5} inputType="numeric" />
        </Form.Item>
        <Form.Item>
          <Button
            loading={pendingCheckOtpCode}
            className="w-[100%]  h-10 text-center  text-white pr-3  rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]  "
            htmlType="submit"
          >
            <span>ورود</span>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
