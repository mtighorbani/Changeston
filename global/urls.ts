// ** base url
const baseUrl = "https://api.changeston.com/";

// ** get otp code
export const getOtpCodeUrl = baseUrl + "v1/otp/code/request/";

// ** check otp code
export const checkOtpCodeUrl = baseUrl + "v1/otp/code/check/";

// ** refresh access token
export const refreshAccessTokenUrl = baseUrl + "v1/token/refresh/";

// ** logout
export const logoutUrl = baseUrl + "v1/logout/";

// ** user details
export const userDetailsUrl = baseUrl + "v1/user/";

export const wiseDataPost = baseUrl + "v1/paymentlink/"

export const currencyAmount = baseUrl + "v1/financialdet/"
