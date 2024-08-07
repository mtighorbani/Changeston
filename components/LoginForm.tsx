"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import { checkOtpCodeUrl, getOtpCodeUrl, userDetailsUrl } from "@/global/urls";
import { customNotification } from "../global/customNotification";
import {
  CheckOtpCodeCommand,
  CheckOtpCodeResponse,
  GetOtpCodeCommand,
  GetOtpCodeResponse,
  UserDetailResponse,
} from "@/models/models";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { InputOTP } from "antd-input-otp";
import { useModalContext } from "@/context/ModalContext";
import { errorMessage } from "@/global/errorMessage";
import { AuthContext } from "@/context/AuthContext";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LoginForm = () => {
  // ** Context
  const auth = useContext(AuthContext);
  const modalContext = useModalContext();
  const [phoneNumberForm] = Form.useForm();
  const [otpForm] = Form.useForm();

  // ** Handlers
  const handleResetPhoneNumberForm = () => {
    phoneNumberForm.resetFields();
  };

  const handleResetOtpForm = () => {
    otpForm.resetFields();
  };

  const onChangePhoneNumberHandler = (
    phoneNumber: ChangeEvent<HTMLInputElement>
  ) => {
    if (phoneNumber.target.value.length === 0) {
      setCounter(0);
    }
  };

  const onGetOtpHandler = (data: GetOtpCodeCommand) => {
    setPhoneNumber(data.phone_number);
    mutateGetOtpCode(data);
  };

  const onSubmitOtpHandler = (data: { password: string[] }) => {
    if (data.password) {
      let tempOtp = data.password.slice(0, 5).join("");
      mutateCheckOtpCode({
        phone_number: phoneNumber,
        password: tempOtp,
      });
    }
  };

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [firstLoginStep, setFirstLoginStep] = useState<boolean>(true);

  // ** Notification
  const [api, contextHolder] = notification.useNotification();

  // ** Count Down
  const [counter, setCounter] = useState<number>(0);

  // ** Hooks
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(Number(timer));
  }, [counter]);

  useEffect(() => {
    handleResetPhoneNumberForm();
    handleResetOtpForm();
    setFirstLoginStep(true);
    setCounter(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalContext?.isLoginModalOpen]);

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
            message: "رمز عبور موقت برای شما ارسال شد.",
          });
          setFirstLoginStep(false);
          handleResetPhoneNumberForm();
        } else {
          if (res.error?.wait_for) {
            setCounter(res.error.wait_for);
          }
          customNotification({
            api: api,
            type: "error",
            message: errorMessage(res.error),
          });
        }
      },
      onError: () => {
        customNotification({
          api: api,
          type: "error",
          message: errorMessage(undefined),
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
          auth?.login({ accessToken: res.access, refreshToken: res.refresh });
          modalContext?.setIsLoginModalOpen(false);
          setFirstLoginStep(true);
        } else {
          customNotification({
            api: api,
            type: "error",
            message: errorMessage(res.error),
          });
        }
        handleResetOtpForm();
        handleResetPhoneNumberForm();
      },
      onError: () => {
        customNotification({
          api: api,
          type: "error",
          message: errorMessage(undefined),
        });
        handleResetOtpForm();
        handleResetPhoneNumberForm();
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
          headers: { Authorization: `Bearer ${auth?.user?.accessToken}` },
        })
      ).data,
    queryKey: ["userDetail"],
    enabled: false,
  });

  useEffect(() => {
    if (auth?.user?.accessToken && !auth.isAuthenticated) {
      refetchUserDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user?.accessToken]);

  useEffect(() => {
    if (userDetail?.success) {
      customNotification({
        api: api,
        type: "success",
        message: `خوش آمدید`,
      });

      auth?.login({
        ...auth.user,
        full_name: userDetail.full_name,
        month_limit: userDetail.month_limit,
        phone_number: userDetail.phone_number,
      });
    } /* else {
      customNotification({
        api: api,
        type: "error",
        message: errorMessage({code: userDetail?.code}),
      });
    } */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail]);

  const onChangeOtpHandler = (password: string[]) => {
    if (password) {
      if (password.length === 5) {
        let tempOtp = password.slice(0, 5).join("");
        mutateCheckOtpCode({
          phone_number: phoneNumber,
          password: tempOtp,
        });
      }
    }
  };

  // ** RegExp
  const phoneRegExp =
    /^(?:(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|9[0-4]|98)\d{7}|)$/;

  return (
    <>
      {contextHolder}
      <div dir="rtl" className="m-3">
        <Button
          style={{
            display: firstLoginStep ? "none" : "block",
          }}
          type="link"
          onClick={() => {
            setFirstLoginStep(true);
          }}
        >
          تغییر شماره تلفن
        </Button>
      </div>

      <Form
        form={phoneNumberForm}
        dir="rtl"
        {...layout}
        name="login-data"
        onFinish={onGetOtpHandler}
        style={{
          maxWidth: 600,
          width: "100%",
          display: firstLoginStep ? "block" : "none",
        }}
        className="p-4 max-sm:max-w-full max-sm:w-full"
      >
        <div dir="rtl" className="w-full text-black">
          <p className="font-extrabold text-lg mt-4 mb-2">
            شماره تماس خود را وارد کنید
          </p>
          <Form.Item
            name="phone_number"
            className="text-black"
            rules={[
              {
                required: true,
                message: "شماره تلفن وارد شده نا معتبر است",
                pattern: phoneRegExp,
              },
            ]}
          >
            <Input
              onChange={onChangePhoneNumberHandler}
              autoFocus
              className="text-black"
              maxLength={11}
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={pendingGetOtpCode}
              className="w-full h-10 text-center text-white pr-3 rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]"
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
        </div>
      </Form>

      <Form
        form={otpForm}
        {...layout}
        name="otp-data"
        dir="ltr"
        onFinish={onSubmitOtpHandler}
        style={{
          maxWidth: 600,
          width: "100%",
          display: firstLoginStep ? "none" : "block",
        }}
        className="p-4 max-sm:max-w-full max-sm:w-full"
      >
        <div dir="ltr" className="w-full">
          <Form.Item name="password">
            <InputOTP
              autoFocus
              length={5}
              inputType="numeric"
              onChange={onChangeOtpHandler}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={pendingCheckOtpCode}
              className="w-full h-10 text-center text-white pr-3 rounded-lg font-bold bg-gradient-to-r from-[#C8338C] to-[#0A95E5]"
              htmlType="submit"
            >
              <span>ورود</span>
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
