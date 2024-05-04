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

//** refresh access token
export interface refreshAccessTokenModel {
  refresh: string | undefined;
}

export interface refreshAccessTokenResponse {
  access: string | undefined;
  success: boolean | undefined;
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
  success: boolean;
  error?: {
    code: number;
    massage: string;
  };
}

//TODO: change this user model
export interface User {
  phone_number?: GetOtpCodeCommand["phone_number"] | undefined;
  full_name?: string | undefined;
  month_limit?: number | undefined;
  accessToken?: string;
  refreshToken?: string;
}

//Purchase Steps Model
export interface PurchaseStepsModel {
  id: number | undefined;
  name: string | undefined;
}

// ** UserProducts
export interface UserProducts {
  id: number;
  purchase: number;
  completed: true;
  description: string;
  group_FaName: string;
  group_type: string;
  is_cancelled: false;
  payment_method: string;
  date_time: string;
  value: string;
  tax: string;
  product_value: number;
  product_currncytype: string;
  app: string;
  code: string;
}

export interface UserProductsResponse {
  user_products?: UserProducts[]
  success?: boolean;
  detail?: string ;
  code?: string | number;
  messages?: [
    {
      token_class: string ;
      token_type: string ;
      message: string ;
    }
  ];
}
