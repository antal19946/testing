import { errorNotification, successNotification } from "../../commons/notification";
import { axiosPost } from "../axiosHelper";
import { FORGOT_PASS_REQUEST, FORGOT_PASS_OTP, FORGOT_PASS_RESET, FORGOT_PASS_DATA, GET_EMAIL_MOBILE } from "./actionType";

export function ForgotPassReq(post) {
    return dispatch => {
        return axiosPost({ url: "/user/forgotPassword/request", reqBody: post, skipAuth: true }, (response) => {
            dispatch({
                type: FORGOT_PASS_REQUEST,
                [FORGOT_PASS_REQUEST]: response.data
            });
            if (response.data?.success === true) {
                successNotification(response.data?.message);
            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
        });
    };
}

export function ForgotPassOPTVerify(post) {
    return dispatch => {
        return axiosPost({ url: "forgot_password_otp_verify", reqBody: post, skipAuth: true }, (response) => {
            dispatch({
                type: FORGOT_PASS_OTP,
                [FORGOT_PASS_OTP]: response.data
            });
            dispatch({
                type: FORGOT_PASS_DATA,
                forgot_pass_data: {
                    email: post.email,
                    mobile: post?.mobile,
                    country_code: post?.country_code,
                    otp: post.otp
                }
            });

            if (response.data?.success === true) {
                successNotification(response.data?.message);
            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
        })
    };
}

export function ForgotPassReset(post) {
    return dispatch => {
        return axiosPost({ url: "forgot_password/reset", reqBody: post, skipAuth: true }, (response) => {
            dispatch({
                type: FORGOT_PASS_RESET,
                forgot_pass_reset: response.data
            });

            if (response.data?.success === true) {
                successNotification(response.data?.message);
            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
        })
    };
}
export function getEmailMobile(post) {
    return dispatch => {
        return axiosPost({ url: "/fetchuserdata", reqBody: post, skipAuth: true }, (response) => {
            // if (response.data?.success === true) {
            //     successNotification(response.data?.message);
            // }
            // if (response.data?.success === false) {
            //     errorNotification(response.data?.message)
            // }
            dispatch({
                type: GET_EMAIL_MOBILE,
                [GET_EMAIL_MOBILE]: response.data
            });
        })
    };
}