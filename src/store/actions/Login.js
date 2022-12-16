
import { axiosPostRL } from "../axiosHelperLogin";
import { LOGIN } from "./actionType";
import { Alert } from "react-native";

export function LoginC(post) {
    return dispatch => {
        return axiosPostRL({ url: "/login", reqBody: post, skipAuth: true }, (response) => {
            // if (response.data?.result?.token) window.localStorage.setItem('rtoken', response.data?.result?.token)
            // if (response.data?.result?._id) window.localStorage.setItem('ruserId', response.data?.result?._id)
            // if (response.data?.result?.token) window.localStorage.setItem('token', response.data?.result?.token)
            // if (response.data?.result?._id) window.localStorage.setItem('userId', response.data?.result?._id)
            dispatch({
                type: LOGIN,
                [LOGIN]: response.data
            });
            if (response.data?.success === true) {
                Alert.alert(
                    "HELLO!",
                    "Password do not Match",

                    [

                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                // successNotification(response.data?.message);
                // setTimeout(function(){
                //     window.location.href = '/auth/verify-email'
                //     // window.location.href = `/auth/verify-email?email=${response.data?.result?.email}`
                // },500)
            }
            if (response.data?.success === false) {
                errorNotification(response.data?.message)
            }
        })
    };
}

export function logout() {
    return dispatch => {
        resetAuthToken()
        successNotification('logout successfully');
        dispatch({
            type: USER_PROFILE_DETAILS,
            [USER_PROFILE_DETAILS]: { status: false }
        });
        setTimeout(() => {
            window.location.href = '/'
        }, 1000)
        return null
    };
}

export const googleLogin = () => {
    window.open(settings.api_url + "login/google", "_self");
}

export const appleLogin = () => {
    window.open(settings.api_url + "auth/apple", "_self");
}

export function VerifyOtp(post, setreset, setotp, reset) {
    return (dispatch) => {
        return axiosPost(
            { url: "verifyotp", reqBody: post, skipAuth: true },
            (response) => {
                dispatch({
                    type: VERIFY_OTP,
                    [VERIFY_OTP]: response.data,
                });
                if (response.data?.success === true) {
                    successNotification(response?.data?.message);
                    setreset(!reset);
                    setotp(false);
                }
                if (response.data?.success === false) {
                    errorNotification(response.data?.message);
                }
            }
        );
    };
}

export function forgotPasswordVerify(post, setuser, setreset) {
    return (dispatch) => {
        return axiosPost(
            { url: "/user/forgotPassword/verify", reqBody: post, skipAuth: true },
            (response) => {
                dispatch({
                    type: VERIFY_OTP,
                    [VERIFY_OTP]: response.data,
                });
                if (response.data?.success === true) {
                    successNotification(response?.data?.message);
                    setuser(true);
                    setreset(false);
                }
                if (response.data?.success === false) {
                    errorNotification(response.data?.message);
                }
            }
        );
    };
}