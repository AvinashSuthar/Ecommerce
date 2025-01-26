export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = `${HOST}/api/v1`;
export const SIGNUP_ROUTES = `${AUTH_ROUTES}/register`;
export const OTP_ROUTES = `${AUTH_ROUTES}/verifyemail`;
export const GET_USER_INFO = `${AUTH_ROUTES}/me`;
export const LOGIN_ROUTES = `${AUTH_ROUTES}/login`;
export const UPDATE_PROFILE_ROUTES = `${AUTH_ROUTES}/me/update`;
export const UPDATE_PASSWORD_ROUTES = `${AUTH_ROUTES}/password/update`;
export const FORGOT_PASSWORD_ROUTES = `${AUTH_ROUTES}/password/forgot`;
export const RESET_PASSWORD_ROUTES = `${AUTH_ROUTES}/password/reset`;

export const CREATE_ORDER_ROUTES = `${AUTH_ROUTES}/order/new`;
export const GET_MY_ORDER_ROUTES = `${AUTH_ROUTES}/orders/me`;
export const GET_SINGLE_ORDER_ROUTES = `${AUTH_ROUTES}/order`;

// products routes
export const GET_ALL_PRODUCT_ROUTE = `${AUTH_ROUTES}/products`;
export const GET_PRODUCT_DETAIL_ROUTE = `${AUTH_ROUTES}/product`;

export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

export const CREATE_REVIEW_ROUTE = `${AUTH_ROUTES}/review`;
