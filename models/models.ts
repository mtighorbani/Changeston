// ** Response
interface error {
  code: number | undefined;
  message: string | undefined;
  wait_for?: number | undefined
}

export interface ResponseData {
  success?: boolean | undefined;
  error?: error | undefined;
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
