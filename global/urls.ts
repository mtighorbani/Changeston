// ** base url
const baseUrl = "https://changeston.com/api/v1/";

// ** get otp code
export const getOtpCodeUrl = baseUrl + "otp/code/request/";

// ** check otp code
export const checkOtpCodeUrl = baseUrl + "otp/code/check/";

// ** refresh access token
export const refreshAccessTokenUrl = baseUrl + "token/refresh/";

// ** logout
export const logoutUrl = baseUrl + "logout/";

// ** user details
export const userDetailsUrl = baseUrl + "user/";

// ** user products
export const userProductsUrl = baseUrl + 'user/products/'


export const wiseDataPost = baseUrl + "paymentlink/"

export const currencyAmount = baseUrl + "financialdet/"

 export const paymentValidate = baseUrl + "paymentverify/"