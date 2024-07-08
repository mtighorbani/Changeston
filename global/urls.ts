// ** base url
const baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL;

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
export const userProductsUrl = baseUrl + "user/products/";

// ** verified panels list
export const verifiedPanelsListUrl = baseUrl + "verfiedpanels/list/";

// ** group
export const groupUrl = baseUrl + "group/";

// ** git card list
export const giftCardListUrl = baseUrl + "giftcard/list/";

export const paymentLinkUrl = baseUrl + "paymentlink/";

export const currencyAmount = baseUrl + "financialdet/";

export const paymentValidate = baseUrl + "paymentverify/";
