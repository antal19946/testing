// import { errorNotification, successNotification } from "../../commons/notification";
import { axiosPost } from "../axiosHelper";
import { REGISTRATION } from "./actionType";

export function registration(post) {
    return dispatch => {
        return axiosPost({ url: "/register", reqBody: post, skipAuth: true }, (response) => {
            // if (response.data?.result?.token) window.localStorage.setItem('rtoken', response.data?.result?.token)
            // if (response.data?.result?._id) window.localStorage.setItem('ruserId', response.data?.result?._id)
            // if (response.data?.result?.token) window.localStorage.setItem('token', response.data?.result?.token)
            // if (response.data?.result?._id) window.localStorage.setItem('userId', response.data?.result?._id)
            dispatch({
                type: REGISTRATION,
                [REGISTRATION]: response.data
            });
            if (response.data?.success === true) {
                // successNotification(response.data?.message);
                // setTimeout(function(){
                //     window.location.href = '/auth/verify-email'
                //     // window.location.href = `/auth/verify-email?email=${response.data?.result?.email}`
                // },500)
            }
            if (response.data?.success === false) {
                // errorNotification(response.data?.message)
            }
        })
    };
}
