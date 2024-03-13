// ** Response
interface Error {
  code: number | undefined;
  message: string | undefined;
  wait_for?: number | undefined;
}

// ** get otp code
export interface GetOtpCodeCommand {
  phone_number: string;
}

export interface GetOtpCodeResponse {
  success?: boolean | undefined;
  error?: Error | undefined;
}

// ** check otp code
export interface CheckOtpCodeCommand {
  phone_number: GetOtpCodeCommand["phone_number"];
  password: string;
}

export interface CheckOtpCodeResponse {
  success: boolean;
  access: string | undefined;
  refresh: string | undefined;
  error: Error | undefined;
}

// ** user detail
export interface UserDetailResponse {
  phone_number: GetOtpCodeCommand["phone_number"];
  full_name: string;
  month_limit: number;
  success?: boolean;
  detail?: string;
  code?: string;
  messages?: [
    {
      token_class: string;
      token_type: string;
      message: string;
    }
  ];
}
