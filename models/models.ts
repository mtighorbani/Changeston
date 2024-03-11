// ** Response
interface error {
  code: number | undefined;
  message: string | undefined;
}

export interface ResponseData<T> {
  success?: boolean | undefined;
  error?: error | undefined;
  data?: T;
}

// ** get otp code
export interface GetOtpCodeCommand {
  phone_number: string;
}

// ** check otp code
export interface CheckOtpCodeCommand {
  phone_number: GetOtpCodeCommand["phone_number"];
  password: string;
}
