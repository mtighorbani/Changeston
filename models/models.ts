// ** Response
export interface Error {
  code: number | undefined;
  message?: string | undefined;
  wait_for?: number | undefined;
  remain?: number | undefined;
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
  phone_number: GetOtpCodeCommand["phone_number"] | undefined;
  full_name: string | undefined;
  month_limit: number | undefined;
  success?: boolean;
  detail?: string | undefined;
  code?: number | undefined;
  messages?: [
    {
      token_class: string | undefined;
      token_type: string | undefined;
      message: string | undefined;
    }
  ];
}

export interface PurchasePostData {
  group_id: "4";
  currency_type: string;
  amount: any;
  receiver_name: string;
  receiver_email: string;
  iban: string;
  payment_method: "zibal";
}

// ** payment link
export interface PaymentLinkResponse {
  success?: boolean | undefined;
  error?: Error | undefined;
  gateway: string;
}

// Currency Amount
export interface CurrencyAmount {
  giftcard: number;
  forigncurrency: number;
  inapp: number;
  wise: number;
  verifiedpanel: number;
  usd: number;
  euro: number;
}


export interface paymentResult {
  success:boolean;
  error?:{
    code:number;
    massage:string;
  }
}